import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'

const AddCategory = () => { 

// State 

const [name,setName] = useState('')
const [error,setError] = useState(false)
const [success,setSuccess] = useState(false)

/// destructure user and info (token) from localStorage


    const {user, token} = isAuth()

//we need to create 2 method, for handleChange and for handleSubmit

const handleChange = (e) => { 
    setError('')
    setName(e.target.value)

}

const clickSubmit = (e) => { 
    e.preventDefault()
    setError('')
    setSuccess(false)

    //make request to API to create category

};



    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className='text-muted'>
                    Name
                </label>
                <input type='text' 
                className='form-control'
                onChange={handleChange} 
                value={name} />
               
            </div> 
       
                <button className='btn btn-outline-primary'>Create Category</button>
           
        </form>
    );

    return(
        <Layout title='Add a new category' 
        description={`G' Day ${name}!, ready to add new category?`} 
        >
        
        <div className='row'>
          
            <div className='col-md-8 offset-md-2'>{newCategoryForm()}      
            </div>
        </div>

           
        </Layout>


    )

}

export default AddCategory