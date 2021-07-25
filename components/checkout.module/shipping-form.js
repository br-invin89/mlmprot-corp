import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message, Popconfirm, Spin } from 'antd'
import { countries, statesByCountry } from 'utils/var/country'

export default function ShippingForm(props) {
  const [formData, setFormData] = useState(props.shippingData)
  const [errors, setErrors] = useState([])
  const [states, setStates] = useState([])

  useEffect(() => {
    setStates(statesByCountry(formData.shipping_country))
  }, [formData.shipping_country])

  const onChangeForm = (field, value) => {
    let formData_ = { ...formData, [field]: value }
    setFormData(formData_)
    props.setShippingData(formData_)
  }
  const handleContinue = () => {
    let errors = []
    if (!formData.shipping_country) errors.push('shipping_country.required')
    if (!formData.shipping_state) errors.push('shipping_state.required')
    if (!formData.shipping_city) errors.push('shipping_city.required')
    if (!formData.shipping_address) errors.push('shipping_address.required')
    if (!formData.shipping_zipcode) errors.push('shipping_zipcode.required')

    if (errors.length>0) {
      setErrors(errors)
      return
    }

    if (formData.shipping_address.length>190) errors.push('shipping_address.too_long')
    if (formData.shipping_city.length>190) errors.push('shipping_city.too_long')

    if (errors.length>0) {
      setErrors(errors)
      return
    }

    props.getShippingPrice()
  }  

  return (
    <div className='checkout-form'>
      <h4 className='checkout-title'>
        Shipping Address
      </h4>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Address Line 1 *</label><br/>
          <input type='text'
            value={formData.shipping_address} 
            onChange={e=>onChangeForm('shipping_address', e.target.value)} 
            className={`${errors.indexOf('shipping_address.required')>=0 || errors.indexOf('shipping_address.too_long')>=0?'input-error':''}`}
          />
          {errors.indexOf('shipping_address.required')>=0 && 
            <p className='valid-error'>Please input shipping address</p>
          }
          {errors.indexOf('shipping_address.too_long')>=0 && 
            <p className='valid-error'>Please input shipping address less than 190 characters</p>
          }
        </div>
        <div className='col-sm-6'>
          <label>Address Line 2</label><br/>
          <input type='text'
            value={formData.shipping_address_line2} 
            onChange={e=>onChangeForm('shipping_address_line2', e.target.value)} />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>City *</label><br/>
          <input type='text'
            value={formData.shipping_city} 
            onChange={e=>onChangeForm('shipping_city', e.target.value)} 
            className={`${errors.indexOf('shipping_city.required')>=0||errors.indexOf('shipping_city.too_long')>=0?'input-error':''}`}
          />
          {errors.indexOf('shipping_city.required')>=0 && 
            <p className='valid-error'>Please input shipping city</p>
          }
          {errors.indexOf('shipping_city.too_long')>=0 && 
            <p className='valid-error'>Please input shipping city less than 190 characters</p>
          }
        </div>
        <div className='col-sm-6'>
          <label>State/Province *</label><br/>
          <select 
            value={formData.shipping_state}
            onChange={e=>onChangeForm('shipping_state', e.target.value)}
            className={`${errors.indexOf('shipping_state.required')>=0?'input-error':''}`}
          >
            <option value=''></option>
            {states.map(state=>
            <option value={state['name']}>{state['name']}</option>
            )}
          </select>
          {errors.indexOf('shipping_state.required')>=0 && 
            <p className='valid-error'>Please input shipping state</p>
          }
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <label>Zip/Postal Code *</label><br/>
          <input type='text'
            value={formData.shipping_zipcode} 
            onChange={e=>onChangeForm('shipping_zipcode', e.target.value)} 
            className={`${errors.indexOf('shipping_zipcode.required')>=0?'input-error':''}`}
          />
          {errors.indexOf('shipping_zipcode.required')>=0 && 
            <p className='valid-error'>Please input shipping zipcode</p>
          }
        </div>
        <div className='col-sm-6'>
          <label>Country *</label><br/>
          <select 
            value={formData.shipping_country}
            onChange={e=>onChangeForm('shipping_country', e.target.value)}
            className={`${errors.indexOf('shipping_country.required')>=0?'input-error':''}`}
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
          {errors.indexOf('shipping_country.required')>=0 && 
            <p className='valid-error'>Please input shipping country</p>
          }
        </div>
      </div>
      <div className='d-flex justify-content-between action-row' style={{ marginTop: 24 }}>
        <div>
          <button onClick={()=>props.setStep('info-form')} className='btn btn-secondary'>Prev</button>
        </div>
        <div className='d-flex'>
          <button className='btn btn-primary' onClick={handleContinue}>Continue</button>
        </div>
      </div>
      <style jsx>{`
      `}</style>
    </div>
  )
}