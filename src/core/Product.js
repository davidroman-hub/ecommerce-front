import React,{ useState,useEffect} from 'react'
import Layout from './Layout'
import { read } from './apiCore'
import Card from './Card'

const Product = (props) => {

    // state for the product 
    //  1.- First thing we need to made the state 
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    //3.-
    const loadSingleProduct = productId => {
    read(productId).then(data => {
       if( data.error){
           setError(data.error)
       } else{
           setProduct(data)
       }    
    })
 }
   // 2.-after that we need to use component mount for run the state
    useEffect(() => {
        const productId = props.match.params.productId // this is for take the id from the product
        loadSingleProduct(productId)
    }, [])


return(

    <Layout title='Product' 
    description='product view'
    className='container-fluid'
    >
        product page
    <h2 className='mb-4'>Single Product</h2>
    <div className='row'>
        {JSON.stringify(product)}
    </div>
    </Layout>
    )
}

export default Product
