import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import { createProduct } from './apiAdmin'

const AddProduct = () => {

    
    
    //State

    const [values, setValues] = useState({  //<-- have to be an object because we gonna send props
        name:'',
        description:'',
        price:'',
        categories:[], //<-- we have to put the categories from the backend
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading: false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''

    })

    //Destructure

    const { user,token} = isAuth()

    const {

        name,
        description,
        price,
        categories, //<-- we have to put the categories from the backend
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData // <-- we gonna send this to the back end 

    } = values;

useEffect(() => { 
    setValues({...values, formData: new FormData()}); //<-- thats why we used here
}, [])


// handleChange and clickSubmit

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name,value); //<-- faster name we gonna take the other values
        setValues({...values,[name]: value});
    } 

    const clickSubmit = (event) => {
      event.preventDefault()
      setValues({...values, error:'', loading: true}) 
      createProduct(user._id, token, formData)
      .then(data => { 
          if(data.error) { 
              setValues({...values, error:data.error})
          } else {
              setValues({
                  ...values, 
                  name:'', //<-- this name
                  description:'',
                  photo:'',
                  price:'',
                  quantity:'',
                  loading:false,
                  createdProduct:data.name //we need the name 
              })
          }
      })
      
    };




    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
        
            <h4>Post Photo</h4>
        
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input 
                        onChange={handleChange('photo')} 
                        type='file' 
                        name='photo' 
                        accept='image/*'/>
                </label>
            </div>


            <div className='form-group'>
                <label className='text-muted'> Name </label>
                    <input 
                        onChange={handleChange('name')} 
                        type='text' 
                        className='form-control' 
                        value={name} />
            </div>


            <div className='form-group'>
                <label className='text-muted'> Description </label>
                    <textarea 
                        onChange={handleChange('description')}  
                        className='form-control' 
                        value={description} />
            </div>

            <div className='form-group'>
                <label className='text-muted'> Price </label>
                    <input 
                        onChange={handleChange('price')} 
                        type='number' 
                        className='form-control' 
                        value={price} />
            </div>

            <div className='form-group'>
                <label className='text-muted'> Category </label>
                    <select 
                        onChange={handleChange('category')} 
                        className='form-control' 
                        >
                         <option value='5e3c30a1d2a9ff2b3cd22f8e'>Node</option> 
                         <option value='5e3c30a1d2a9ff2b3cd22f8e'>PhP</option>   
                    </select>
            </div>
            

            <div className='form-group'>
                <label className='text-muted'> Shipping </label>
                    <select 
                        onChange={handleChange('shipping')} 
                        className='form-control' 
                        >
                         <option value='0'>No</option>
                         <option value='1'>yes</option>      
                    </select>
            </div>


            <div className='form-group'>
                <label className='text-muted'> Quantity </label>
                    <input 
                        onChange={handleChange('quantity')} 
                        type='number' 
                        className='form-control' 
                        value={quantity} />
            </div>

            <button className='btn btn-outline-primary'> Create Product </button>
            

        </form>
    )


    return(
        <Layout title='Add a new Product' 
        description={`G' Day ${user.name}!, ready to add new product?`} 
        >
        
        <div className='row'>
          
            <div className='col-md-8 offset-md-2'>
                  {newPostForm()}

            </div>
        </div>

           
        </Layout>


    )

}

export default AddProduct