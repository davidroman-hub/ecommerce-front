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
const [categories, setCategories] = useState([]);
const [error, setError] = useState(false);

// for show the product with the filters

const [limit, setLimit] = useState(6);
const [skip, setSkip] = useState(0);
const [size, setSize] = useState(0);
const [filteredResults, setFilteredResults] = useState([]); //< --- el error estaba aqui 


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
        setFilteredResults(data.data);
        // button for charge more products
        setSize(data.size)
        setSkip(0)
        }
    })
};

// method for load more products

const loadMore = () => { 
    let toSkip = skip + limit // remember the skip its 0 but the limit its 6 so, we show 6 more
    // console.log(newFilters)
  getFilteredProducts(toSkip, limit, myFilters.filters).then( data => {
     if(data.error){
         setError(data.error)
     } else {
         setFilteredResults([...filteredResults, ...data.data]);
         // button for charge more products
         setSize(data.size)
         setSkip(toSkip)
         }
     })
 };

const loadMoreButton = () => {
    return (
        size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
        )
    )
}



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
                   <h2 className="mb-3 ml-5">Products</h2>
                    <div className="row">
                    {filteredResults.map((products, i) => (
                            
                        <div key={i} className='col-10 mb-3 ml-4'>
                            <Card product={products}/>
                         </div>
                            
                        ))}
                        {/* {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                    ))} */}
                  </div>
                  <hr/>
                  {loadMoreButton()}
              </div>
          </div>
           
        </Layout>
    )
}


export default Shop