import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message, Popconfirm, Spin } from 'antd'
import moment from 'moment'
import { countries, statesByCountry } from 'utils/var/country'
import { callPostApi } from 'utils/api'
import { DatePicker } from 'antd'

export default function BillingForm(props) {
  const [formData, setFormData] = useState(props.billingData)
  const [errors, setErrors] = useState([])
  const [states, setStates] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isConfirmedCa, setIsConfirmedCa] = useState(false)
  const [autoshipData, setAutoshipData] = useState(props.autoshipData)
  var d = new Date()
  var currentYear = d.getFullYear().toString().substr(-2)*1
  var years = []
  for (let i=currentYear; i<=currentYear+20; i++) {
    years.push(i)
  }

  useEffect(() => {
    setStates(statesByCountry(formData.billing_country))
  }, [formData.billing_country])

  useEffect(() => {
    setFormData({
      ...formData,
      billing_country: props.shippingData.shipping_country
    })
  }, [props.shippingData])

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
    props.setBillingData(formData_)
  }
  const onChangeAutoship = (field, value) => {
    let autoshipData_ = { ...autoshipData, [field]: value }
    setAutoshipData(autoshipData_)
    props.setAutoshipData(autoshipData_)
  }
  const checkValid = () => {
    let errors = []
    if (!formData.cc_name) errors.push('cc_name.required')
    if (!formData.cc_type) errors.push('cc_type.required')
    if (!formData.cc_number) errors.push('cc_number.required')
    if (!formData.cc_cvv) errors.push('cc_cvv.required')
    if (!formData.cc_expiry_month) errors.push('cc_expiry_month.required')
    if (!formData.cc_expiry_year) errors.push('cc_expiry_year.required')    
    if (!props.isSameAddress) {
      if (!formData.billing_country) errors.push('billing_country.required')
      if (!formData.billing_state) errors.push('billing_state.required')
      if (!formData.billing_city) errors.push('billing_city.required')
      if (!formData.billing_address) errors.push('billing_address.required')
      if (!formData.billing_zipcode) errors.push('billing_zipcode.required')
    }
    if (formData.billing_country=='CA') {
      props.orderDetails.forEach(el => {
        if (el.quantity>3) {
          errors.push('ca_qty_limit.over')
        }
      })
    }
    // if (props.isAutoship) {
    //   if (autoshipData.recurring_period=='') errors.push('autoship.recurring_period.required')
    //   if (autoshipData.start_date=='') errors.push('autoship.start_date.required')
    //   if (autoshipData.end_date=='') errors.push('autoship.end_date.required')
    // }

    if (errors.length>0) {
      setErrors(errors)
      return false
    }

    let regex = /^[0-9]{3,4}$/
    if (regex.exec(formData.cc_cvv) == null) errors.push('cc_cvv.invalid')
    if (!props.isSameAddress) {
      if (formData.billing_address.length>190) errors.push('billing_address.too_long')
      if (formData.billing_city.length>190) errors.push('billing_city.too_long')
    }

    if (errors.length>0) {
      setErrors(errors)
      return false
    }

    setErrors([])

    return true
  }
  const handleCheckout = () => {
    if (checkValid()) {
      props.handleCheckout()
    }    
  }

  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        Payment Information
      </h4>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Name on Card *</label><br/>
          <input type='text'
            value={formData.cc_name} 
            onChange={e=>onChangeForm('cc_name', e.target.value)} 
            className={`${errors.indexOf('cc_name.required')>=0?'input-error':''}`}
          />
          {errors.indexOf('cc_name.required')>=0 && 
            <p className='valid-error'>Please input name on credit card</p>
          }
        </div>
        <div className='col-sm-6'>
          <label>Card Type *</label><br/>
          <select value={formData.cc_type}
            onChange={e=>onChangeForm('cc_type', e.target.value)}
            className={`${errors.indexOf('cc_type.required')>=0?'input-error':''}`}
          >
            <option value=''></option>
            <option value='1'>Visa</option>
            <option value='2'>Mastercard</option>
            <option value='3'>Discover</option>
            <option value='4'>Amex</option>
            <option value='5'>Diners</option>
          </select>
          {errors.indexOf('cc_type.required')>=0 && 
            <p className='valid-error'>Please select credit card type</p>
          }
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-9'>
          <label>Credit Card Number *</label><br/>
          <input type='text'
            value={formData.cc_number} 
            onChange={e=>onChangeForm('cc_number', e.target.value)} 
            className={`${errors.indexOf('cc_number.required')>=0?'input-error':''}`}
          />
          {errors.indexOf('cc_number.required')>=0 && 
            <p className='valid-error'>Please input cc number</p>
          }
        </div>
        <div className='col-sm-3'>
          <label>Security Code *</label><br/>
          <input type='text'
            value={formData.cc_cvv} 
            onChange={e=>onChangeForm('cc_cvv', e.target.value)} 
            className={`${errors.indexOf('cc_cvv.required')>=0 || errors.indexOf('cc_cvv.invalid')>=0?'input-error':''}`}
          />
          {errors.indexOf('cc_cvv.required')>=0 && 
            <p className='valid-error'>Please input security code</p>
          }
          {errors.indexOf('cc_cvv.invalid')>=0 && 
            <p className='valid-error'>CVV Number should be 3-4 digit numbers</p>
          }
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Exp Month *</label><br/>
          <select value={formData.cc_expiry_month}
            onChange={e=>onChangeForm('cc_expiry_month', e.target.value)}
            placeholder='Month'
            className={`${errors.indexOf('cc_expiry_month.required')>=0?'input-error':''}`}
          >
            <option value=''></option>
            {[...Array(12).keys()].map(i => 
            <option value={i<9?'0'+(i+1):(i+1)} key={i}>{i+1}</option>
            )}
          </select>
          {errors.indexOf('cc_expiry_month.required')>=0 && 
            <p className='valid-error'>Please input credit card expiry month</p>
          }
        </div>
        <div className='col-sm-6'>
          <label>Exp Year *</label><br/>
          <select value={formData.cc_expiry_year}
            onChange={e=>onChangeForm('cc_expiry_year', e.target.value)}
            placeholder='Year'
            className={`${errors.indexOf('cc_expiry_year.required')>=0?'input-error':''}`}
          >
            <option value=''></option>
            {years.map(y => 
            <option value={y} key={y}>20{y}</option>
            )}
          </select>
          {errors.indexOf('cc_expiry_year.required')>=0 && 
            <p className='valid-error'>Please input credit card expiry year</p>
          }
        </div>
      </div>
      <div>
        <label>
          <input type='checkbox' 
            checked={props.isSameAddress}
            onChange={e=>props.setIsSameAddress(e.target.checked)}
          /> Billing Address same as Shipping
        </label>
      </div>
      {!props.isSameAddress?
      <>
        <h4 className='checkout-title'>
          Billing Address
        </h4>
        <div className='row'>
          <div className='col-sm-6'>
            <label>Address Line 1 *</label><br/>
            <input type='text'
              value={formData.billing_address} 
              onChange={e=>onChangeForm('billing_address', e.target.value)} 
              className={`${errors.indexOf('billing_address.required')>=0||errors.indexOf('billing_address.too_long')>=0?'input-error':''}`}
            />
            {errors.indexOf('billing_address.required')>=0 && 
              <p className='valid-error'>Please input billing address</p>
            }
            {errors.indexOf('billing_address.too_long')>=0 && 
              <p className='valid-error'>Billing address should be less than 190 characters</p>
            }
          </div>
          <div className='col-sm-6'>
            <label>Address Line 2</label><br/>
            <input type='text'
              value={formData.billing_address_line2} 
              onChange={e=>onChangeForm('billing_address_line2', e.target.value)} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>City *</label><br/>
            <input type='text'
              value={formData.billing_city} 
              onChange={e=>onChangeForm('billing_city', e.target.value)} 
              className={`${errors.indexOf('billing_city.required')>=0||errors.indexOf('billing_city.too_long')>=0?'input-error':''}`}
            />
            {errors.indexOf('billing_city.required')>=0 && 
              <p className='valid-error'>Please input billing city</p>
            }
            {errors.indexOf('billing_city.too_long')>=0 && 
              <p className='valid-error'>Billing city should be less than 190 characters</p>
            }
          </div>
          <div className='col-sm-6'>
            <label>State/Province *</label><br/>
            <select 
              value={formData.billing_state}
              onChange={e=>onChangeForm('billing_state', e.target.value)}
              className={`${errors.indexOf('billing_state.required')>=0?'input-error':''}`}
            >
              <option value=''></option>
              {states.map(state=>
              <option value={state['name']}>{state['name']}</option>
              )}
            </select>
            {errors.indexOf('billing_state.required')>=0 && 
              <p className='valid-error'>Please input billing state</p>
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>Zip/Postal Code *</label><br/>
            <input type='text'
              value={formData.billing_zipcode} 
              onChange={e=>onChangeForm('billing_zipcode', e.target.value)} 
              className={`${errors.indexOf('billing_zipcode.required')>=0?'input-error':''}`}
            />
            {errors.indexOf('billing_zipcode.required')>=0 && 
              <p className='valid-error'>Please input billing zipcode</p>
            }
          </div>
          <div className='col-sm-6'>
            <label>Country *</label><br/>
            <select 
              value={formData.billing_country}
              onChange={e=>onChangeForm('billing_country', e.target.value)}
              className={`${errors.indexOf('billing_country.required')>=0?'input-error':''}`}
              disabled
            >
              <option value=''></option>
              {[
                {
                  value: 'US',
                  label: 'United States',
                }, 
                {
                  value: 'CA',
                  label: 'Canada',
                }].map(country=>
              <option value={country.value}>{country.label}</option>
              )}
            </select>
            {errors.indexOf('billing_country.required')>=0 && 
              <p className='valid-error'>Please input billing country</p>
            }
          </div>
        </div>
      </>
      : ''}
      {errors.indexOf('ca_qty_limit.over')>=0 && 
      <div>
        <p className='valid-error'>Limit Line Qty to 3 units per sku</p>
      </div>
      }      
      <div className='d-flex justify-content-between action-row' style={{ marginTop: 24 }}>
        <div>
          <button onClick={()=>props.setStep('shipping-form')} className='btn btn-secondary'>Prev</button>
        </div>
        <div className='d-flex'>
          {/*
          <label style={{ margin: '0 8px 0 0'}}>
            <input type='checkbox'
              checked={props.isAutoship}
              onChange={e=>props.setIsAutoship(e.target.checked)}
            />
            Set as Autoship&nbsp;&nbsp;
          </label>
          */}
          {/*
          <button className='btn btn-secondary' 
            onClick={props.checkTax}
            style={{ marginRight: 12 }}
          >
            Calculate Tax
          </button>
          */}
          <Popconfirm
            onConfirm={handleCheckout}
            okText='Yes' cancelText='No' title='Are you sure?'
          >
            <Spin spinning={props.isSubmiting}>
              <button className='btn btn-primary'
                disabled={!isConfirmed || (formData.billing_country=='Canada' && !isConfirmedCa) || props.tax==undefined}
              >
                Complete Purchase
              </button>
            </Spin>
          </Popconfirm>
        </div>
      </div>
      {/*
      props.isAutoship?
        <div className='row'>
          <div className='col-sm-6'>
            <label>Start, End Date *</label><br/>
            <div className='date-range'>
              <DatePicker.RangePicker
                format={'YYYY-MM-DD'}              
                value={[
                  autoshipData.start_date?moment(autoshipData.start_date):'', 
                  autoshipData.end_date?moment(autoshipData.end_date):''
                ]}
                onChange={(_, dates)=>{
                  let autoshipData_ = {...autoshipData, 
                    start_date: dates[0],
                    end_date: dates[1],
                  }
                  setAutoshipData(autoshipData_)
                  props.setAutoshipData(autoshipData_)
                }}
                disabled={[true, false]}
                style={{
                  background: 'transparent',
                  border: '0 none',
                  padding: 0
                }}
                className={`${errors.indexOf('autoship.start_date.required')>=0||errors.indexOf('autoship.end_date.required')>=0?'input-error':''}`}
              />
              {(errors.indexOf('autoship.start_date.required')>=0 || errors.indexOf('autoship.end_date.required')>=0) && 
              <p className='valid-error'>Please input start/end date</p>
            }
            </div>
          </div>
          <div className='col-sm-6'>
            <label>Delivery every (days) *</label><br/>
            <input type='numeric' value={autoshipData.recurring_period}
              onChange={e=>onChangeAutoship('recurring_period', e.target.value)}
              className={`${errors.indexOf('autoship.recurring_period.required')>=0?'input-error':''}`}
            />
            {errors.indexOf('autoship.recurring_period.required')>=0 && 
              <p className='valid-error'>Please input frequency</p>
            }
          </div>
        </div>
      : ''
          */}
      <div className='agreement'>
        <label>
          <input type='checkbox'
            checked={isConfirmed}
            onChange={e=>setIsConfirmed(e.target.checked)}
          />&nbsp;
          I understand and agree to the Aluva policies and procedures listed on this website.
        </label>        
      </div>
      {/*
      formData.billing_country=='CA' && 
      <div className='agreement'>
        <label>
          <input type='checkbox'
            checked={isConfirmedCa}
            onChange={e=>setIsConfirmedCa(e.target.checked)}
          />&nbsp;
          I agree and understand that Aluva products are currently Not For Resale (NFR) in Canada and are on pre-order. Products will begin shipping in Canada on June 1st, 2021.
        </label>
      </div>
      */}
      <style jsx>{`
        .btn-checkout {
          width: 160px;
          margin-left: 12px;
        }
        .btn-checktax {
          width: 200px;
        }
        .agreement {
          margin-top: 12px;
        }
        input[type=checkbox] {
          width: 18px;
          height: 18px;
        }
        .action-row {
          flex-direction: row !important;
          margin-top: 24px;
        }
        @media (max-width: 480px) {
          .btn-checkout {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  )
}
