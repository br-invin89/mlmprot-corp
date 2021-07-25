import { useRouter } from "next/router";

export default function OtherProductBelowHtml(props) {
  const router = useRouter();

  const goProduct = (product_id) => {
    router.push(`/product/${product_id}`)
  }

  return (
	  <section id="products-last">
      <div className="container">
        <h2>You may also like</h2>
        <div className="col-sm-4">  
          <div onClick={()=>goProduct(1)}>
            <div className="products-box">
              <img src="/images/pro1.png" />
              <h3>IGNITE</h3> 
              <h6>Natural Sustainable Energy</h6>
            </div> 
          </div>	
        </div>
        <div className="col-sm-4">  
          <div onClick={()=>goProduct(2)}>
            <div className="products-box">
              <img src="/images/pro2.png" />
              <h3>G/BURN</h3> 
              <h6>Healthy Weight loss Supplement</h6>
            </div> 
          </div>	
        </div>
        <div className="col-sm-4">  
          <div onClick={()=>goProduct(5)}>
            <div className="products-box">
              <img src="/images/pro5.png" />
              <h3>Founders Pack</h3> 
              <h6>$500.00</h6>
            </div> 
          </div>	
        </div>
      </div>
    </section> 
  )
}
