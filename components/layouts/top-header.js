import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EnrollerModal from 'components/enroller.module/enroller-modal'
import { countryCodeByName } from 'utils/var/country'

export default function TopHeader() {
  const { pathname } = useRouter()
  const dispatch = useDispatch()
  const defaultReferer = useSelector(state=>state.mlm.defaultReferer)
  const userType = useSelector(state=>state.mlm.userType)
  const [isOpenedEnroller, setIsOpenedEnroller] = useState(false)

  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json')
    .then( res => res.json())
    .then(res => {
      let country = countryCodeByName(res.country);
      dispatch({
        type: 'SET_COUNTRY',
        payload: country
      })
    })
    .catch((data, status) => {
      console.log('Request failed');
    })
  }, [defaultReferer])

  const openEnroller = () => {
    setIsOpenedEnroller(true)
  }

  return (
    <div className="top-header">
      <div className="container">
        <ul className="nav navbar-nav navbar-left">
          <li>
            <a href="#"> </a>
          </li>
          <li>
            <a href="#"> </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right" style={{display: 'flex', float: 'right'}}>          
          <li>
            <a href="javascript:void(0)" onClick={openEnroller}>Enroller</a>
          </li>
          <li>
            <a href={process.env.NEXT_PUBLIC_BACKOFFICE}><i className='fa fa-user'/>{" "}Member Login</a>
          </li>
        </ul>
      </div>
      {isOpenedEnroller &&
        <EnrollerModal onClose={()=>setIsOpenedEnroller(false)} />
      }
    </div>
  );
}
