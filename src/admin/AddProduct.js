import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import { createProduct } from './apiAdmin'

const AddProduct = () => {


    const { user,token} = isAuth()





    return(
        <Layout title='Add a new Product' 
        description={`G' Day ${user.name}!, ready to add new product?`} 
        >
        
        <div className='row'>
          
            <div className='col-md-8 offset-md-2'>
                    ...

            </div>
        </div>

           
        </Layout>


    )

}

export default AddProduct