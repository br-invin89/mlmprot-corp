import { useState, useEffect } from "react";
import { message, notification, Spin } from "antd";
import { callPostApi } from "utils/api";

export default function InfoForm(props) {
  const [formData, setFormData] = useState(props.personalData);
  const [errors, setErrors] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const checkUser = () => {
    let data = {
      user: {
        username: formData.username,
        email: formData.email,
      },
    };
    setIsSubmiting(true);
    callPostApi(`check/username`, data, onCheckUser, onCheckUserFail);
  };

  const onCheckUserFail = () => {
    setIsSubmiting(false);
    const args = {
      message: "Error",
      description:
        "Username or email exists already or reserved word on system.",
    };
    notification.error(args);
  };

  const onCheckUser = () => {
    setIsSubmiting(false);
    props.setStep("shipping-form");
  };

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value };
    setFormData(formData_);
    props.setPersonalData(formData_);
  };
  const handleContinue = () => {
    let errors = [];
    if (!formData.first_name) errors.push("first_name.required");
    if (!formData.last_name) errors.push("last_name.required");
    if (!formData.email) errors.push("email.required");
    if (!formData.phone) errors.push("phone.required");
    if (!formData.username) errors.push("username.required");
    if (!formData.password) errors.push("password.required");
    if (!formData.passwordConfirm) errors.push("passwordConfirm.required");
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    if (formData.password != formData.passwordConfirm) {
      errors.push("password.mismatch");
    } else if (formData.password.length < 8) {
      errors.push("password.length_short");
    } else if (!passwordRegex.test(formData.password)) {
      errors.push("password.strong");
    }
    if (formData.username.length > 15) errors.push("username.length_long");
    let regex = /^[a-z]+[a-z0-9_]+$/i;
    if (regex.exec(formData.username) == null) errors.push("username.invalid");
    regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.exec(formData.email) == null) errors.push("email.invalid");
    regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    checkUser();
  };

  return (
    <div className="checkout-form">
      <h4 className="checkout-title">User Information</h4>
      <div className="row">
        <div className="col-sm-6">
          <label>First Name *</label>
          <br />
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => onChangeForm("first_name", e.target.value)}
            className={`${
              errors.indexOf("first_name.required") >= 0 ? "input-error" : ""
            }`}
          />
          {errors.indexOf("first_name.required") >= 0 && (
            <p className="valid-error">Please input first name</p>
          )}
        </div>
        <div className="col-sm-6">
          <label>Last Name *</label>
          <br />
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => onChangeForm("last_name", e.target.value)}
            className={`${
              errors.indexOf("last_name.required") >= 0 ? "input-error" : ""
            }`}
          />
          {errors.indexOf("last_name.required") >= 0 && (
            <p className="valid-error">Please input last name</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <label>Email *</label>
          <br />
          <input
            type="text"
            value={formData.email}
            onChange={(e) => onChangeForm("email", e.target.value)}
            className={`${
              errors.indexOf("email.required") >= 0 ||
              errors.indexOf("email.invalid") >= 0
                ? "input-error"
                : ""
            }`}
          />
          {errors.indexOf("email.required") >= 0 && (
            <p className="valid-error">Please input email</p>
          )}
          {errors.indexOf("email.invalid") >= 0 && (
            <p className="valid-error">Please input email as email format</p>
          )}
        </div>
        <div className="col-sm-6">
          <label>Phone *</label>
          <br />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => onChangeForm("phone", e.target.value)}
            className={`${errors.indexOf("phone.required") >= 0 ? "input-error" : ""}`}
          />
          {errors.indexOf("phone.required") >= 0 && (
            <p className="valid-error">Please input phone number</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <label>Username *</label>
          <br />
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onChangeForm("username", e.target.value)}
            className={`${
              errors.indexOf("username.required") >= 0 ||
              errors.indexOf("username.invalid") >= 0 ||
              errors.indexOf("username.length_long") >= 0
                ? "input-error"
                : ""
            }`}
          />
          {errors.indexOf("username.required") >= 0 && (
            <p className="valid-error">Please input username</p>
          )}
          {errors.indexOf("username.length_long") >= 0 && (
            <p className="valid-error">
              Please input username less than 15 characters
            </p>
          )}
          {errors.indexOf("username.invalid") >= 0 && (
            <p className="valid-error">Please input username as alphanumeric</p>
          )}
        </div>
        {/*
        <div className='col-6'>
          <label>Ownership Name*</label><br/>
          <input type='text'        
            value={formData.ownership_name} 
            onChange={e=>onChangeForm('ownership_name', e.target.value)} />
        </div>
        */}
      </div>
      <div className="row">
        <div className="col-sm-6">
          <label>Password *</label>
          <br />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => onChangeForm("password", e.target.value)}
            className={`${
              errors.indexOf("password.required") >= 0 ||
              errors.indexOf("password.mismatch") >= 0 ||
              errors.indexOf("password.length_short") >= 0 ||
              errors.indexOf("password.strong") >= 0
                ? "input-error"
                : ""
            }`}
          />
          {errors.indexOf("password.required") >= 0 && (
            <p className="valid-error">Please input password</p>
          )}
          {errors.indexOf("password.mismatch") >= 0 && (
            <p className="valid-error">
              Please input password same as password confirm
            </p>
          )}
          {errors.indexOf("password.length_short") >= 0 && (
            <p className="valid-error">
              Please input password more than 8 characters
            </p>
          )}
          {errors.indexOf("password.strong") >= 0 && (
            <p className="valid-error">
              Password must contain Capital letters, Letters, Numbers and Special characters.
            </p>
          )}
        </div>
        <div className="col-sm-6">
          <label>Confirm Password *</label>
          <br />
          <input
            type="password"
            value={formData.passwordConfirm}
            onChange={(e) => onChangeForm("passwordConfirm", e.target.value)}
            className={`${
              errors.indexOf("passwordConfirm.required") >= 0
                ? "input-error"
                : ""
            }`}
          />
          {errors.indexOf("passwordConfirm.required") >= 0 && (
            <p className="valid-error">Please input confirm password</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between action-row">
        <button
          onClick={() => props.setStep("choose-type")}
          className="btn btn-secondary"
        >
          Prev
        </button>
        <button onClick={handleContinue} className="btn btn-primary">
          <Spin spinning={isSubmiting} className="info-form-spin" />Continue
        </button>
      </div>
      <style jsx>{``}</style>
    </div>
  );
}
