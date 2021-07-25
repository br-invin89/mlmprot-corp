import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link'
import { Row, Col } from "antd";
import Layout from "components/layouts/layout";
import ProductCard from "components/products.page/product-card";
import { callGetApi } from "utils/api";

export default function Products() {
  const products = useSelector((state) => state.products.products);
  const distCenter = useSelector((state) => state.mlm.distCenter);
  const userType = useSelector((state) => state.mlm.userType);
  const yourCountry = useSelector((state) => state.mlm.yourCountry);

  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const getProductList = () => {
    setIsLoading(true);
    callGetApi(
      `products?page=1&per_page=100&dist_center_id=${distCenter?.id}&user_type=${userType}&country=${yourCountry}&is_pc=2`,
      onGetSuccessProductList,
      () => setIsLoading(false)
    );
  };
  const onGetSuccessProductList = (data) => {
    setIsLoading(false);
    setProductList(data.data.data);
  };

  useEffect(() => {
    if (distCenter && distCenter.id) {
      getProductList();
    }
  }, [distCenter]);

  return (
    <Layout pageTitle="Products">
      <section id="products">
        <h2>&nbsp;</h2>
      </section>
      <section>
        <div className="container products-description">
          <h4>Clean. Natural. Quality.</h4>
          <p>
            Think about the last thing you ate or drank. Do you know what was in
            it? Honestly, do you know what ingredients were in the last thing
            you put in your body? Unfortunately, most of us don’t. Did you pay
            attention to how it made you feel? Was it an improvement to your
            current state of being or more status quo? We understand that most
            people are simply focusing on making it through the day and don't
            have the time or energy to pay attention to these "little things".
            Well, to us it matters. ALUVA cares about WHAT’S IN IT. We take the
            time and are meticulous about the "little things". 
            {/*
            In all of our
            products, we use only the highest quality, natural ingredients with
            maximum potency. Our proprietary formulations are backed by science
            and created to enhance absorption allowing your body to use more of
            what you put in it.
            */}
          </p>
          {/*
          <p style={{marginTop: 12}}>
            OUR STORY... Gavin Dickson, founder of Nektar, was raised in a family filled with healthcare professionals where the “cure” to every illness or problem always seemed to be another prescription drug. Each prescription taken led to another side effect, another problem, and ultimately, another prescription. He watched as the declining health of his father led to him taking 13 prescription medications at the same time! Gavin knew this could not be helping him. Passion fueled him as he sought out knowledge and what we should and should not be putting in our bodies.
          </p>
          <p>
            After losing his father, Gavin spent most of his adult life studying preventative measures. He immersed himself in the science of nutrients, and learned very quickly that not all supplements are created equal. The quality of the ingredients as well as how they come together was critical for absorption so your body can even use them. He has spent millions of dollars investing in different health protocols and supplements around the world and now, he has what he believes, are products that can provide health and vitality, transforming and blessing the lives of real people everywhere. Welcome to Nektar.
          </p>
          <p style={{marginTop: 12}}>My passion to create a life changing product stems from my childhood experiences. I was raised in a family filled with healthcare professionals  including nurses and doctors. The “cure” to every illness or problem was always prescription drugs which would eventually lead to additional problems. It was the common cycle of fixing one problem with a drug and taking more drugs to fix those side effects or new problems.</p>
          <p>The closest example to my heart is losing my father to this very cycle. His health began to decline growing up, and he ended up on 13 different medications.  I don’t know where you can find science or studies backing someone being on 13 medications at once.  I was eager to offer other solutions but was shot down.  Eventually I came to realize a big part of health is prevention.</p>
          <p>My passion for health grew stronger as I fueled my mind with knowledge.  I learned about the importance of giving your body the proper nutrients each day. If we give our bodies the essential nutrients it has the capability to heal itself. We should focus on the prevantitive measures rather than waiting for an illness to make us change our lifestyle. I’ve spent the majority of my adult life finding ways to make a difference; Investing millions of dollars into different health protocols and supplements from all around the world.  Now it’s my goal and passion to change the world and bless as many lives as possible with NektarLife’s incredible products.</p>
          <p>Here at NektarLife we will always use the highest performing quality ingredients that have real science.  We aim to produce the most bioavailable products while utilizing the best absorption technologies for maximum results.  Our mission, simply, is to bring health and vitality to our consumers, thus transforming and enhancing quality of life with every one of our products.  Let’s all bless the lives of our families through NektarLife!</p>
          */}
        </div>
      </section>
      <section id="products-list">
        <div className="container">
          <Row gutter={[24, 24]}>
            {productList &&
              productList.length > 0 &&
              productList.map((el) => (
                <Col xs={24} md={12} lg={8}>
                  <ProductCard product={el} key={el.id} />
                </Col>
              ))}
          </Row>
        </div>
      </section>
      <section id='credit-products2-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <div style={{padding: '0 0 40px 0'}}>
                <Link href={'/opportunity#credit-products-section'}>
                  <p className='more-btn'>
                    Learn about our member exclusive pricing
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 text-center'>
              <img src={'/images/sp_product1.jpg'} />              
            </div>
            <div className='col-xs-12 col-sm-6'>
              <p className='description' style={{marginTop: 60}}>
                In all of our products, we use only the highest quality, natural ingredients with maximum potency.
                Our proprietary formulations are backed by science and created to enhance absorption allowing your body to use more of what you put in it.
              </p>
            </div>
          </div>
          <div className='row' style={{marginBottom: 20}}>
            <div className='col-xs-12 col-sm-6'>
              <p className='description' style={{marginTop: 80}}>
                "I LOVE THE WAY I LOOK AND FEEL! EVERYDAY GETS BETTER AND I CAN'T WAIT TO SEE THE RESULTS AS I CONTINUE THE JOURNEY. THANKYOU ALUVA"
              </p>
            </div>
            <div className='col-xs-12 col-sm-6 text-center'>
              <img src={'/images/sp_product2.jpg'} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
