import {API} from '../config'

// Method to create the category

export const createCategory = (userId, token, category) => { 
    
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers: { 
                Accept: "application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const createProduct = (userId, token, product) => { 
    
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers: { 
                Accept: "application/json",
                // "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            // body:JSON.stringify(category)

            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}


// Method for get the categories from the back

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// orders in api admin

export const listOrders = (userId,token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// enum status values method

export const getStatusValues = (userId,token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//update the status method

export const updateOrderStatus = (userId,token,orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


/**
 * 
 * to perform crud on product to manage them
 */

 /// get all the products

 export const getProducts= () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

 //get a single product
 export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

 // update single product

 export const updateProduct = (productId,userId, token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

 
 // delete single product

 export const deleteProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

 