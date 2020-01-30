import React,{ useState } from 'react'
import Layout from '../core/Layout'
import {API} from '../config'
const Signup = () => {

//State

    const [values, setValues] = useState({
        name: '',
        email:'',
        password:'',
        error:'',
        success:false
    });

// funtion will return another function for take the state
 

    const handleChange = name => event => {
        //we have to take all the values thats why i used " ... "
        setValues({...values, error:false, [name]:event.target.value});
    }


    const signUpForm = () => (
       
       <form>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                {/* and we gona put inside the input because the input will changed  */}
                <input onChange={ handleChange('name') } type='text' className='form-control'/>
            </div>
        
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={ handleChange('email') }  type='email' className='form-control'/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={ handleChange('password') }  type='password' className='form-control'/>
            </div>
                <button className = "btn btn-primary">Submit</button> 
        </form>
    ) 


    return(
        <Layout title='Sign up Page' 
        description="Sign un to Node React e-Commerce app"
        className="container col-md-8 offset-md-2">    
       
            {signUpForm()}
            {/* {JSON.stringify(values)} this is for see the state if values are worling in the handleChange */}
    </Layout> 
    )
}
export default Signup