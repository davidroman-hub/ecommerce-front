import React, {useState,useEffect} from 'react';


// we have to send categories props

const Checkbox = ({categories}) => {
    return categories.map((c, i)=> (
        <li key={i} className='list-unstyled'>
            <input type='checkbox' className='form-check-input'/>
            <label className='form-check-label'>{c.name}</label>
        </li>
    ))
}


export default Checkbox