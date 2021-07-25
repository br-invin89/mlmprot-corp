import { useEffect, useState } from "react";
import { callGetApi } from "utils/api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/layouts/layout";
import { Spin, message } from "antd";
import { asPrice } from "utils/text";
import ImageGallery from "react-image-gallery";
import LearnMoreModal from 'components/products.page/learn-more-modal'
import Product1BelowHtml from "components/product.contents/product1-below-html";
import Product2BelowHtml from "components/product.contents/product2-below-html";
import OtherProductBelowHtml from "components/product.contents/other-product-below-html";

export default function ProductDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id } = router.query;
  const yourCountry = useSelector(state=>state.mlm.yourCountry)
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(undefined);
  const [images, setImages] = useState([]);
  const [isOpenedLearn, setIsOpenedLearn] = useState(false)

  const getProductDetail = () => {
    setIsLoading(true);
    callGetApi(`products/${product_id}`, onGetProduct, () =>
      setIsLoading(false)
    );
  };
  const onGetProduct = (data) => {
    setIsLoading(false);
    let product = data.data
    setProduct(product);
    let images_ = [
      {
        original: product?.image,
        thumbnail: product?.image,
      },
    ];
    product?.thumbnails &&
      product.thumbnails.length > 0 &&
      product.thumbnails.map((el) => {
        images_.push({
          original: el.image,
          thumbnail: el.image,
        });
      });
    setImages(images_);
  };

  const handleAddCart = () => {
    if (product) {
      if (yourCountry=='CA') {
        let exQuantity = 0
        orderDetails.forEach(el => {
          if (el.product.id==product.id) {
            exQuantity += Number(el.quantity)
          }
        })
        if (exQuantity+Number(quantity)>3) {
          message.error('You can\'t place over 3 per sku')
          return
        }
      }
      dispatch({
        type: "ADD_CART",
        payload: {
          product,
          quantity,
        },
      });   
      setTimeout(() => {
        dispatch({
          type: "OPEN_SIDE_CART",
        });
      }, 1000);
    }
  };
  const openProductSheet = () => {
    window.open(product?.pdf_link, "_blank");
  };
  const openLearnMoreModal = () => {
    setIsOpenedLearn(true)
  }

  useEffect(() => {
    if (product_id) {
      getProductDetail();
    }
    window.scrollTo(0, 0);
  }, [product_id]);

  return (
    <Layout>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10}}>
          <Spin size="large"/>
        </div>
      ) : (
        <>
          <section id="products-bar-list">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <ImageGallery items={images} />
                </div>
                <div className="col-sm-6">
                  <h2>{product?.title}</h2>
                  <h6>{asPrice(product?.retail_price)}</h6>
                  <div className="d-flex">
                    <h6>{asPrice(product?.member_price)}</h6>
                    <span style={{width: 4}} />
                    <span>(Exclusive Member Pricing)</span>
                    {/*
                    <h6 style={{marginLeft: 40}}>PV: 80&nbsp;</h6>
                    <h6 style={{marginLeft: 10}}>CV: 36&nbsp;</h6>
                    */}
                  </div>
                  <div>
                    <button className='learn-more-btn' onClick={openLearnMoreModal}>
                      Learn More about Member Pricing
                    </button>
                  </div>
                  {/* <p>{product?.subtitle}</p> */}
                  <p
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                  <ul>
                    <li>
                      <label>QTY:&nbsp;</label>
                    </li>
                    <li>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </li>
                    <li>
                      <button onClick={handleAddCart}>ADD TO CART</button>
                      {product?.pdf_link && (
                        <button
                          onClick={openProductSheet}
                          style={{ marginLeft: 12 }}
                        >
                          Product Sheet
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {isOpenedLearn && 
            <LearnMoreModal 
              setIsOpenedLearn={setIsOpenedLearn}
            />
          }
          {product && 
          <>
          {product.id==1 && <Product1BelowHtml />}
          {product.id==2 && <Product2BelowHtml />}
          {/*(product.id!=1 && product.id!=2) && <OtherProductBelowHtml />*/}
          </> }
        </>
      )}
    </Layout>
  );
}
