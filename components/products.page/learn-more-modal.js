import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'
import { Modal } from 'antd'
import { callGetApi } from "utils/api";
import { asPrice } from 'utils/text'

export default function LearnMoreModal(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const distCenter = useSelector((state) => state.mlm.distCenter);
  const userType = useSelector((state) => state.mlm.userType);
  const yourCountry = useSelector((state) => state.mlm.yourCountry);
  const [creditProducts, setCreditProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadCreditProducts = () => {
    callGetApi(`product_credits?page=1&per_page=100&dist_center_id=${distCenter?.id}&user_type=${userType}&country=${yourCountry}`, onGetProducts, onFailProducts)
  }

  const onGetProducts = (data) => {
    setCreditProducts(data.data.data)
    setIsLoading(false)
  }

  const onFailProducts = () => {
    setIsLoading(false)
  }

  const goProductDetail = (product) => {
    router.push(`/credit_product/${product.id}`)
    props.setIsOpenedLearn(false)
  }

  useEffect(() => {
    if (distCenter && distCenter.id) {
      loadCreditProducts()
    }
  }, [distCenter])

  return (
    <Modal
      visible={true}
      onCancel={()=>props.setIsOpenedLearn(false)}
      footer={null}
      width={1200}
      title={'Product Credits'}
    >
      <section id="credit-products-section" style={{paddingTop: 0}}>
        <div className='row row-spacing'>
          {creditProducts.map((el, index) => 
            <div className='col-sm-6 col-md-3 col-xs-12 col-spacing'>
              <div className={`card ${index==2?'gradient-card':''}`}
                onClick={()=>goProductDetail(el)}
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
                  <div className='description' 
                    dangerouslySetInnerHTML={{__html: el.description}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>      
    </Modal>
  )
}
