import React,{ useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link, Redirect} from 'react-router-dom'
import {read , update, updateUser} from './apiUser'

const Profile = ({match}) => {

const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false,
    })

    const {token} = isAuth()

    const {name, email, password, error, success} = values

const init = (userId) => {
 //console.log(userId)  // user id in the console to see what we are sending
read(userId, token).then(data => {
    if (data.error){
        setValues({...values, error:true})
    } else{
        setValues({...values, name: data.name, email: data.email})
    }
})

}

useEffect(() => {
    init(match.params.userId)
},[]);

const handleChange = name => e =>{
    setValues({...values, error:false, [name]:e.target.value})
}

const clickSubmit = (e) => {
    e.preventDefault()
    update(match.params.userId, token, {name, email, password}).then(
        data => { if (data.error){
            console.log(data.error)
            }else{
                updateUser(data, () => {
                    setValues({...values, 
                                name: data.name,
                                email: data.email, 
                                success:true
                            })
                })
            }
        }
    )
}
// when is success the changes we want to redirect him to ..
const redirectUser = (success) => {
    if(success) {
        return <Redirect to='/cart'/>
    }
}


const profileUpdate = (name, email, password) => {
    
    return(

      
         <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                type="text" 
                onChange={handleChange('name')} 
                className="form-control" 
                value={name}/>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                type="email" 
                onChange={handleChange('email')} 
                className="form-control" 
                value={email}/>  
        </div>
        
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input 
            type="password" 
            onChange={handleChange('password')} 
            className="form-control" 
            value={password}/>
            
        {/*           we need a funtion for send to the backendefor change everything */}
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
         
     </div>
    )
}


    return (
        <Layout title="user Profile" 
        description="update your profile" 
        className='container-fluid'>
      
       <h2 className="mb-4">Profile update</h2>
       {JSON.stringify(values)}
       {profileUpdate(name, email, password)}
       {redirectUser(success)}
       
    </Layout>
    )
}

export default Profile