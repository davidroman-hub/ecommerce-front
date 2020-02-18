import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'


const Card = ({ product, showViewProductButton = true }) => {

    const showViewButton = (showViewProductButton) => {
        return (
            
            showViewProductButton && (
                <Link to ={`/product/${product._id}`} className='mr-2'>
                    <button className='btn btn-outline-primary mt-2 mr-2 mb-2'>View</button>
                </Link>
            )
        )
    }
    

    return (
        // <div className='col-4 mb-3'>
            <div className='card'>
                <div className='card-header'>{product.name}</div>
                <div className='card-body'>      
                    <ShowImage item={product} url='product'/>
                    <p className=' lead mt-2'>
                        {product.description.substring(0,100)}
                        </p>
                    <p className='black-9'>${product.price}</p>
                    <p className='black-8'>Category:{product.category && product.category.name}</p>
                    <p className='black-8' >
                        Added on {moment(product.createdAt).fromNow()}
                         {/* <--- very friedly for the clients! */}
                    </p>
                 
                    
                    {/* <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                    </button>  */}
                    {showViewButton(showViewProductButton)}
                    
                   
                    
                    <button className='btn btn-outline-warning mt-2 mb-2'>
                        Add to card
                    </button>
                </div>
            </div>
        // </div>
    )
}

export default Card