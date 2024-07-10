import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddListingForm = () => {
  return (
    <>
    <div className="flex gap-8">
     <div className="w-full">
   <label htmlFor="title">Title</label>
   <input  required  name='title' id='title' type="text" placeholder='Item title' />
   </div>
    <div className="w-full">
    <label  htmlFor="price">Price</label>
    <input required  name='price' type="number" min={0} id='price' placeholder='Item price' />
    </div>
    </div>
    <label htmlFor="category">Category</label>
    <select  required name='category' id='category'  >
        <option  disabled  >Select category</option>
        <option value="cars">Cars</option>
        <option value="electronics">Electronics</option>
        <option value="properties">Properties</option>
    </select>
    <label htmlFor="description">Description</label>
    <textarea required  name='description' id='description' placeholder='Item description' />
    <label htmlFor="contact">Contact information</label>
    <textarea required  name='contact' id='contact' placeholder='email: contact@gmail.com phone: +256878714557' />
    
    
  </>
  )
}

export default AddListingForm