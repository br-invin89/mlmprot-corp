import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="col-sm-12 ">
          <img src="/images/Logo-footer.png" />
        </div>
        <div className="col-sm-4  everything">
          <h3>FOR MOMENTS LIKE NO OTHER</h3>
          <h5><a href="/products">Shop Products</a></h5>
          <h5><a href="/opportunity">Referral Program</a></h5>
          <h5><a href="/contact">Support</a></h5> 
        </div>
        <div className="col-sm-2 copyright">
          <h3>Menu</h3>
          <ul>
            <li><a href="/opportunity">Opportunity</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/return-policy">Return Policy</a></li>
            <li><a href="/opportunity">Affiliates</a></li>
          </ul>
        </div>
        <div className="col-sm-2">
          <h3>PRODUCTS</h3>
          <ul> 
            <li><Link href="/product/1">Energy</Link></li>
            <li><Link href="/product/2">G / Burn</Link></li> 
          </ul>
        </div> 
        <div className="col-sm-4">
          <h3>OUR MANTRA</h3>
          <p>
          ALUVA is about WHAT’S IN IT, dedicated to simplicity, transparency, and inclusion so that anyone that wants it can find success here...physical and financial success!
          </p>
        </div>
            
        <div className="product-disclaimer">
          <div className="col-sm-12">
            <ul className="list-inline">
              <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>   
              
			      </ul> 
			      <ul className="tabeo">
              <li><a href="https://nektar-assets.s3-us-west-2.amazonaws.com/ALUVA+Website+T%26Cs+(BMN+Edits+5.11.21)+(3).pdf">Terms of Service</a></li>
              <li><a href="https://nektar-assets.s3-us-west-2.amazonaws.com/ALUVA.Policies+%26+Procedures+May21+4.1.15.21.gbl.pdf">Policies &amp; Procedures</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul> 
          </div>			 
        </div>

        <div className="product-disclaimer">
          <p className='text-center'><strong>Product Disclaimer</strong></p>
          <p className='text-center'>These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.</p>
          {/*
          <div className="col-sm-12 text-center">© 2020 Nektar Life Global</div>
          */}
        </div>

      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          AOS.init({
            duration: 1200,
          })
        `,
        }}
      ></script>
    </footer>
  );
}
