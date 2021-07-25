import Link from 'next/link'

export default function HomeHtml() {
  return (
    <>
      <section id="modal-section">
        <div className="container">
          <h4>WHY ALUVA</h4>
          <h2>REACH YOUR FULL<br/> POTENTIAL</h2>
          <Link href={'/opportunity'}>
            <div className="col-sm-4" >
              <div className="modal-box" >
                <img src="/images/ourmodel.png" />
                <h3>OUR MODEL</h3>
              </div> 
            </div> 
          </Link>
          <div className="col-sm-4" >
            <Link href={'/products'}>
              <div className="modal-box" >
                <img src="/images/our-products.png" />
                <h3>OUR PRODUCTS</h3>
              </div> 
            </Link>
          </div> 
          <div className="col-sm-4" >
            <Link href={'/our-story'}>
              <div className="modal-box" >
              <img src="/images/our-culture.png" />
              <h3>OUR CULTURE</h3>
              </div> 
            </Link>
          </div> 
		    </div>
      </section>
      <section id="biglogo">
        <div className="container">
          <img src="/images/big-logo.png"/>
		    </div>
      </section>
	    <section id="university">
        <div className="container">
          <div className="col-md-1" ></div>
          <div className="col-sm-6 col-md-5">
            <img src="/images/image_35.png"/>
          </div> 
          <div className="col-sm-6 col-md-5">
            <div className="tol-im">
                <h3>ENERGY</h3>	 
              <h2>IGNITE</h2> 
              <p>
	  	Our proprietary energy formulation was designed after spending countless hours of research to
		identify the right, “must have” ingredients. This relentless approach allowed us to create a product
		that provided beneficial energy without the typical crash or jitters.
		Each ingredient plays a unique role, providing the perfect synergy to create a natural, sustained
		energy without the toxic, harmful additives the distress your nervous system or harm your health.
		PRODUCT BENEFITS<br/>
		✓ Elevated Energy<br/>
		✓ Enhanced Metabolism<br/>
		✓ Improved Focus<br/>
		✓ Increased General Well-Being<br/>
	      </p> 
              <div style={{display: 'flex', alignItems: 'center'}}>
                <a href="https://nektar-assets.s3-us-west-2.amazonaws.com/ALUVA+ENERGY_IGNITE+OVERVIEW_.pdf" target="_blank" className="outline-btn">Product Sheet</a>
                <img src="/images/arrow-2.png"/>
              </div>
              
            </div>
          </div>
	  	    <div className="col-md-1" ></div>
	      </div>
      </section>
      
      <section id="university2">
        <div className="container">
          <div className="col-md-1" ></div>
          <div className="col-sm-6 col-md-push-5 col-md-5">
            <img src="/images/Group4.png"/>
          </div> 
          <div className="col-sm-6 col-md-pull-5 col-md-5">
            <div className="tol-im">
            <h3>WEIGHT LOSS</h3>	 
              <h2>G/BURN</h2> 
              <p>
	  	We have taken the best of everything we have learned from working with chemists and scientists around the world to bring you a powerful formulation you will love.
		Our powerful formulation takes each ingredient into consideration to ensure that they
		synergistically work together, bringing you the best possible product to help you reach your goals
		PRODUCT BENEFITS <br/>
		✓ Reduced Appetite<br/>
		✓ Enhanced Metabolism<br/>
		✓ Improved Digestion<br/>
		✓ Increased General Well-Being<br/>
		✓ Prolonged Metabolic Benefits<br/>
		✓ Improved Sleep<br/>
	  	
	      </p> 
              <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <a href="https://nektar-assets.s3-us-west-2.amazonaws.com/ALUVA+WEIGHT+LOSS_G_BURN_OVERVIEW_.pdf" target="_blank" className="outline-btn">Product Sheet</a>
                <img src="/images/arrow-2.png"/>
              </div>                            
            </div>
          </div>
          <div className="col-md-1" ></div>
        </div>
      </section>
 
	    <section id="drinks">
	      <img src="/images/culture-bg.png" />
        <div className="container">
          <div className="simpletab2 col-sm-5">
            <h3>OUR CULTURE</h3>
            <h2>INCLUSIVE &amp; EMPOWERING</h2>
            <p>Whether it’s food, drinks, or supplements, we should know what we are putting into our body. And it’s the same in business. You should know what you are getting into. Who is behind the company? What do they stand for? What is in the pay plan? From product to pay plan, we seek for simplicity, transparency and a place where everyday people become their best self.</p>
          </div>   
        </div> 
      </section>
      <div className="footer-bar">
        <div className="container">
          <div className="col-sm-12 p-0">
            <h3>@aluvaglobal</h3>
          </div>
          <div className="col-sm-12 p-0">
            <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed1.png"/></a>
            </div>
            <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed2.png" /></a>
            </div>
            <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed3.png"/></a>
            </div>
	          <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed4.png"/></a>
            </div>
	          <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed5.png"/></a>
            </div>
	          <div className="col-sm-2 p-0">
              <a href="#"><img src="/images/feed6.png"/></a>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
}
