import React, {useState,useEffect} from 'react';



// we have to send categories props

const Checkbox = ({categories}) => {

//For the handle categories toggle we need a state

const [checked, setCheked] = useState([])
// we need to check if the categoris is alredy "checked"
const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c) // return the first index or -1// and this will tell us if is alredy there
    const newCheckedCategoryId = [...checked] // <-- will gave us all the categories ids in the state
    // if currently checked was not alredy in checked state> push 
    //else pull / take of
if(currentCategoryId === -1) {
    newCheckedCategoryId.push(c)
    } else{
        newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    console.log(newCheckedCategoryId)
    setCheked(newCheckedCategoryId)
}




    return categories.map((c, i)=> (
        <li key={i} className='list-unstyled'>
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input'/>
            <label className='form-check-label'>{c.name}</label>
        </li>
    ))
}


export default Checkbox