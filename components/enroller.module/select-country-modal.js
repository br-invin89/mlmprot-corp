import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { callGetApi } from 'utils/api'
import { message, Modal, Select, Button } from 'antd'
import { countries } from 'utils/var/country'
import Cookies from 'universal-cookie'

export default function SelectCountryModal(props) {
  const dispatch = useDispatch()
  const [country, setCountry] = useState('US')

  const handleSave = () => {
    if (country=='') {
      message.error('Please select one country.')
      return
    }
    
    callGetApi(`dist_center/${country}`, onGetDistCenter, onFailDistCenter)
  }
  const onGetDistCenter = (data) => {    
    dispatch({
      type: 'SET_COUNTRY',
      payload: country
    })
    dispatch({
      type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
      payload: data.data
    })
    const cookies = new Cookies()
    cookies.set('nektarCountry', country, { path: '/', maxAge: 2592000 })
    cookies.set('nektarDistCenter', data.data, { path: '/', maxAge: 2592000 })
  }
  const onFailDistCenter = (errMessage) => {
    message.error('No service for this country, Select another country.')
  }

  return (
    <Modal
      width={320}
      closable={false}
      visible={true}
      footer={null}
    >
      <h4>Select your country</h4>
      <p>Enter your country below to ensure product availability.</p>
      <div>
        <Select 
          value={country}
          onChange={v=>setCountry(v)} 
          options={countries}
          style={{ width: '100%' }}
          placehodler={'Please select your country.'}
        />        
      </div>
      <div style={{ marginTop: 12 }}>
        <Button type='primary' onClick={handleSave}>
          Submit
        </Button>
      </div>
    </Modal>
  )
}