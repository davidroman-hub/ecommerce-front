import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import  {isAuth} from '../auth/index'


const Checkout = ({product}) => {

// Method for gewt the total amount
    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }


const showCheckout = () => {
 return  isAuth() ? ( <button className='btn btn-succes'>Checkout</button>
) : (
<Link to='/signin'>
    <button className='btn btn-primary'>
        Sign in to Checkout
    </button>
</Link>
    )}


    return (
        // <div>{JSON.stringify(product)}</div>
      <div> 
        <h2> Total: ${getTotal()}</h2>

       {showCheckout()}
     
    </div>
    )

}

export default Checkout