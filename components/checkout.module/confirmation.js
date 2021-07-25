import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { asPrice, asNumber } from "utils/text";

export default function Confirmation(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [productNameStr, setProductNameStr] = useState("");
  const [handlingPrice, setHandlingPrice] = useState(0); // for canada order shipping 

  const goHome = () => {
    router.push("/");
  };
  const goBackoffice = () => {
    const { username } = props.personalData;
    const password = btoa(props.personalData.password);
    window.location = `${process.env.NEXT_PUBLIC_BACKOFFICE}/login?autologin=${username}&token=${password}`;
    // window.open(`${process.env.NEXT_PUBLIC_BACKOFFICE}`, '_blank')
  };

  useEffect(() => {
    if (props.processedOrder) {
      let orderDetails = props.processedOrder.details;
      let productNameStr = orderDetails
        ?.map((el) => el.product.title)
        .join(", ");
      setProductNameStr(productNameStr);
      let handlingPrice = 0;
      if (props.shippingData.shipping_country=='CA' && !props.isPcOrder) {
        orderDetails.forEach(el => {
          handlingPrice += el['quantity']*el.product.member_price
        })
        handlingPrice = 0.1*handlingPrice
        setHandlingPrice(handlingPrice)
      }
    }
  }, [props.processedOrder]);

  return (
    <div className="wrapper">
      <div className="d-flex d-flex-column align-items-center">
        <img src={"/images/check-confirmed.svg"} className="confirmed-img" />
        <h2>Your order has been completed!</h2>
        <p>
          Welcome to the Aluva Family! We’ll take it from here.
          <br />
          We’ve sent a confirmation email to{" "}
          <strong>{props.personalData.email}</strong>
        </p>
        <div style={{ width: "100%" }}>
          <h4>Details</h4>
          <p>
            You purchased the <strong>{productNameStr}</strong>
          </p>
          <p>
            You will be charged{" "}
            <strong>
              {props.processedOrder
                ? asPrice(props.processedOrder.order_total_amount)
                : ""}
            </strong>
          </p>
          <div className="confirm-box">
            <div className="d-flex justify-content-between">
              <div className="col-6">
                <p>
                  <strong>Customer Information</strong>
                </p>
                <p>
                  {props.personalData.first_name +
                    " " +
                    props.personalData.last_name}
                </p>
                <p>
                  {props.isSameAddress
                    ? props.shippingData.shipping_address
                    : props.billingData.billing_address}
                </p>
                <p>
                  {props.isSameAddress
                    ? props.shippingData.shipping_address_line2
                    : props.billingData.billing_address_line2}
                </p>
                <p>
                  {props.isSameAddress
                    ? props.shippingData.shipping_city
                    : props.billingData.billing_city}
                  ,{" "}
                  {props.isSameAddress
                    ? props.shippingData.shipping_state
                    : props.billingData.billing_state}{" "}
                  {props.isSameAddress
                    ? props.shippingData.shipping_zipcode
                    : props.billingData.billing_zipcode}
                </p>
              </div>
              <div className="col-6">
                <p>
                  <strong>Account Type</strong>
                </p>
                <p>
                  {props.userType == 1 ? "Affiliate" : "Customer"}
                </p>
                <p>
                  <strong>Your Referer</strong>
                </p>
                <p>
                  {props.processedUser.sponsor.username ? props.processedUser.sponsor.username : props.processedUser.username}
                </p>
              </div>
            </div>
          </div>
          <div className="confirm-box">
            <p>
              <strong>Payment Method</strong>
            </p>
            <p>
              {props.billingData.cc_type === "1"
                ? "Visa"
                : props.billingData.cc_type === "2"
                ? "Mastercard"
                : props.billingData.cc_type === "3"
                ? "Discover"
                : props.billingData.cc_type === "4"
                ? "Amex"
                : props.billingData.cc_type === "5"
                ? "Diners"
                : ""}{" "}
              ending in{" "}
              <strong>
                {props.billingData.cc_number.slice(
                  props.billingData.cc_number.length - 4
                )}
              </strong>
            </p>
          </div>
          {props.processedOrder ? (
          <>
            {props.shippingData.shipping_country=='US' && 
              <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <p>{asPrice(props.processedOrder.shipping_price)}</p>
              </div>
            }
            {props.shippingData.shipping_country=='CA' && 
              <>
                <div className="d-flex justify-content-between">
                  <p>Shipping</p>
                  <p>{asPrice(props.processedOrder.shipping_price - handlingPrice)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Handling Charge</p>
                  <p>{asPrice(handlingPrice)}</p>
                </div>
              </>
            }
          </>
          ) : (
            ""
          )}
          {props.processedOrder &&
          props.processedOrder.tax_amount != undefined ? (
            <div className="d-flex justify-content-between">
              <p>Tax</p>
              <p>{asPrice(props.processedOrder.tax_amount)}</p>
            </div>
          ) : (
            ""
          )}
          {props.processedOrder ? (
            <div className="d-flex justify-content-between">
              <p>CV</p>
              <p>{asNumber(props.processedOrder.order_total_cv)}</p>
            </div>
          ) : (
            ""
          )}
          {props.processedOrder ? (
            <div className="d-flex justify-content-between total-price">
              <p>Total</p>
              <p>{asPrice(props.processedOrder.order_total_amount)}</p>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-center">
            <button className="btn btn-secondary btn-back" onClick={goHome}>
              Return to Homepage
            </button>
            <button className="btn btn-primary" onClick={goBackoffice}>
              Access My Account
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 700px;
          margin: 30px auto;
        }
        @media (max-width: 700px) {
          .wrapper {
            width: calc(100% - 20px);
            margin-left: 10px;
          }
          .confirm-box .d-flex {
            flex-direction: column;
          }
        }
        h2 {
          color: #000;
          font-size: 24px;
          margin-top: 12px;
        }
        h4 {
          color: #000;
          font-size: 20px;
          margin-top: 24px;
        }
        .col-6 {
          width: 50%;
        }
        .confirmed-img {
          width: 60px;
          height: 60px;
        }
        .btn-checkout {
          margin: 0 8px;
        }
        .confirm-box {
          border: 1px solid #e2e2e2;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 24px;
          margin: 20px 0;
        }
        .total-price {
          font-size: 16px;
          font-weight: 700;
          color: #000;
        }
        .btn-checkout {
          width: 180px;
        }
        .btn-back {
          margin-right: 12px;
        }
      `}</style>
    </div>
  );
}
