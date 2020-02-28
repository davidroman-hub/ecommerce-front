import React,{ useState, useEffect}from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import Profile from './Profile'
import {getPurchaseHistory} from './apiUser'



const Dashboard = () => {

    const[history, sethistory] = useState([]) //< -- for the purchase history user

    const {user:{_id, name, email, role}} = isAuth()
    const token = isAuth().token
    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(
            data => {
                if (data.error){
                    console.log(data.error)
                } else {
                    sethistory(data)
                }
            }
        )
    }


    useEffect(() => {
        init(_id, token);
    }, []);



    const userLinks = () => { 
        return (
            <div className='card'>
                <h4 className='card-header'>User links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/cart'>My Cart</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>    
            </div>
        )
    }

    const userInfo = () => {
      return(
            <div className=' card mb-5'>
            <h3 className='card-header'>User information</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    {name}
                </li>
                <li className='list-group-item'>
                    {email}
                </li>
                <li className='list-group-item'>
                    {role === 1 ? 'admin' : 'Registered User'} 
                </li>
            </ul>
        </div>
        )
    } 

    const purchaseHistory = (history) => { 
        return(
            <div className='card mb-5'>
            <h3 className='card-header'>Purchase history</h3> 
            <ul className='list-group'>
              <li className='list-group-item'>
                  {JSON.stringify(history)}
              </li>
           </ul>
      </div>
        )
    }

    return (
        <Layout title='Dashboard' description={`G' Day ${name}!`} className='container-fluid' >
        
        <div className='row'>
            {/* <div className ='col-9'>
                {userLinks()}
            </div> */}
            <div className='col-9'>
                {userLinks()}<br/>
                {userInfo()}
                {purchaseHistory(history)}
            </div>
        </div>

           
        </Layout>
    )
}

export default Dashboard