import React,{ useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {read , update, updateUser} from './apiUser'

const Profile = ({match}) => {

const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success:false,
    })

    const {name, email, password, error, success} = values

const init = (userId) => {
 console.log(userId)  // user id in the console to see what we are sending
}

useEffect(() => {
    init(match.params.userId)
},[])


    return (
        <Layout title="user Profile" 
        description="update your profile" 
        className='container-fluid'>
      
       <h2 className="mb-4">Profile update</h2>
       
    </Layout>
    )
}

export default Profile