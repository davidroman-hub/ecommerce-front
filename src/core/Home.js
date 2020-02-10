import React,{ useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'



const Home = () => {
    
//state for get the getProducts
 const [productsBySell, setProductsBySell] = useState([])
 const [productsByArrival, setProductsByArrival] = useState([])
 const [error, setError] = useState(false)   
 
 
  //method


const loadProductsBySell = () => { 
    getProducts('sold').then( data => {
        if(data.error) {
            setError(data.error)
        }else {
            setProductsBySell(data)
        }
    })
}


const loadProductsByArrival = () => { 
    getProducts('createdAt').then( data => { //createdAt its the file when the product was created remember
        if(data.error) {
            setError(data.error)
        }else {
            setProductsByArrival(data)
        }
    })
}


useEffect(()=> {
    loadProductsByArrival()
    loadProductsBySell()
},[])


    return (
        <Layout title="home page" description="node react ecommerce front app">
            {JSON.stringify(productsBySell)}
                <hr/>
            {JSON.stringify(productsByArrival)}
           
        </Layout>
    )
}

export default Home