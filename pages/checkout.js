import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callPostApi } from "utils/api";
import { message, Spin } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import { countryByCode } from "utils/var/country";
import Layout from "components/layouts/layout";
import ConfirmEnrollerModal from "components/checkout.module/confirm-enroller-modal";
import StepBar from "components/checkout.module/step-bar";
import SideCart from "components/checkout.module/side-cart";
import ChooseTypeSection from "components/checkout.module/choose-type-section";
import InfoForm from "components/checkout.module/info-form";
import ShippingForm from "components/checkout.module/shipping-form";
import BillingForm from "components/checkout.module/billing-form";
import Confirmation from "components/checkout.module/confirmation";

export default function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.checkout.orderDetails);
  const distCenter = useSelector((state) => state.mlm.distCenter);
  const yourCountry = useSelector((state) => state.mlm.yourCountry);
  const isPcOrder = useSelector((state) => state.checkout.isPcOrder)
  const isAutoship = useSelector(state => state.checkout.isAutoship)
  const [step, setStep] = useState("choose-type"); // choose-type, info-form, credit-form, billing-form, confirmation
  const [userType, setUserType] = useState('');
  const referer = useSelector((state) => state.mlm.referer);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const defaultReferer = useSelector((state) => state.mlm.defaultReferer);
  const isConfirmedReferer = useSelector(
    (state) => state.mlm.isConfirmedReferer
  );
  const [personalData, setPersonalData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    username: "",
    ownership_name: "",
    password: "",
    passwordConfirm: "",
  });
  const [billingData, setBillingData] = useState({
    billing_address: "",
    billing_address_line2: "",
    billing_city: "",
    billing_state: "",
    billing_zipcode: "",
    billing_country: "US",
    cc_name: "",
    cc_type: "",
    cc_number: "",
    cc_cvv: "",
    cc_expiry_month: "",
    cc_expiry_year: "",
  });
  const [shippingData, setShippingData] = useState({
    shipping_address: "",
    shipping_address_line2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_zipcode: "",
    shipping_country: "US",
  });
  const [promotionCode, setPromotionCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [tax, setTax] = useState(undefined);
  const [shippingPrice, setShippingPrice] = useState(undefined);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [autoshipData, setAutoshipData] = useState({
    start_date: moment().format("YYYY-MM-DD"),
    end_date: "",
    recurring_period: "",
  });
  const [processedOrder, setProcessedOrder] = useState(undefined);
  const [processedUser, setProcessedUser] = useState(undefined);

  useEffect(() => {
    if (shippingPrice) {
      // checkTax();
    }
  }, [shippingPrice]);

  useEffect(() => {
    dispatch({
      type: "HIDE_SIDE_CART",
    });
  }, []);

  useEffect(() => {
    if (yourCountry=='CA') {
      setShippingData({
        ...shippingData, shipping_country: yourCountry
      })
      setBillingData({
        ...shippingData, billing_country: yourCountry
      })
    }
  }, [yourCountry])

  const getShippingPrice = () => {
    let data = {
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },      
      orderDetails: orderDetails.map((el) => ({
        product_id: el.product.id,
        quantity: el.quantity,
      })),
    };
    setIsShippingLoading(true);
    callPostApi(`check/shipping_price`, data, onGetShippingPrice, () =>
      setIsShippingLoading(false)
    );
  };
  const onGetShippingPrice = (data) => {
    checkTax(data.data.shippingPrice);
    setShippingPrice(data.data.shippingPrice);
  };
  const handleCheckout = () => {
    let data = {
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },
      billingDetail: {
        cc_name: billingData["cc_name"],
        cc_type: billingData["cc_type"],
        cc_number: billingData["cc_number"],
        cc_cvv: billingData["cc_cvv"],
        cc_exp_date:
          billingData["cc_expiry_month"] + "/" + billingData["cc_expiry_year"],
        billing_address: !isSameAddress
          ? billingData.billing_address
          : shippingData.shipping_address,
        billing_address_line2: !isSameAddress
          ? billingData.billing_address_line2
          : shippingData.shipping_address_line2,
        billing_city: !isSameAddress
          ? billingData.billing_city
          : shippingData.shipping_city,
        billing_state: !isSameAddress
          ? billingData.billing_state
          : shippingData.shipping_state,
        billing_zipcode: !isSameAddress
          ? billingData.billing_zipcode
          : shippingData.shipping_zipcode,
        billing_country: !isSameAddress
          ? billingData.billing_country
          : shippingData.shipping_country,
        bk_name: "",
        bk_bank: "",
        bk_account: "",
        bk_routing: "",
      },
      user: {
        first_name: personalData["first_name"],
        last_name: personalData["last_name"],
        email: personalData["email"].toLowerCase().trim(),
        phone: personalData["phone"],
        username: personalData["username"].toLowerCase().trim(),
        password: personalData["password"],
        type: userType,
        sponsor_id: referer.id,
      },
      payType: 1,
    };
    let orderDetails_ = [];
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      });
    }
    data["orderDetails"] = orderDetails_;
    if (promotionCode) data["promotion_code"] = promotionCode;    
    if (isAutoship) {
      data['is_autoship'] = 1;
    } else {
      data['is_autoship'] = 2;
    }

    setIsSubmiting(true);
    if (isPcOrder)
      callPostApi(`pc_checkout`, data, onSuccessCheckout, onFailCheckout);
    else callPostApi(`checkout`, data, onSuccessCheckout, onFailCheckout);
  };
  const onSuccessCheckout = (data) => {
    setIsSubmiting(false);
    setProcessedOrder(data.data.order);
    setProcessedUser(data.data.user);
    setStep("confirmation");
    dispatch({
      type: "CLEAR_CART",
    });
  };
  const onFailCheckout = (errMessage) => {
    setIsSubmiting(false);
    message.error(errMessage);
  };
  const setConfirmedPromotion = ({ discountAmount, promotionCode }) => {
    setPromotionCode(promotionCode);
    setDiscountAmount(discountAmount);
  };
  const goProducts = () => {
    router.push("/products");
  };
  const checkTax = (shiPrice) => {
    let orderDetails_ = [];
    for (let item of orderDetails) {
      orderDetails_.push({
        product_id: item.product.id,
        quantity: item.quantity,
      });
    }
    const data = {
      user: {
        ...personalData,
        type: userType,
      },
      order: {
        shipping_price: shiPrice,
      },
      orderDetails: orderDetails_,
      shippingDetail: {
        ...shippingData,
        dist_center_id: distCenter.id,
      },
      payType: 1,
      promoCode: promotionCode,
    };
    callPostApi(`check/tax`, data, onGetTax, onFailTax);
  };
  const onGetTax = (data) => {
    setIsShippingLoading(false);
    setStep("billing-form");
    setTax(data.data.taxAmount);
  };

  const onFailTax = (errMessage) => {
    setIsSubmiting(false);
    message.error(errMessage);
  };

  if (orderDetails.length == 0 && !processedOrder) {
    return (
      <Layout pageTitle="Checkout">
        <div className="container">
          <div style={{ margin: "120px 0" }}>
            <p className="text-center">There are no items.</p>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" onClick={goProducts}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Checkout">
      <div className="checkout-wrapper">
        {step != "confirmation" && (
          <>
            <div className="left-section">
              <div className="main-content">
                <h2>Checkout</h2>
                <StepBar step={step} />
                {step == "choose-type" && (
                  <ChooseTypeSection
                    userType={userType}
                    isAutoship={isAutoship}
                    setUserType={setUserType}
                    setStep={setStep}
                  />
                )}
                {step == "info-form" && (
                  <InfoForm
                    personalData={personalData}
                    setPersonalData={setPersonalData}
                    setStep={setStep}
                  />
                )}
                {step == "shipping-form" &&
                  (isShippingLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  ) : (
                    <ShippingForm
                      shippingData={shippingData}
                      setShippingData={setShippingData}
                      setStep={setStep}
                      checkTax={checkTax}
                      getShippingPrice={getShippingPrice}
                    />
                  ))}
                {step == "billing-form" && (
                  <BillingForm
                    shippingData={shippingData}
                    billingData={billingData}
                    setBillingData={setBillingData}
                    userType={userType}
                    isSameAddress={isSameAddress}
                    setIsSameAddress={setIsSameAddress}
                    handleCheckout={handleCheckout}
                    isAutoship={isAutoship}
                    orderDetails={orderDetails}
                    // setIsAutoship={setIsAutoship}
                    // autoshipData={autoshipData}
                    // setAutoshipData={setAutoshipData}
                    setStep={setStep}
                    tax={tax}
                    checkTax={checkTax}
                    isSubmiting={isSubmiting}
                  />
                )}
              </div>
            </div>
            <SideCart
              promotionCode={promotionCode}
              userType={userType}
              discountAmount={discountAmount}
              shippingPrice={shippingPrice}
              tax={tax}
              isSameAddress={isSameAddress}
              setConfirmedPromotion={setConfirmedPromotion}
              isShippingLoading={isShippingLoading}
              userType={userType}
              orderDetails={orderDetails}
              shippingData={shippingData}
              step={step}
            />
          </>
        )}
        {step == "confirmation" && (
          <Confirmation
            userType={userType}
            personalData={personalData}
            isSameAddress={isSameAddress}
            billingData={billingData}
            shippingData={shippingData}
            promotionCode={promotionCode}
            discountAmount={discountAmount}
            shippingPrice={shippingPrice}
            processedOrder={processedOrder}
            processedUser={processedUser}
            isPcOrder={isPcOrder}
          />
        )}

        {!isConfirmedReferer && defaultReferer ? <ConfirmEnrollerModal /> : ""}
        <style jsx>{``}</style>
      </div>
    </Layout>
  );
}
