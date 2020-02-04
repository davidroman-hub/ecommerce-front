import {API} from '../config'


export const signup = user => {

return fetch(`${API}/signup`,{
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



/// sign in method

export const signin = user => {

    return fetch(`${API}/signin`,{
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


    // Authenticated method -->  it will be a method for save user and token inlocal storage

    export const authenticate = (data, next) => {
        if(typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(data))  //<-- setItem its for save
            next()
        }
    };


    //Signout  method

    // we have to remove the jwt from the local storage, and its thew next method
    // and redirect the user o ther part when is out
    export const signout = (next) => { 
        if(typeof window !== 'undefined') {
            localStorage.removeItem('jwt');  //<-- setItem its for save
            next();
            return fetch(`${API}/signout`, {
                method:'GET',
            })
            .then( response => {
                console.log('signout', response)
            })
            .catch(err => console.log(err))
        }
    }

    //helper authenticate , this method works if the user is auth, and will change
    // the links at the top. will hide signin links conditionally

    export const isAuth = () =>{
        if (typeof window == 'undefined'){
            return false
        }
        if(localStorage.getItem('jwt')) { 
            return JSON.parse(localStorage.getItem('jwt'))
        } else { 
            return  false;
        }
    }