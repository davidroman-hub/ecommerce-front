import React,{ useState,useEffect} from 'react'
import Layout from './Layout'
import { read,listRelated } from './apiCore'
import Card from './Card'

const Product = (props) => {

    // state for the product 
    //  1.- First thing we need to made the state 
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])//<-- State for the related products
    const [error, setError] = useState(false)

    //3.-
    const loadSingleProduct = productId => {
    read(productId).then(data => {
       if( data.error){
           setError(data.error)
       } else{
           setProduct(data)
            //when we finish to fetch the product we nned to fetch the related product
            listRelated(data._id).then(data=>{
                if(data.error){
                    setError(data.error)
                } else{
                    setRelatedProduct(data);
                }
            })

       }    
    })
 }
   // 2.-after that we need to use component mount for run the state
    useEffect(() => {
        const productId = props.match.params.productId // this is for take the id from the product
        loadSingleProduct(productId)
    }, [props])


return(

    <Layout title={product && product.name} 
    description={
        product &&
        product.description &&
        product.description.substring(0,100)}

    className='container-fluid'
    >
        {/* product page
    <h2 className='mb-4'>Single Product</h2> */}
    <div className='row'>
        {/* {JSON.stringify(product)} */}
        <div className='col-8' >
        {
            product &&
            product.description &&
             <Card product={product} showViewProductButton={false}/>
        }
        </div>
       
        <div className='col-4'>
            <h4> Related Products</h4>
            {relatedProduct.map((product, i)=>(
                <div className='mb-3'>
                    <Card key={i} product={product}/>
                </div>
            ))}
        </div>

    </div>
    </Layout>
    )
}

export default Product
