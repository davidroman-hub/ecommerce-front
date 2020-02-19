import React,{ useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getCart} from './cartHelpers'
import Card from './Card'

const Cart = () => {

    const [item, setItem] = useState([]);
    const [run, setRun] = useState(false); //<- for fix the infinity loop



    useEffect(() => {
        setItem(getCart())
    },[run])

    const showItem = () => {
        return(
            <div>
                <h2>Your Cart has {`${item.length}` } items</h2>
                <hr/>
                {item.map((product,i)=>(
                    <Card 
                    key={i} 
                    product={product} 
                    showAddToCartButton={false}
                    cartUpdate={true}
                    showRemoveProductButton={true}
                    setRun={setRun}
                    run={run}
                    />
                ))}
            </div>
        )
    }

    const notItemMessage = () => (
        <h2>Your cart is empty.<br/> <Link to='/shop'>Continue Shooping</Link></h2>
    )

    return (
    <Layout title="Shopping Cart" 
        description="Manage your cart item. Add remove or continue shopping" 
        className='container-fluid'>
    
    <div className='row'>
        <div className='col-6'>
            {item.length > 0 ? showItem(item) : notItemMessage()}
        </div>
        <div className='col-6'>
        <p> Show checkout options/shipping address/ total/ update quantity</p>
        </div>
    </div>

    </Layout>
    )
}

export default Cart