import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddListingForm = () => {
  return (
    <div className="grow">
    <div className="flex gap-8">
     <div className="w-full">
   <label htmlFor="title">Title</label>
   <input name='title' id='title' type="text" placeholder='Item title' />
   </div>
    <div className="w-full">
    <label  htmlFor="price">Price</label>
    <input name='price' type="number" min={0} id='price' placeholder='Item price' />
    </div>
    </div>
    <label htmlFor="category">Category</label>
    <select name='category' id='category'  >
        <option  disabled  >Select category</option>
        <option value="cars">Cars</option>
        <option value="electronics">Electronics</option>
        <option value="properties">Properties</option>
    </select>
    <label htmlFor="description">Description</label>
    <textarea name='description' id='description' placeholder='Item description' />
    <label htmlFor="contact">Contact information</label>
    <textarea name='contact' id='contact' placeholder='email: contact@gmail.com phone: +256878714557' />
    <button className="border border-primary font-bold hover:bg-primary-hover hover:text-white  duration-300 text-primary px-4 py-2 rounded-md mt-8  w-full">
          Publish listing
        </button>
    
  </div>
  )
}

export default AddListingForm