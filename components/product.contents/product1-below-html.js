export default function Product1BelowHtml(props) {
  
  return (
    <section id="tab-bar">
      <div className="container">
        <ul className="nav nav-pills">
          <li className={`active`}>
            <a data-toggle="pill" href="#menu1">
              Benefits
            </a>
          </li>
          <li className={``}>
            <a data-toggle="pill" href="#menu2">
              Ingredients
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div id="menu1" className={`tab-pane fade in active`}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-7"></div>
              <div className="col-sm-6 col-md-5">
                <div className="tab-bar-bg">
                  <h3>Benefits</h3>
                  <ul>
                    <li>
                      <img src="/icons/attr1.svg" />
                      <h4>Elevated Energy</h4>
                    </li>
                    <li>
                      <img src="/icons/attr2.svg" />
                      <h4>Superior Absorption</h4>
                    </li>
                    <li>
                      <img src="/icons/attr3.svg" />
                      <h4>Get Focused</h4>
                    </li>
                    <li>
                      <img src="/icons/attr4.svg" />
                      <h4>Feel Better</h4>
                    </li>
                    <li>
                      <img src="/icons/attr5.svg" />
                      <h4>Natural Ingredients</h4>
                    </li>
                    <li>
                      <img src="/icons/attr6.svg" />
                      <h4>Metabolism Boost</h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="menu2" className={`tab-pane fade`}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-7"></div>
              <div className="col-sm-6 col-md-5">
                <div className="tab-bar-bg2">
                  <h3>Core Ingredients</h3>
                  <ul>
                    <li>
                      <img src="/images/core1.png" />
                      <span>
                        <b>
                          The Natural Caffeine from Organic Green Coffee
                          Bean Extract
                        </b>
                      </span>
                    </li>
                    <li>
                      <img src="/images/core2.png" />
                      <span>
                        <b>Vitamin B </b>
                      </span>
                    </li>
                    <li>
                      <img src="/images/core3.png" />
                      <span>
                        <b>Turmeric </b>
                      </span>
                    </li>
                    <li>
                      <img src="/images/core4.png" />
                      <span>
                        <b>CoQ10 </b>
                      </span>
                    </li>
                    <li>
                      <img src="/images/core5.png" />
                      <span>
                        <b>Silicone Dioxide </b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
