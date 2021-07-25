import Layout from "components/layouts/layout";
import SubscriptionsSection from 'components/opportunity.page/subscriptions-section'

export default function Opportunity() {

  return (
    <Layout pageTitle="Opportunity">
      <section id="drinks" style={{marginTop: "-84px"}}>
        <img src="/images/transform-bg.png"/>
        <div className="container">
          <div className="simpletab2 simpletab3 col-sm-6">
            <h3>ARE YOU READY?</h3>
            <h2>REDEFINE your life</h2>
            <a href="/products">GET STARTED</a>
          </div>
        </div>
      </section>
      <div style={{backgroundColor: '#fff', height: '4px'}} />
      <div className="main-slider-2">
        <div className="main-slider-box">
          <div className="home-slider owl-carousel owl-theme">
            <div className="item opportunity-slider-item">
              <img src="/images/hero-bg.png" alt="slide"/>
              <div className="container">
                <div className="col-s-4">
                  <h6>WELCOME TO CHANGE</h6>
                  <h5>REDEFINING SUCCESS</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="provide">
        <div className="container">
          <div className="col-sm-12">
            <h3>Opportunity // Redefining Success</h3>
            <h2>OPPORTUNITY <br/>YOU CAN TRUST</h2>
          </div>
        </div>
      </section>
      <section id="guessing">
        <div className="col-sm-6 p-0"><img src="/images/simplicity.png"/></div>
        <div className="col-sm-6 p-0">
          <div className="gussing-bg">
            <h2>Simplicity</h2>
            <p>Most referral plans create opportunities that make you feel like you have to have a finance degree  just to understand how they work. Pages of fine print “requirements”in order to be successful? Sounds more like a headache than an “opportunity”. Unfortunately, this tactic creates unrealistic expectations and ultimately crushes hopes of those who just want to make an honest living.  ALUVA is built upon the principle of simplicity so you won’t find complicated equations or long lists of requirements to earn your paycheck. </p>
          </div>
        </div>
      </section>
      <section id="guessing">
        <div className="col-sm-6 p-0">
          <div className="gussing-bg  gussing-bg2">
            <h2>Transparency</h2>
            <p>At ALUVA, we have created a very transparent referral payment plan so that you ALWAYS know how, when, and what you’re getting paid and there are not any hidden requirements or complicated bonus pools and tabulations. We make it more realistic for anyone to succeed.  You decide what “success” means to you and ALUVA can help you redefine success in your life .</p>
          </div>
        </div>
        <div className="col-sm-6 p-0"><img src="/images/transparency.png"/></div>
      </section>
      <SubscriptionsSection />      
      <section id="qualification">
        <div className="container">
          <h3>JOIN THE MOVEMENT</h3>
          <h2>REFERRAL PLAN</h2>

          <img src={'/images/complan_new.png'} style={{width: '100%'}} />
          {/*
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> </th>
                  <th><span>RANK A1</span></th>
                  <th><span>RANK A2</span></th>
                  <th><span>RANK A3</span></th>
                  <th><span>RANK A4</span></th>
                  <th><span>LIQUID GOLD</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active Personal Affiliate Enrollments</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>GV Requirements</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>$25,000</td>
                  <td>$50,000</td>
                  <td>$100,000</td>
                </tr>
                <tr>
                  <td>Leg Requirments</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>2 legs with 10,000 GV in each leg &amp; 1 leg with 5,000 GV</td>
                  <td>2 legs with 20,000 GV in each leg &amp; 2 legs with 5,000 GV each</td>
                  <td>4 legs with 25,000 GV in each leg &amp; held for 2 consecutive qualification cycles</td>
                </tr>
              <tr>
                  <td>PV Requirements</td>
                  <td>40 PV</td>
                  <td>80 PV</td>
                  <td>120 PV</td>
                  <td>180 PV</td>
                  <td>180 PV</td>
                </tr>
                <tr>
                  <td>Level Payout</td>
                  <td>Level 1</td>
                  <td>Level 1-2</td>
                  <td>Level 1-3</td>
                  <td>Level 1-4</td>
                  <td>Level 1-10</td>
                </tr>
              </tbody>
            </table>
          </div>
          */}
          <span><b>ACTIVE PERSONAL -</b> Affiliate was personally enrolled and is currently maintaining a minimum of 80 PV</span><br/>
          <span><b>PV (Personal Volume) -</b> counts as a Level qualification for personal purchases</span><br/>
          <span><b>CV (Commissionable Volume) -</b> is the volume referral fees are calculated on</span><br/>
          <span><b>GV (Group Volume) -</b> is counted for your total team or group for Level Qualifications</span><br/>
          <span><b>QUALIFICATION CYCLE -</b> Qualification Cycle is monthly. Pay is daily beginning 1 week in arrears.</span><br/>
        </div>
      </section>
    </Layout>
  );
}
