import '../styles/antd.less'
import '../styles/checkout.scss'
import '../styles/globals.scss'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Cookies from 'universal-cookie';
import store from 'epics/store'
import { callGetApi } from 'utils/api'
import { message } from 'antd'

function MyApp({ Component, pageProps, cookies }) {
  const dispatch = useDispatch()
  const yourCountry = useSelector(state=>state.mlm.yourCountry)

  const fetchDefaultReferer = () => {
    callGetApi('enroller', onGetDefaultEnroller)
  }
  const onGetDefaultEnroller = (res) => {
    dispatch({
      type: 'FETCH_DEFAULT_ENROLLEE_SUCCESS', 
      payload: res.data
    })
  }
  const fetchReferer = () => {
    var username = ''
    const cookies = new Cookies()
    const savedReferer = cookies.get('nektarReferer')
    if (savedReferer) {
      username = savedReferer
      username = username.toLowerCase().trim()
    } 
    if (username!='') {
      callGetApi(`enroller/${username}`, onGetEnroller, onFailEnroller)
    }
  }
  const onGetEnroller = (res) => {
    dispatch({
      type: 'FETCH_ENROLLEE_SUCCESS', 
      payload: res.data
    })
    const cookies = new Cookies()
    cookies.set('nektarReferer', res.data.username, { path: '/', maxAge: 2592000 })
  }
  const onFailEnroller = (err) => {
    dispatch({
      type: 'FETCH_ENROLLEE_FAILURE', 
    })
    message.error('Your referer is not correct.')
  }
  const fetchProducts = () => {
    callGetApi(`products`, onGetProducts)
  }
  const onGetProducts = (data) => {
    dispatch({
      type: 'RECEIVE_PRODUCTS',
      payload: data.data
    })
  }  
  const checkSavedCountry = () => {
    const cookies = new Cookies()
    const savedCountry = cookies.get('nektarCountry')
    if (savedCountry) {
      dispatch({
        type: 'SET_COUNTRY',
        payload: savedCountry
      })
    }
    const savedDistCenter = cookies.get('nektarDistCenter')
    if (savedDistCenter) {
      dispatch({
        type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
        payload: savedDistCenter
      })
    }
  }

  const fetchDistCenter = () => {
    dispatch({
      type: 'SET_COUNTRY',
      payload: yourCountry
    })
    callGetApi(`dist_center/${yourCountry}`, onGetDistCenter)
  }
  const onGetDistCenter = (data) => {
    dispatch({
      type: 'FETCH_DISTRIBUTION_CENTER_SUCCESS',
      payload: data.data
    })
    const cookies = new Cookies()
    cookies.set('nektarCountry', yourCountry, { path: '/', maxAge: 2592000 })
    cookies.set('nektarDistCenter', data.data, { path: '/', maxAge: 2592000 })
  }

  useEffect(() => {
    if (!yourCountry) return
    fetchDefaultReferer()
    setTimeout(() => fetchReferer(), 1000)
    // fetchProducts()
    // checkSavedCountry()
    fetchDistCenter()
  }, [yourCountry])

  return ( 
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store

export default withRedux(makeStore)(MyApp)
