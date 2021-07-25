import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { callGetApi } from 'utils/api'
import Cookies from 'universal-cookie';
import Layout from "components/layouts/layout";

export default function Home() {
  const router = useRouter()
  const { referer } = router.query
  const dispatch = useDispatch()

  const fetchReferer = () => {
    if (referer) {
      let username = referer
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
    router.push('/')
  }
  const onFailEnroller = (err) => {
    dispatch({
      type: 'FETCH_ENROLLEE_FAILURE', 
    })
    message.error('Your referer is not correct.')
    router.push('/')
  }

  useEffect(() => {
    setTimeout(() => {
      fetchReferer()
    }, 1000)
  }, [referer])

  return (
    <Layout>
      <div style={{height: 200}} className='d-flex align-items-center justify-content-center'>
        <p>Checking you referer now...</p>
      </div>
    </Layout>
  );
}
