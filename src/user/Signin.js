import React,{ useState } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
//import {API} from '../config'
import {signin} from '../auth/index' //<--- i changed the route of sign up

const Signin = () => {

//State

    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false, // to redirect when the user is signend in
    });

//destructarin the values with another function:

const {email, password, error, loading, redirectToReferrer } = values


// funtion will return another function for take the state
 

    const handleChange = name => event => {
        //we have to take all the values thats why i used " ... "
        setValues({...values, error:false, [name]:event.target.value});
    }

    
    const clickSubmit = (event) => { 
        event.preventDefault();
        setValues({ ...setValues,error:false, loading:true })
        signin({email, password})//<-- WHE CHANGED FOR AND OBJECT {} FOR USE IN USER// <-- and we are using sign up from here
        
        
        .then( data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false}) //if the form is bad it will be succes false
            } else {
                setValues({
                    ...values,//<-- we want to use all the values
                   redirectToReferrer:true // if everything its correct it will be true
                })
            }
        })
    }


    const signUpForm = () => (
       
       <form>

        
            <div className='form-group'>
                <label className='text-muted'>E-mail</label>
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
    const showLoading = () => { 
        return(
        loading && (<div className='alert alert-info'><h2>Info</h2></div>)
            )
    };

    const redirectUser = () => { 
        if(redirectToReferrer){
            return <Redirect to='/'/>
        }
    }


    return(
        <Layout title='Sign up Page' 
        description="Sign un to Node React e-Commerce app"
        className="container col-md-8 offset-md-2">   

            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} this is for see the state if values are worling in the handleChange */}
    </Layout> 
    )
}
export default Signin