import React,{ useState,useEffect} from 'react'
import {getCategories, list} from './apiCore'
import Card from './Card'

const Search = () => {
    // State of Search:

    const [data, setData] = useState({
        categories:[], 
        category:'', 
        search:'',
        results: [],
        searched: false
    });

    const {
        categories,
        category,
        search,
        results,
        searched
    
    } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setData({...data, categories:data})
            }
        })
    };

    useEffect(()=>{
        loadCategories()
    },[]);

    const searchData = () => {
        //console.log(search, category)
        if (search){
            list({search: search || undefined, category})
            .then(response => {
                if(response.error){
                    console.log(response.error)
                }else {
                    setData({...data, results:response, searched:true})
                }
            })
        }
    }

    const searchSubmit = (e) => {
        //
        e.preventDefault()
        searchData()

    }

    const handleChange = (name) => event => {
        //

        setData({...data,[name]: event.target.value, searched:false});

    }

     //method for show the messages
const searchMessage = (searched, results) => {
    if(searched && results.length > 0) {
        return (`Found ${results.length} Products`)
    }
    if(searched && results.length < 1) {
        return (`Not Products found`)
    }
}

    // Meethod for searched products

    const searchedProducts = (results = []) => {
       return(
           <div>
            <h2 className="mt-4 mb-4">
            {searchMessage(searched, results)}    
            </h2>        
            <div className="row">
                {results.map((products,i) =>(<Card  key={i} product={products}/>))}
            </div>
        </div>
        )
    }

    const searchForm = () => {
        return(
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
              <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                      <select className="btn mr-2" onChange={handleChange('category')}>
                          <option value='All'>Pick Category</option>
                          {categories.map((c,i)=>(
                              <option key={i} value={c._id}>{c.name}</option>
                          ))}
                      </select>
                  </div>
                <input type="search" 
                className='form-control' 
                onChange={handleChange('search')}
                placeholder='Search by name'/>
              </div>  
              <div className='btn input-group-append' style={{border:'none'}}>
                    <button className='input-group-text'>Search</button>
              </div>      
            </span>
        </form>
        )    
     }


    return(
        <div className='row'> 
            {/* <h2> search bar {JSON.stringify(categories)}</h2> */}
            <div className="container mb-3">
                {searchForm()}
                {/* {JSON.stringify(results)} */}
            </div>
            
                    {/* Products Results*/}
            
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>

        </div>
    )
}

export default Search

