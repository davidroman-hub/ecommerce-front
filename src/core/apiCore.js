import {API} from '../config'


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