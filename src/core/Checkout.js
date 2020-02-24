import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getProducts, getBraintreeClientToken, processPayment} from './apiCore'
import Card from './Card'
import  {isAuth} from '../auth/index'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers'


const Checkout = ({product}) => {

    //State for get the token from braintree

    const [data, setData] = useState({
        loading:false,
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
         setData({clientToken: data.clientToken})
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
        setData({loading:true});
        
        
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()



        let nonce;
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(
            data => {
               // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number , etc..) send nonce as "paymentMethodNonce " to the backend
                // and also total to be charged 
                //console.log('send nonce and total process:', nonce, getTotal(product))
                const paymentData = { 
                    paymentMethodNonce: nonce,
                    amount: getTotal(product)
                }
                processPayment(userId, token , paymentData)
                .then( response => {
                    console.log(response)
                    setData({...data, success: response.success})
                    emptyCart(() => {
                        
                        console.log('payment success and empty cart');
                        setData({
                            loading: false
                        })
                    })
                    //empty cart
                    //create order

                })
                .catch(error => {
                    console.log(error)
                    setData({loading: false})
                })
            })
            .catch(error => {
                //console.log('dropin error:', error)
                setData({...data, error: error.message})
            })

    }

    //show dropin when is auth otherwise sign in

    const showDropIn = () => {
        return (
                // onBlur is used when its an error on our pay method , when you start to put something will disapear
            <div onBlur={()=> setData({...data, error:""})}>
                {data.clientToken !== null && product.length > 0 ? (
                    <div>
                        <DropIn options={{
                            authorization:data.clientToken,
                            paypal:{
                                flow:"vault" // this is for have paypal method for pay
                            }
                        }} onInstance = {instance => (data.instance = instance)} />
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                    </div>
                ) : null}
            </div>
        )
    }

// for show the error when is available

const showError = error => {
    return (                               
                                            
         <div className="alert alert-danger"
            // if exist this error show if not non show 
            style={{display: error ? '' : 'none'}}>
                {error}
         </div>
    )
}

//Show success when the payment is finished
const showSuccess = success => {
    return (                               
                                            
         <div className="alert alert-info"
            // if exist this error show if not non show 
            style={{display: success ? '' : 'none'}}>
               Thanks! Your payment was successful!
         </div>
    )
}

// loading function

const showLoading = (loading) => (
    loading && (
        <h2>Loading...</h2>
    )
)



    return (
        // <div>{JSON.stringify(product)}</div>
      <div> 
        <h2> Total: ${getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
      {/* // data error from the state */}
       { showError(data.error)}
       {showCheckout()}
     
    </div>
    )

}

export default Checkout