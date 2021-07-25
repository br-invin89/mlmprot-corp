import Link from 'next/link'

export default function MainSlider() {
  return (
    <div className="main-slider">
      <div className="main-slider-box">
        <div className="home-slider owl-carousel owl-theme">
          <div className="item">
            <img src="/images/hero-right.png" alt="slide" />
            <div className="container">
              <div className="col-s-4">
                <h2>REDEFINE YOU</h2>
                <p>We are passionate about redefining you through our revolutionary products and life‑changing opportunities.</p> 
              </div>
            </div>  
          </div>  
        </div>
      </div>
    </div> 
  );
}

/*
At Nektar Life Global we believe your LIFE and your BODY are a gift, and what you do with it matters so it’s time to pay attention to WHAT’S IN IT.  What are you putting in your body? What are you doing with your time? Who are you associating with? It’s time for you to be part of something special. It’s time for Nektar.
*/