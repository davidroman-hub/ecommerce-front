import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
//import {API} from '../config'
import {signup} from '../auth/index' //<--- i changed the route of sign up

const Signup = () => {

//State

    const [values, setValues] = useState({
        name: '',
        email:'',
        password:'',
        error:'',
        success:false
    });

//destructarin the values with another function:

const {name, email, password, success, error} = values


// funtion will return another function for take the state
 

    const handleChange = name => event => {
        //we have to take all the values thats why i used " ... "
        setValues({...values, error:false, [name]:event.target.value});
    }
    
    //to create a new user we need to use the values thats why we put the method signup
    
    //const signup = (name, email, password) => {
    //we change for user we had the same a the top    
        // const signup = user => {    
    
       // console.log(name, email, password)  this is only for check what we are sending
       
       //for send to the backn end we have to use the argument Fetch
        //below is the method

    //   return fetch(`${API}/signup`,{
    //        method: "POST",
    //        headers:{
    //            Accept:'application/json',
    //            "Content-Type":"application/json"
    //        },
    //        body:JSON.stringify(user) //<-- THE USER ARGUMENT WILL COME FROM THE CLICK SUBMIT AND WE CAN USE LIKE AN ARGUMENT
    //     //    body:JSON.stringify(name, email, password)
    //    })
    //    .then( response => {
    //        return response.json()
    //    })
    //     .catch(err =>{
    //         console.log(err);
    //     });
    // };
    //we have to grab the event thats why i put event
    //we dont need to the browser will reloaded thats why we use preventDefault
    
    const clickSubmit = (event) => { 
        event.preventDefault();
        setValues({...setValues,error:false})
        signup({name, email, password})//<-- WHE CHANGED FOR AND OBJECT {} FOR USE IN USER// <-- and we are using sign up from here
        
        // for clean the formularie , to handle the error as well.
        .then( data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
                })
            }
        })
    }


    const signUpForm = () => (
       
       <form>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                {/* and we gona put inside the input because the input will changed  */}
                <input onChange={ handleChange('name') } type='text' className='form-control'
                value={name}
                />
            </div>
        
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={ handleChange('email') }  type='email' className='form-control'
                  value={email}
                />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={ handleChange('password') }  type='password' className='form-control'
                  value={password}/>
            </div>

                <button onClick={clickSubmit}  className="btn btn-primary">Submit</button> 
        </form>

    ) ;

    //two funtions for show the Error and success

    const showError = () => { 
       return( <div className="alert alert-danger" style={{display:error ? '' : 'none'}}> 
            {error}
        </div>
       )
    }
    const showSuccess = () => { 
        return(
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}> 
            New Account is created. Please <Link to='/signin'>Sign in</Link>
        </div>)
    }


    return(
        <Layout title='Sign up Page' 
        description="Sign un to Node React e-Commerce app"
        className="container col-md-8 offset-md-2">   

            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} this is for see the state if values are worling in the handleChange */}
    </Layout> 
    )
}
export default Signup