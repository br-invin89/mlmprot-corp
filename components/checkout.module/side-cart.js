import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, message } from "antd";
import { useRouter } from "next/router";
import { callPostApi } from "utils/api";
import { asNumber, asPrice } from "utils/text";

export default function SideCart(props) {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.checkout.orderDetails);
  const isPcOrder = useSelector(state => state.checkout.isPcOrder);
  const isAutoship = useSelector(state => state.checkout.isAutoship);
  const [promotionCode, setPromotionCode] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalBv, setTotalBv] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalRetailPrice, setTotalRetailPrice] = useState(0);
  const [totalAutoshipPrice, setTotalAutoshipPrice] = useState(0);
  const [handlingPrice, setHandlingPrice] = useState(0); // for canada order shipping 

  useEffect(() => {
    let totalItems = 0,
      totalBv = 0,
      totalPrice = 0,
      totalRetailPrice = 0,
      totalAutoshipPrice = 0;
    for (let item of orderDetails) {
      totalItems += item.quantity * 1;
      totalBv += item.product.cv * item.quantity;
      totalPrice += item.product.member_price * item.quantity;
      totalRetailPrice += item.product.retail_price * item.quantity;
      totalAutoshipPrice += item.product.autoship_price * item.quantity;
    }
    let handlingPrice = 0;
    if (!isPcOrder) handlingPrice = totalPrice*0.1;
    totalPrice -= props.discountAmount;
    totalPrice += props.shippingPrice ? props.shippingPrice * 1 : 0;
    totalPrice += props.tax ? props.tax * 1 : 0;
    totalRetailPrice -= props.discountAmount;
    totalRetailPrice += props.shippingPrice ? props.shippingPrice * 1 : 0;
    totalRetailPrice += props.tax ? props.tax * 1 : 0;
    totalAutoshipPrice += props.shippingPrice ? props.shippingPrice * 1 : 0;
    totalAutoshipPrice += props.tax ? props.tax * 1 : 0;
    setTotalItems(totalItems);
    setTotalBv(totalBv);
    setTotalPrice(totalPrice);
    setTotalRetailPrice(totalRetailPrice)
    setTotalAutoshipPrice(totalAutoshipPrice);
    setHandlingPrice(handlingPrice);
  }, [orderDetails, props.shippingPrice, props.tax, props.discountAmount, props.userType]);
  const checkPromotion = () => {
    if (!promotionCode) {
      message.error("Please input Discount code.");
      return;
    }
    let data = {
      user: {
        type: props.userType,
      },
      promoCode: promotionCode,
    };
    let orderDetails_ = [];
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      });
    }
    data["orderDetails"] = orderDetails_;
    callPostApi("check/promo_code", data, onSuccessPromotion, onFailPromotion);
  };
  const onSuccessPromotion = (data) => {
    props.setConfirmedPromotion({
      discountAmount: data.data.orderTotalDiscount,
      promotionCode,
    });
  };
  const onFailPromotion = (errMessage) => {
    message.error(errMessage);
  };

  return (
    <>
      <div className={`sidebar-cart`}>
        <h4>Order Summary</h4>
        {orderDetails.map((el, index) => (
          <div
            className="d-flex justify-content-between product-item"
            key={index}
          >
            <div className="image-section">
              <img src={el.product.image} className="product-thumb" />
            </div>
            <div className="desc-section">
              <div className="d-flex justify-content-between">
                <p className="product-title">{el.product["title"]}</p>
                <p className="product-price text-right">
                  <span className={`${(props.userType!=3)?'text-strike':''}`}>
                    {asPrice(el.product['retail_price'])}</span>
                </p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='product-price-title'>
                  <span>Exclusive Member Price</span>
                </p>
                <p className='product-price text-right'>
                  <span className={`${(props.userType==3)?'text-strike':''}`}>
                    {asPrice(el.product['member_price'])}
                  </span>
                </p>
              </div>
              {/*
              isAutoship && 
              <div className='d-flex justify-content-between'>
                <p className='product-autoship-price'>
                  <span>after 30 days</span>
                </p>
                <p className='product-price text-right'>
                  <span>{asPrice(el.product['autoship_price'])}</span>
                </p>
              </div>
              */}
              <div className="d-flex justify-content-between">
                <p className="qty">QTY:&nbsp;{el.quantity}</p>
                <p className="product-volume">{el.product["cv"]}CV</p>
              </div>
            </div>
          </div>
        ))}
        <div className="line" />
        {!isPcOrder && 
        <>
          {(props.tax === undefined || props.step == "choose-type" || props.step == "info-form" || props.step == "shipping-form") && (
            <>
              <p>Discount Code</p>
              <div className="d-flex">
                <input
                  type="text"
                  value={promotionCode}
                  onChange={(e) => setPromotionCode(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={checkPromotion}
                  style={{ marginLeft: 12 }}
                >
                  Apply
                </button>
              </div>
              <div className="line" />
            </>
          )}
        </>}
        <div className="order-summary">
          <div className="d-flex justify-content-between">
            <p>Items</p>
            <p>{totalItems}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>CV</p>
            <p>{totalBv}</p>
          </div>
          {props.promotionCode ? (
            <div className="d-flex justify-content-between">
              <p>Applied Code</p>
              <p>{props.promotionCode}</p>
            </div>
          ) : (
            ""
          )}

          {(props.shippingPrice != undefined && props.step == "billing-form") ? (
          <>
            {props.shippingData['shipping_country']=='US' && 
            <>
              <div className="d-flex justify-content-between">
                <p>Shipping Price</p>
                <p>{asPrice(props.shippingPrice)}</p>
              </div>
            </>
            }
            {(props.shippingData['shipping_country']=='CA' && handlingPrice>0) ?
            <>
              <div className="d-flex justify-content-between">
                <p>Shipping Price</p>
                <p>{asPrice(props.shippingPrice - handlingPrice)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Handling Charge</p>
                <p>{asPrice(handlingPrice)}</p>
              </div>
            </>
            : ''}
          </>
          ) : (
            ""
          )}
          {props.tax != undefined ? (
            <div className="d-flex justify-content-between">
              <p>Tax</p>
              <p>{asPrice(props.tax)}</p>
            </div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between">
            <p className="total-text">Total</p>
            <p className="total-text">
              {(props.userType==1 || props.userType==2) ?
                <strong>{asPrice(totalPrice)}</strong>
              : <strong>{asPrice(totalRetailPrice)}</strong>
              }
            </p>
          </div>
          {isAutoship && 
          <div className="d-flex justify-content-between">
            <p className="total-text">After 30 days</p>
            <p className="total-text">
              <strong>{asPrice(totalAutoshipPrice)}</strong>
            </p>
          </div>
          }
        </div>
      </div>
      <style jsx>{`
        .sidebar-cart {
          width: 374px;
          background-color: #fff;
          z-index: 71;
          padding: 60px 30px 30px 30px;
          box-shadow: 1px 0px 5px 0px rgba(224, 224, 224, 0.5);
        }
        @media (max-width: 768px) {
          .sidebar-cart {
            width: 100%;
          }
        }
        .product-thumb {
          height: 110px;
        }
        p {
          margin-bottom: 8px;
          opacity: 0.5;
        }
        .product-item {
          margin-bottom: 6px;
        }
        .image-section {
        }
        .desc-section {
          width: calc(100% - 100px);
        }
        .product-title {
          font-weight: bold;
          opacity: 1;
        }
        .product-price {
          margin-left: 12px;
          opacity: 1;
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
        .line {
          background-color: #c4c4c4;
          height: 1px;
          width: 100%;
          margin: 24px 0;
        }
        .justify-content-between {
          justify-content: space-between;
        }
        .justify-content-end {
          justify-content: flex-end;
        }
        .checkout-btn {
          margin-top: 24px;
          width: 138px;
          height: 36px;
          background: #1a4798;
          border-radius: 4px;
          color: #fff;
          border: 0 none;
        }
        .total-price p {
          color: #000;
          font-size: 16px;
          opacity: 1;
          font-size: 400;
        }
        .total-text {
          font-size: 16px;
          color: #000;
          font-weight: 700;
          opacity: 1;
        }
      `}</style>
    </>
  );
}
