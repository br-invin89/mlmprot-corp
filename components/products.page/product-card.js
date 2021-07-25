import { useRouter } from 'next/router'
import { asPrice } from 'utils/text'

export default function ProductCard(props) {
  const router = useRouter()
  const goProductDetail = () => {
    router.push(`/product/${props.product.id}`)
  }

  return (
    <div className="d-flex justify-content-center" style={{ marginTop: 20}} onClick={goProductDetail}>
      <div className="products-box">
        <img src={props.product.image} />
        <h3>{props.product.title}</h3>
        {/* <h5>{props.product.short_description}</h5> */}
        <h6>{props.product.subtitle}</h6>
        {/*
        <div className='d-flex justify-content-around' 
          style={{padding: '5px 20px'}}
        >
          <h6>PV: {props.product.volume}</h6>
          <h6>CV: {props.product.cv}</h6>
        </div>
      */}
      </div> 
      <style jsx>{`
        
      `}</style>
    </div>
  )
}
