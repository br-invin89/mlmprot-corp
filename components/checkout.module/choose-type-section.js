import { useState } from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'

export default function ChooseTypeSection(props) {  
  const handleContinue = () => {
    if (!props.userType) {
      message.error('Please select account type')
      return
    }
    props.setStep('info-form')
  }

  return (
    <div className='wrapper'>
      <h4 className='text-center checkout-title'>
        Account Type
      </h4>
      <p className='text-center'>Please select an account type:</p>
      <div className='d-flex justify-content-center'>
        <div className={`user-type-box ${props.userType==1?'active':''}`}
          onClick={()=>props.setUserType(1)}
        >
          <img src={'/images/user-icon1.svg'} />
          <h4 className='type-title'>
            Affiliate
          </h4>
          <p className='description'>
            Enjoy product discounts and earn rewards for referring others.
          </p>
        </div>
        <div className={`user-type-box ${props.userType==2?'active':''}`}
          onClick={()=>props.setUserType(2)}
        >
          <img src={'/images/user-icon2.svg'} />
          <h4 className='type-title'>
            Preferred Customer
          </h4>
          <p className='description'>
            Purchase Aluva products monthly at discounted pricing.
          </p>
        </div>
        {!props.isAutoship && 
        <div className={`user-type-box ${props.userType==3?'active':''}`}
          onClick={()=>props.setUserType(3)}
        >
          <img src={'/images/user-icon2.svg'} />
          <h4 className='type-title'>
            Retail Customer
          </h4>
          <p className='description'>
            Purchase Aluva products only this time.
          </p>
        </div>
        }
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={handleContinue} className='btn btn-primary'>Continue</button>
      </div>
      <style jsx>{`
        .wrapper {
          margin-bottom: 30px;
        }
        .user-type-box {
          cursor: pointer;
          width: 205px;
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 6px;
          border: 1px solid #E2E2E2;
          box-sizing: border-box;
          border-radius: 8px; 
        }
        .user-type-box.active, .user-type-box:hover {
          border-color: #1a4798;
        }
        .user-type-box img {
          margin-top: 32px;
          width: 56px;
          height: 62px;
        }
        .user-type-box p.description {
          padding: 6px 8px;
          text-align: center;
        }
        select {
          width: 300px;
        }
        .type-title {
          color: #6C757D;
          font-size: 16px;
          text-transform: uppercase;
          text-align: center;
        }
        .btn-checkout {
          margin-top: 24px;
        }
        @media (min-width: 480px) {
          .wrapper > div {
            flex-direction: row;
          }
        }
        @media (max-width: 480px) {
          .wrapper > div {
            align-items: center;
          }
          .user-type-box {
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  )
}