import {API} from '../config'


//Get products method


// export const getProducts = (sortBy) => {
//     return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
//         method: 'GET'
//     })
//     .then( response => {
//         return response.json()
//     })
//     .catch(err => console.log(err))
// }

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};