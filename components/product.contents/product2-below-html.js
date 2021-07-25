export default function Product2BelowHtml(props) {

  return (
	  <section id="tab-bar">
	    <div className="container">
        <ul className="nav nav-pills"> 
          <li className={`active`}>
            <a data-toggle="pill" href="#menu3">
              Benefits
            </a>
          </li>
          <li className={``}>
            <a data-toggle="pill" href="#menu4">
              Ingredients
            </a>
          </li> 
        </ul>
      </div>
      <div className="tab-content">
        <div id="menu3" className={`tab-pane fade in active`}>
          <div className="container"> 
            <div className='row'>
              <div className="col-sm-6 col-md-7"></div>
              <div className="col-sm-6 col-md-5">
                <div className="tab-bar-bg">
                  <h3>Benefits</h3>
                  <ul>
                    <li><img src="/icons/attr6.svg"/><h4>All Day Fat Burning</h4></li>
                    <li><img src="/icons/attr5.svg"/><h4>Natural Ingredients</h4></li>
                    <li><img src="/icons/attr7.svg"/><h4>Metabolism Support</h4></li>
                    <li><img src="/icons/attr8.svg"/><h4>Digestive Support</h4></li>
                    <li><img src="/icons/attr9.svg"/><h4>Appetite Suppressant</h4></li>
                    <li><img src="/icons/attr2.svg"/><h4>Superior Absorption</h4></li>
                    <li><img src="/icons/attr10.svg"/><h4>Works Synergistically with Ignite Energy</h4></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu4" className={`tab-pane fade`}>
          <div className="container"> 
            <div className='row'>
              <div className="col-sm-6 col-md-7"></div>
              <div className="col-sm-6 col-md-5">
                <div className="tab-bar-bg2">
                  <h3>Core Ingredients</h3>
                  <ul>
                    <li><img src="/images/core6.png"/><span><b>Garcinia Cambogia</b> </span></li>
                    <li><img src="/images/core7.png"/><span><b>Raspberry Ketones</b></span></li>
                    <li><img src="/images/core8.png"/><span><b>Matcha </b></span></li>
                    <li><img src="/images/core9.png"/><span><b>Cayenne Pepper </b></span></li>
                    <li><img src="/images/core10.png"/><span><b>Trace Mineral Blend</b></span></li> 
                    <li><img src="/images/core11.png"/><span><b>Aloe Vera</b></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section> 
  )
}
