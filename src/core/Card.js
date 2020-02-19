import React,{ useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem, updateItem}  from './cartHelpers'

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate= false }) => {

    const [redirect, setRedirect] = useState(false)//<State for the cart redirect
    const [ count, setCount] = useState(product.count)//, state for increment or dicrement quantity
    
    
    const showViewButton = (showViewProductButton) => {
        return (
            
            showViewProductButton && (
                <Link to ={`/product/${product._id}`} className='mr-2'>
                    <button className='btn btn-outline-primary mt-2 mr-2 mb-2'>View</button>
                </Link>
            )
        )
    }

    //we import the funtion from cart helpers and we gonna execute

const addToCart = () => {
    addItem(product,setRedirect(true))
}
const shouldRedirect = redirect => {
    if(redirect){
        return <Redirect to='/cart'/>
    }
}


    const showAddToCart = (showAddToCartButton) => {
        
        return showAddToCartButton && (
            <button  onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
                        Add to card
            </button>
        )
    };

    // function for  show the stok in a button

    const showStock = (quantity) => {
        return quantity > 0 ? <span className='badge badge-primary badge-pill'>In stock</span> 
        : 
        
        <span className='badge badge-primary badge-pill'> Out Stock</span>
    }
   
    // handle change for the quantity oof the products
    // we need to create another method in card helpers called update and use at the final
    const handleChange = productId => event => {
        setCount(event.target.value < 1 ?  1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }


    // funtion for show the update in the card 

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Adjust Quantity
                        </span>          {/* // we need to know what product we need to incr/dic thats why we use id                                          */}            
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                </div>
             </div>
                )
             )
        }



    return (
        // <div className='col-4 mb-3'>
            <div className='card'>
                <div className='card-header name'>{product.name}</div>
                <div className='card-body'> 
                    {shouldRedirect(redirect)}     
                    <ShowImage item={product} url='product'/>
                    <p className=' lead mt-2'>
                        {product.description.substring(0,100)}
                        </p>
                    <p className='black-10'>${product.price}</p>
                    <p className='black-9'>Category:{product.category && product.category.name}</p>
                    <p className='black-8' >
                        Added on {moment(product.createdAt).fromNow()}
                         {/* <--- very friedly for the clients! */}
                    </p>
                    {showStock(product.quantity)}
                    <br/>
                    {/* <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                    </button>  */}
                    {showViewButton(showViewProductButton)}
                    {/* <button className='btn btn-outline-warning mt-2 mb-2'>
                        Add to card
                    </button> */}
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartUpdate)}

                </div>
            </div>
        // </div>
    )
}

export default Card