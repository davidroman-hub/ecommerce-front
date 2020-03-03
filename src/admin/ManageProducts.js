import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {getProducts, deleteProduct} from './apiAdmin'



const ManageProducts = () => {   

const [products,setProducts] = useState([])

const {user,token} = isAuth()

///// get all the products from the back /////

const loadProducts = () => {
    getProducts().then(
        data => {
            if (data.error){
                console.log(data.error)
            } else {
                setProducts(data)
            }
        }
    )
}

//// delete product ////

const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
        if(data.error){
            console.error(data.error)
        } else {
            loadProducts()
        }
    })
}

const productsList = () => {
    return (
        <div className='col-12'>
            <h2 className='text-center'>
                Total Products:{products.length}
            </h2>
            <hr />
            <ul className='list-group'>
                {products.map((p,i)=>(
                    <li key={i} className='list-group-item justify-content-between align-items-center'>
                        <strong>{p.name}</strong>
                        <Link to={`/admin/product/update/${p._id}`}>
                            <span className='badge badge-warning badge-pill'>Update</span>
                        </Link>   
                                        
                        <span onClick={()=> destroy(p._id)}
                         className='badge badge-danger badge-pill'>
                             Delate
                        </span>
                    </li>
                ))}
            </ul>
        </div>  
    )
}


useEffect(() => {
    loadProducts()
},[])

    return (
        <Layout title="Manage Products" 
        description="Manage all the products here"
        className='container-fluid'
        >
            <div className='row'>
               {productsList()}
            </div>
       
       
    </Layout>
    )
}

export default ManageProducts
