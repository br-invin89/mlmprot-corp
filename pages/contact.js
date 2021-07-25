import { useState } from 'react'
import Layout from 'components/layouts/layout'
import { callPostApi } from 'utils/api'
import { message, Popconfirm } from 'antd'

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    subject: '',
    company_name: '',
    email: '',
    message: ''
  })
  const onChangeFormData = (field, value) => {
    setFormData({...formData, [field]: value})
  }
  const handleSubmit = () => {
    if (!formData.first_name ||
      !formData.last_name || 
      !formData.subject || 
      !formData.company_name || 
      !formData.email || 
      !formData.message
    ) {
      message.error('Please input all fields')
      return
    }
    callPostApi('contact', formData)
    message.success('You have sent contact request successfully')    
  }

  return (
    <Layout pageTitle={'Contact'}>
      <section id="enroll">
        <h2>&nbsp;</h2>
      </section>
	 
	    <section id="enrollbar">
        <div className="container">
          <div className="col-sm-5">
            <div className="contact-text">
              <h3>Need Help?</h3>
	      <div className="call-enrola">
                <img src="/images/Iconc1.png" />
                <h4>Call Us</h4>
                <span>1-833-382-0536</span>
              </div>
              <div className="call-enrola">
                <img src="/images/Iconc2.png" />
                <h4>Where to find us</h4>
                <span>26 s rio grande #2072 <br/>                
                slc, ut 84101</span>
              </div>
              <div className="call-enrola">
                <img src="/images/Iconc3.png" />
                <h4>Contact Us</h4>
                <span><b>Support:</b> Support@Aluva.co<br /> </span>
              </div>
            </div>
          </div>
          <div className="col-sm-1 "></div>
          <div className="col-sm-6 p-0">
            <div className="enroll-6"> 
              <form className="" onSubmit={e=>e.preventDefault()}>
                <div className="col-sm-6">
                  <div className="form-group ">
                    <label >First Name*</label>
                    <input type="text" className="form-control"  placeholder=" " 
                      value={formData.first_name} onChange={e=>onChangeFormData('first_name', e.target.value)}
                    />
                  </div> 
                </div> 
                <div className="col-sm-6">
                  <div className="form-group">
                    <label >Last Name*</label>
                    <input type="text" className="form-control" placeholder=" " 
                      value={formData.last_name} onChange={e=>onChangeFormData('last_name', e.target.value)}
                    />
                  </div> 
                </div> 
                <div className="col-sm-6">
                  <div className="form-group">
                    <label >Subject*</label>
                    <input type="text" className="form-control" placeholder=" "
                      value={formData.subject} onChange={e=>onChangeFormData('subject', e.target.value)}
                    />
                  </div> 
                </div> 
                <div className="col-sm-6">
                  <div className="form-group">
                    <label >Company Name*</label>
                    <input type="text" className="form-control" placeholder=" " 
                      value={formData.company_name} onChange={e=>onChangeFormData('company_name', e.target.value)}
                    />
                  </div> 
                </div> 
                <div className="col-sm-12">
                  <div className="form-group">
                    <label >Email Address*</label>
                    <input type="email" className="form-control"  placeholder=" " 
                      value={formData.email} onChange={e=>onChangeFormData('email', e.target.value)}
                    />
                  </div>
                </div>   
                
                <div className="col-sm-12">
                  <div className="form-group">
                    <label >Your Message*</label>
                    <textarea className='form-control'
                      value={formData.message} onChange={e=>onChangeFormData('message', e.target.value)}
                    />
                  </div>
                </div> 
                <div className="col-sm-12">
                  <Popconfirm
                    title={'Are you sure?'}
                    onConfirm={handleSubmit}
                  >
                    <button className="btn btn-default">Send Message</button>
                  </Popconfirm>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
