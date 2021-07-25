import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Layout from "components/layouts/layout";
import { callGetApi } from "utils/api";
import { asPrice } from 'utils/text'

export default function CreditProductDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { product_id } = router.query;
  const [product, setProduct] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1);

  const getProductDetail = () => {
    setIsLoading(true)    
    callGetApi(`products/${product_id}`, onGetProduct, onFailProduct)
  }

  const onGetProduct = (data) => {
    setIsLoading(false)
    let product = data.data
    setProduct(product)
  }
  const onFailProduct = () => {
    setIsLoading(false)
  }

  const handleAddCart = () => {
    if (product) {
      dispatch({
        type: "ADD_PC_CART",
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
  }

  useEffect(() => {
    if (product_id)
      getProductDetail()
    window.scrollTo(0, 0);
  }, [product_id])

  return (
    <Layout>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10}}>
          <Spin size="large"/>
        </div>
      ) : (
        <section id="products-bar-list">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 text-center">
                <img src={product?.image} />
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
                {/* <p>{product?.subtitle}</p> */}
                
                <div className='product-credit-description'
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}      
    </Layout>
  )
}