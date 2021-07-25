import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { asPrice } from 'utils/text'
import LearnMoreModal from 'components/products.page/learn-more-modal'

export default function SideCart() {
  const dispatch = useDispatch()
  const router = useRouter()
  const isOpened = useSelector(state=>state.ui.isOpenedSideCart)
  const wrapperRef = useRef(null)
  const orderDetails = useSelector(state=>state.checkout.orderDetails)
  const isPcOrder = useSelector(state=>state.checkout.isPcOrder)
  const [totalItems, setTotalItems] = useState(0)
  const [totalBv, setTotalBv] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalRetailPrice, setTotalRetailPrice] = useState(0)
  const [totalAutoshipPrice, setTotalAutoshipPrice] = useState(0)
  const [isOpenedLearn, setIsOpenedLearn] = useState(false)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      dispatch({
        type: 'HIDE_SIDE_CART'
      })
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  useEffect(() => {
    let totalItems = 0, totalBv = 0, totalPrice = 0, totalRetailPrice = 0, totalAutoshipPrice = 0;
    for (let item of orderDetails) {
      totalItems += item.quantity*1
      totalBv += item.product.cv*item.quantity
      totalPrice += item.product.member_price*item.quantity
      totalRetailPrice += item.product.retail_price*item.quantity   
      totalAutoshipPrice += item.product.autoship_price*item.quantity   
    }
    setTotalItems(totalItems)
    setTotalBv(totalBv)
    setTotalPrice(totalPrice)
    setTotalRetailPrice(totalRetailPrice)
    setTotalAutoshipPrice(totalAutoshipPrice)
  }, [orderDetails])
  const goCheckout = () => {
    dispatch({
      type: 'SET_IS_AUTOSHIP',
      payload: {
        isAutoship: false
      }
    })
    router.push('/checkout')
  }
  const handleCloseSideCart = () => {
    dispatch({
      type: 'HIDE_SIDE_CART'
    })
  }
  const handleRemoveCart = (product_id) => {
    dispatch({
      type: 'REMOVE_CART',
      payload: { product_id }
    })
  }

  const goCheckoutWithAutoship = () => {
    dispatch({
      type: 'SET_IS_AUTOSHIP',
      payload: {
        isAutoship: true
      }
    })
    router.push('/checkout')
  }
  
  return (
    <>
      <div className={`sidebar-cart ${isOpened?'opened':''}`} ref={wrapperRef}>
        <h4>Your Cart</h4>
        {orderDetails.map((el, index) => 
        <div className='d-flex justify-content-between product-item' key={index}>
          <div className='image-section'>
            <img src={el.product.image} className='product-thumb' />
          </div>
          <div className='desc-section'>
            <div className='d-flex justify-content-between'>
              <p className='product-title'>{el.product['title']}</p>
              <p className='product-price text-right'>
                <span>{asPrice(el.product['retail_price'])}</span>                              
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='product-price-title'>
                <span>Exclusive Member Price</span>
              </p>
              <p className='product-price text-right'>
                <span>{asPrice(el.product['member_price'])}</span>  
              </p>
            </div>
            <div className='d-flex justify-content-between'>
              <p className='qty'>QTY:&nbsp;{el.quantity}</p>
              <p className='product-volume'>{el.product['cv']}CV</p>
            </div>
            <div className='d-flex'>
              <p className='remove-cart' onClick={()=>handleRemoveCart(el.product.id)}>Remove</p>
            </div>
          </div>
        </div>
        )}
        {orderDetails.length==0?
        <div className='d-flex'>
          <p>There are no items.</p>
        </div>
        : ''}
        <div className='line' />
        <h4>Order Summary</h4>
        <div className='order-summary'>
          <div className='d-flex justify-content-between'>
            <p>Items</p>
            <p>{totalItems}</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>CV</p>
            <p>{totalBv}</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Total Retail Price</p>
            <p><strong>{asPrice(totalRetailPrice)}</strong></p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Total Exclusive Member Price</p>
            <p><strong>{asPrice(totalPrice)}</strong></p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>After 30 days</p>
            <p><strong>{asPrice(totalAutoshipPrice)}</strong></p>
          </div>
          <div className='d-flex justify-content-between action-row'>              
            <button 
              onClick={goCheckout} 
              className='btn btn-primary' 
              disabled={orderDetails.length==0}
            >One time Checkout</button>
            <span style={{width: 12}} />
            <button className='btn btn-primary' 
              onClick={()=>goCheckoutWithAutoship()}
              disabled={orderDetails.length==0}
            >
              Subscribe &amp; Save
            </button>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn' onClick={()=>setIsOpenedLearn(true)} 
              style={{width: '100%', marginTop: 12}}
            >
              Learn more about Member pricing
            </button>
          </div>
        </div>
      </div>
      {isOpened &&
        <div className='opacity-bg' />
      }
      {isOpenedLearn && 
        <LearnMoreModal 
          setIsOpenedLearn={setIsOpenedLearn}
        />
      }
      <style jsx>{`
        .sidebar-cart {
          position: fixed;
          right: -374px;
          top: 0;
          height: 100vh;
          width: 374px;
          background-color: #fff;
          z-index: 171;
          padding-top: 111px;
          padding: 140px 30px 30px 30px;
          box-shadow: 1px 0px 5px 0px rgba(224,224,224,0.5);
          overflow-y: auto;
        }
        .sidebar-cart.opened {
          transition: all .3s ease-in-out;
          right: 0;
        }
        .opacity-bg {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 70;
          opacity: 0.25;
          background: #000;
        }
        .image-section {

        }
        .product-item {
          margin-bottom: 6px;
        }
        .desc-section {
          width: calc(100% - 100px);
        }
        .product-thumb {
          height: 90px;
        }
        p {
          margin-bottom: 8px;
          opacity: 0.5;
        }
        .product-title {
          font-weight: bold;
          opacity: 1;
        }
        .product-price {
          margin-left: 12px;
          opacity: 1;
          line-height: 1.2em;
        }
        .product-price-title {
          font-size: 12px;
        }
        .product-autoship-price {
          opacity: 0.5;
          line-height: 1.2em;
          margin-bottom: 0;
        }
        .qty {
          font-size: 11px;
        }
        .remove-cart {
          font-size: 10px;
          color: #ff0000;
          opacity: 0.5;
          cursor: pointer;
        }
        .line {
          background-color: #c4c4c4;
          height: 1px;
          width: 100%;
          margin: 24px 0;
        }
        .action-row {
          margin-top: 24px;
        }
      `}</style>
    </>
  )
}