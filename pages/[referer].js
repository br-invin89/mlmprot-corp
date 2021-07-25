import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Spin, message } from 'antd'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
import { callGetApi } from 'utils/api'
import Layout from "components/layouts/layout";
import HomeHtml from "components/home.page/home-html";
import EnrollSection from 'components/home.page/main-slider'

export default function HomePageWithReferer() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { referer } = router.query
  const [isLoading, setIsLoading] = useState(true)

  const fetchReferer = () => {
    var username = ''
    const cookies = new Cookies()
    const savedReferer = cookies.get('nektarReferer')
    username = savedReferer
    console.log('savedReferer', savedReferer, referer)
    if (referer) {
      username = referer
    } 
    if (username!='') {      
      username = username.toLowerCase().trim()
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
    setIsLoading(false)
  }
  const onFailEnroller = (err) => {
    dispatch({
      type: 'FETCH_ENROLLEE_FAILURE', 
    })
    message.error('Your referer is not correct.')
    setIsLoading(false)
  }

  useEffect(() => {
    if (referer) {
      fetchReferer()
    }
  }, [referer])

  useEffect(() => {
    if (!isLoading) {
      router.push('/')
    }
  }, [isLoading])

  return (
    <Layout pageTitle='Shop'>
      <HomeHtml />
      <EnrollSection />
    </Layout>
  )
}
