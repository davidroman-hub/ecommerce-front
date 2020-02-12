import React, {useState, useEffect, Fragment} from 'react';

const RadioBox = ({prices,handleFilters}) => {
    const [value, setValue] =useState(0)
    
    
    
    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

   return prices.map ((p, i)=>(
       <div key={i}>
           <input 
           onChange={handleChange}
           value={`${p._id}`}
           name={p}
           type="radio"
           className='mr-2 ml-4'
           />
           <label className='form-check-label'>{p.name}</label>
       </div>
   ))


    // return (
    
    //     // <Fragment>
    //     //     {JSON.stringify(prices)}
    //     //     <input type="radio" className='mr-2 ml-4'/>
    //     //     <label className='form-check-label'>Name</label>
    //     // </Fragment>

    // )
}

export default RadioBox;