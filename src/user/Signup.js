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

//destructarin the values with another function:

const {name, email, password} = values


// funtion will return another function for take the state
 

    const handleChange = name => event => {
        //we have to take all the values thats why i used " ... "
        setValues({...values, error:false, [name]:event.target.value});
    }
    //to create a new user we need to use the values thats why we put the method signup
    
    //const signup = (name, email, password) => {
    //we change for user we had the same a the top    
        const signup = user => {    
    
       // console.log(name, email, password)  this is only for check what we are sending
       
       //for send to the backn end we have to use the argument Fetch
        //below is the method

       fetch(`${API}/signup`,{
           method: "POST",
           headers:{
               Accept:'application/json',
               "Content-Type":"application/json"
           },
           body:JSON.stringify(user) //<-- THE USER ARGUMENT WILL COME FROM THE CLICK SUBMIT AND WE CAN USE LIKE AN ARGUMENT
        //    body:JSON.stringify(name, email, password)
       })
       .then( response => {
           return response.json()
       })
        .catch(err =>{
            console.log(err);
        });
    };
    //we have to grab the event thats why i put event
    //we dont need to the browser will reloaded thats why we use preventDefault
    
    const clickSubmit = (event) => { 
        event.preventDefault();
        signup({name, email, password})//<-- WHE CHANGED FOR AND OBJECT {} FOR USE IN USER
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
                <button onClick={clickSubmit}  className="btn btn-primary">Submit</button> 
        </form>
    ) 


    return(
        <Layout title='Sign up Page' 
        description="Sign un to Node React e-Commerce app"
        className="container col-md-8 offset-md-2">    
       
            {signUpForm()}
            {JSON.stringify(values)} this is for see the state if values are worling in the handleChange
    </Layout> 
    )
}
export default Signup