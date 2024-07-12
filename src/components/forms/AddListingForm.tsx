import { categories } from "@/utils/db";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AddListingForm = () => {
  return (
    <>
      <div className="flex gap-8">
        <div className="w-full">
          <label htmlFor="title">Title</label>
          <input
            required
            name="title"
            id="title"
            type="text"
            placeholder="Item title"
          />
        </div>
        <div className="w-full">
          <label htmlFor="price">Price</label>
          <input
            required
            name="price"
            type="number"
            min={0}
            id="price"
            placeholder="Item price"
          />
        </div>
      </div>
      <label htmlFor="category">Category</label>
      <select defaultValue="0" required name="category" id="category">
        <option value="0" disabled>
          Select category
        </option>
        {categories.map(({ key, label}, idx) => (
            <option key={idx} value={key} className="flex gap-6">
              {label}
            </option>
        ))}
      </select>
      <label htmlFor="description">Description</label>
      <textarea
        required
        name="description"
        id="description"
        placeholder="Item description"
      />
      <label htmlFor="contact">Contact information</label>
      <textarea
        required
        name="contact"
        id="contact"
        placeholder="email: contact@gmail.com phone: +256878714557"
      />
    </>
  );
};

export default AddListingForm;
