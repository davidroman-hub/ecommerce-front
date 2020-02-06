import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import { createCategory } from './apiAdmin'






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
    
    createCategory(user._id,token, {name})
    .then( data => { 
        if(data.error) {
            setError(true)
        } else { 
            setError('')
            setSuccess(true)
        }
    } )
};

// Method for show error and succes of the categories

    const showSuccess = () => {
        if(success) { 
            return <h3 className='text-success'>{name} is created</h3>
        }
    };

    
    const showError = () => {
        if(error) { 
            return <h3 className='text-danger'>Category should be unique</h3>
        }
    };

// button to go back

const goBack = () => (
    <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>back to dashboard </Link>
    </div>
)





    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className='text-muted'>
                    Name
                </label>
                <input type='text' 
                className='form-control'
                onChange={handleChange} 
                value={name}
                autoFocus
                required
                />
               
            </div> 
       
                <button className='btn btn-outline-primary'>Create Category</button>
           
        </form>
    );


    

    return(
        <Layout title='Add a new category' 
        description={`G' Day ${user.name}!, ready to add new category?`} 
        >
        
        <div className='row'>
          
            <div className='col-md-8 offset-md-2'>

                {showSuccess()}
                {showError()}
                {newCategoryForm()}  
                {goBack()}   

            </div>
        </div>

           
        </Layout>


    )

}

export default AddCategory