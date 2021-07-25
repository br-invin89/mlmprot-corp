import Link from 'next/link'
import Layout from "components/layouts/layout";

export default function OurStory() {
  return (
    <Layout pageTitle="Opportunity">
      <div className="main-slider">
        <div className="main-slider-box">
          <div className="home-slider owl-carousel owl-theme">
            <div className="item opportunity-slider-item">
              <img src="/images/hero-bg.png" alt="slide"/>
              <div className="container">
                <div className="col-s-4">
                  <h6>WHO WE ARE</h6>
                  <h5>OUR STORY</h5>
                </div>
              </div>  
            </div>  
          </div>
        </div>
      </div>       
      <section id="guessing"> 
        <div className="col-md-6 p-0 gussing-img3"><img src="/images/iginiting_passion.png"/></div>
        <div className="col-md-6 p-0">
          <div className="gussing-bg  gussing-bg3">
            <h2>IGNITING PASSION</h2>
            <p>ALUVA was started in the wake of the global pandemic when uncertainty filled nearly every aspect of our lives and opportunities seemed bleak.  We wanted to help others take back control of their lives and find a way to step away from the status quo, recognize the opportunities that were being created by all the turmoil, and REDEFINE YOU through ALUVA.</p>
            <p>
            We are redefining health and wellness products.  We are redefining referral plans.  We are redefining the process of creating a business model that benefits individuals equitably.  We focus on content; asking “what’s in it?” in all aspects of the business.  No detail is left out of our meticulous yet simple plan to redefine. 
            </p>
            <p>
            We aim to ignite the passion in you that we have for betterment in the way we live; in health, and in freedom.  We invite you to learn more about what we mean by “REDEFINE YOU’, about our company, the opportunity we represent, and how to define your terms and live the life you want.
            </p>
          </div>
        </div>
      </section>
      <section className='our-story-desc'>
        <div className='container'>
          <div className='col-md-6'>
            <img src="/images/image36.png" />
          </div>
          <div className='col-md-6'>
            <h4>A MESSAGE FROM</h4>
            <h2>ALUVA PRESIDENT/CEO:</h2>
            <h3>GAVIN DICKSON</h3>
            <p>I have been passionate about two things all of my adult life:  health and financial well-being.  I grew up in a family of healthcare professionals where prescription medication filled every medicine cabinet. Like many homes in the United States, we had forgotten the basic principles of nutrition, wellness, and the concept of taking a holistic approach to living a healthy life.   As an adolescent, I watched my father’s heath deteriorate even as he tried to manage his ailments and sickness with prescription upon prescription, pill after pill. Eventually, I lost my father to his illness. This tragedy took a massive toll on my life, and the life of my family - both emotionally and financially.  It deeply impacted my young mind but probably not in the way you’d imagine: it gave me the drive to seek out knowledge about how to get healthy and stay healthy, and learn about what I should and shouldn’t be putting in my body to help me be healthy.</p>
            <p>These experiences from my childhood led me to spend much of my adult life studying preventative measures. I immersed myself in the science of biology and supplemental nutrients.  I learned very quickly that not all supplements are created equally. The quality of ingredients as well as how those ingredients work together is critical to wellness.  Furthermore, absorption is an often overlooked yet vital element to supplemental nutrition; so your body can use the nutrients you are consuming every day.</p>
            <p>I have spent countless hours in the research and development of different nutritional supplements and millions of dollars investing in health protocols from around the world.  Finally, with the help of all my experience and the expertise of specialized scientists and chemists, I have formulated a line of products that I can truly say is the best of what I’ve found and one that I’m proud to put my name on.  </p>
          </div>
        </div>        
      </section>
      <section className='our-story-desc our-story-desc2'>
        <div className='container'>          
          <div className='col-md-6'>
            <p>But health and vitality aren’t the only things I learned from the hardships of my childhood. After losing my father, I watched my mother struggle to pick up the pieces and support our family. Needless to say, as a widow and a single mother raising 6 children, life was a struggle. My mom went back to school, worked her ass off, and eventually dedicated her life to helping others traveling along the same difficult path as she was.  My mother is the inspiration that led me to create my own opportunities to strive for financial success while helping others along the way.<br/>
            I am now a father and I know what matters most in life.  It’s not money.  It’s not success.  It’s the ability to be your best self by living a healthy lifestyle, and it's the freedom to live your life and make your way on your own terms.  This allows for the one truly valuable commodity in life that you can’t change, create, or earn:  time.  <br/>
            Finally, my ultimate mission has to come to life with ALUVA. Whether you are trying to be healthier, have more energy, lose some weight, or just feel better in your everyday life, ALUVA’s products can help.
            </p>
            <p>
            If you are looking for a way to pay for your own wellness products, earn a few extra dollars a month to supplement your current income, or looking to create a full-time income on your own terms, ALUVA is built to help you succeed.<br/>
            ALUVA brings health and wellness together with simple, clear, easy to understand success principles to allow you to reach your goals, move towards your dreams, and REDEFINE YOU.
            </p>
            <h3>WELCOME TO ALUVA</h3>
          </div>
          <div className='col-md-6'>
            <img src="/images/image37.png" />
          </div>   
        </div>        
      </section>
      <section id="provide2">
        <div className="op-wrapper"> 
          <div className="col-sm-12">
          </div>
        </div>
      </section>
    </Layout>
  )
}
