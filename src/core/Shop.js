import React, {useEffect,useState} from 'react';
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import {prices} from './fixedPrices'
import RadioBox from './RadioBox'
//import { getProducts} from './apiCore'

const Shop = () => {

const [myFilters, setMyFilters] = useState({
 filters:{category: [], price: []}
})
const [categories, setCategories] = useState([])
const [error, setError] = useState(false)

// for show the product with the filters

const [limit, setLimit] = useState(6)
const [skip, setSkip] = useState(0)
const [filteredResults, setFilteredResults] = useState([]) //< --- el error estaba aqui 


const init = () => {
    getCategories().then( data => {
        if (data.error){
            setError(data.error)
        }else{
            setCategories(data)
        }
    }) 
};

const loadFilteredResults = newFilters => { 
   // console.log(newFilters)
 getFilteredProducts(skip, limit, newFilters).then( data => {
    if(data.error){
        setError(data.error)
    } else {
        setFilteredResults(data.data)
    }
})

};


useEffect(() => {
    init();
    // for see al the products without filter
    loadFilteredResults(skip, limit, myFilters.filters);
}, []);


const handleFilters = (filters,filterBy) => {
   // console.log('SHOP',filters, filterBy)
   const newFilters = {...myFilters};
   newFilters.filters[filterBy] = filters;
   
   if(filterBy == 'price') {
        let priceValues = handlePrice(filters)
        newFilters.filters[filterBy] = priceValues;
        
    }
    // Show products

   loadFilteredResults(myFilters.filters)
   setMyFilters(newFilters);
};

const handlePrice = value => {
    const data = prices;
    let array = [];
    
    for (let key in data) {
        if(data[key]._id === parseInt(value)) {
            array = data[key].array
        }
    }
    return array;
}




    return (
        <Layout title="Shop Page" description="Search and find books of your choice" 
            className='container-fluid'>
          <div className='row'>
              <div className='col-4'>
                  {/* {JSON.stringify(categories)} */}
                  <h4> Filter By categories </h4>
                  <ul>
                  <Checkbox 
                   categories={categories} 
                   handleFilters={ filters => 
                   handleFilters(filters,'category')}/>
                 </ul>

                 <h4> Filter By Prices range </h4>
                  <div>
                  <RadioBox 
                   prices={prices} 
                   handleFilters={ filters => 
                    handleFilters(filters,'price')}/>
                 </div>

              </div>

              <div className='col-8'>
                  {/* {JSON.stringify(filteredResults)}
                  {JSON.stringify(myFilters)} */}
                   <h2 className="mb-4">Products</h2>
                    <div className="row">
                    {filteredResults.map((product, i) => (
                            
                            <Card key={i} product={product} />
                            
                        ))}
                        {/* {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                    ))} */}
                  </div>
              </div>
          </div>
           
        </Layout>
    )
}


export default Shop