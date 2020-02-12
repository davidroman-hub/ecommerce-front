import React, {useEffect,useState} from 'react';
import Layout from './Layout'
//import { getProducts} from './apiCore'
import Card from './Card'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox'



const Shop = () => {
const [myFilters, setMyFilters] = useState({
    filters:{category: [], price: []}
})
const [categories, setCategories] = useState([])
const [error, setError] = useState(false)


const init = () => {
    getCategories().then( data => {
        if (data.error){
            setError(data.error)
        }else{
            setCategories(data)
        }
    }) 
};

useEffect(() => {
    init()
}, []);


const handleFilters = (filters,filterBy) => {
   // console.log('SHOP',filters, filterBy)
   const newFilters = {...myFilters}
   newFilters.filters[filterBy] = filters
   setMyFilters(newFilters)
}




    return (
        <Layout title="Shop Page" description="Search and find books of your choice" 
            className='container-fluid'>
          <div className='row'>
              <div className='col-4'>
                  {/* {JSON.stringify(categories)} */}
                  <h4> Filter By categories </h4>
                  <ul>
                  <Checkbox categories={categories} 
                   handleFilters={ filters => 
                   handleFilters(filters,'categories')}/>
                 </ul>
              </div>

              <div className='col-8'>
                  {JSON.stringify(myFilters)}
              </div>
          </div>
           
        </Layout>
    )
}


export default Shop