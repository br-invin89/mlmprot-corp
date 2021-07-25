import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { callGetApi } from "utils/api";
import { asPrice } from 'utils/text';

export default function SubscriptionsSection() {
  const router = useRouter()
  const distCenter = useSelector((state) => state.mlm.distCenter);
  const userType = useSelector((state) => state.mlm.userType);
  const yourCountry = useSelector((state) => state.mlm.yourCountry);
  const [isLoading, setIsLoading] = useState(false)
  const [creditProducts, setCreditProducts] = useState([])

  const loadCreditProducts = () => {
    setIsLoading(true)
    callGetApi(`product_credits?page=1&per_page=100&dist_center_id=${distCenter?.id}&user_type=${userType}&country=${yourCountry}`, onGetProducts, onFailProducts)
  }

  const onGetProducts = (data) => {
    setCreditProducts(data.data.data)
    setIsLoading(false)
  }

  const onFailProducts = () => {
    setIsLoading(false)
  }

  const goCreditProduct = (productId) => {
    router.push(`/credit_product/${productId}`);
  }

  useEffect(() => {
    if (distCenter && distCenter.id) {
      loadCreditProducts()
    }
  }, [distCenter])

  return (
    <section id="credit-products-section">
      <div className='header-bg'>
        <div className="container">
          <div className='row'>
            <div className='col-12'>
              <img src={'/images/aluva-logo2.png'} />
              <h2>ALUVA MONTHLY SUBSCRIPTIONS</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="pc-container-bg">
        <div className='container'>
          <div className='row row-spacing'>
            {creditProducts.map((el, index) => 
              <div className='col-sm-6 col-md-3 col-xs-12 col-spacing'>
                <div className={`card ${index==2?'gradient-card':''}`}
                  onClick={()=>goCreditProduct(el.id)}
                >
                  <div className='card-body'>
                    <div className='image'>
                      <img src={`/images/subscription${index+1}.png`} />
                    </div>
                    <div className='price'>
                      {asPrice(el.member_price)}
                    </div>
                    <div className='subtitle'>
                      {el.subtitle}
                    </div>
                    <div className='description' dangerouslySetInnerHTML={{__html: el.description}}>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>          
        </div>
      </div>
      <div className='pc-container-footer'></div>
    </section>
  )
}