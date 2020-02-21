import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getProducts, getBraintreeClientToken} from './apiCore'
import Card from './Card'
import  {isAuth} from '../auth/index'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({product}) => {

    //State for get the token from braintree

    const [data, setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })
                //if is auth
    const userId = isAuth() && isAuth().user._id
    const token = isAuth() && isAuth().token

// get token method

const getToken = (userId, token) => {
 getBraintreeClientToken(userId, token).then(data => {
     if (data.error){
         setData({...data, error: data.error})
     } else {
         setData({...data,clientToken: data.clientToken})
     }
 })
}

useEffect(() => {
    getToken(userId,token)
},[])

// Method for gewt the total amount
    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }


const showCheckout = () => {
 return  isAuth() ? ( 
 <div >{showDropIn()}</div> //<-- showDropin is here
) : (
<Link to='/signin'>
    <button className='btn btn-primary'>
        Sign in to Checkout
    </button>
</Link>
    )}


    // buy method

    const buy = () => {
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(
            data => {
                console.log(data)
                nonce = data.nonce
                // once you have nonce (card type, card number , etc..) send nonce as "paymentMethodNonce " to the backend
                // and also total to be charged 
                console.log('send nonce and tootal process:', nonce, getTotal(product))
            })
            .catch(error => {
                console.log('dropin error:', error)
                setData({...data, error: error.message})
            })

    }

    //show dropin when is auth otherwise sign in

    const showDropIn = () => {
        return (
            <div>
                {data.clientToken !== null && product.length > 0 ? (
                    <div>
                        <DropIn options={{
                            authorization:data.clientToken
                        }} onInstance = {instance => (data.instance = instance)} />
                        <button onClick={buy} className="btn btn-success">Pay</button>
                    </div>
                ) : null}
            </div>
        )
    }


    return (
        // <div>{JSON.stringify(product)}</div>
      <div> 
        <h2> Total: ${getTotal()}</h2>

       {showCheckout()}
     
    </div>
    )

}

export default Checkout