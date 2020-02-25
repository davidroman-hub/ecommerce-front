import {API} from '../config'
import queryString from 'query-string'

//Get products method


export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//GET the categories methods


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// the method its post if you see in the backend the method its post as well

export const getFilteredProducts = (skip,limit, filters = {}) => { 
    const data = { skip, limit, filters }
    return fetch(`${API}/products/by/search`,{
        method:"POST",
        headers: { 
                Accept: "application/json",
                "Content-Type":"application/json",
               
            },
            body:JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

// method for list in the input search
// we have to install another package called npm i query-string

export const list = params => {
    const query = queryString.stringify(params)
    console.log('query',query)
    
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//GET the read method 


export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err)
    )
}
    
// get the related products method

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// to take the token from backend form braintree


export const getBraintreeClientToken = (userId, token)=> {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


// procces to payment method

export const processPayment = (userId, token, paymentData)=> {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


// method for take the order information from the backend
export const createOrder = (userId, token, createOrderData)=> {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order:createOrderData})
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
