import { categories } from "@/utils/db";


export type ListingTextFields = {
  title?:string ,
  price?:string | number,
  category?:string,
  description ?:string,
  contact?:string,
}
type Props = {
  defaultValues:ListingTextFields;
}

const AddListingForm = ({defaultValues}:Props) => {
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
            defaultValue={defaultValues?.title}
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
            defaultValue={defaultValues?.price}
          />
        </div>
      </div>
      <label htmlFor="category">Category</label>
      <select defaultValue={defaultValues?.category || "0"} required name="category" id="category">
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
        defaultValue={defaultValues?.description}
      />
      <label htmlFor="contact">Contact information</label>
      <textarea
        required
        defaultValue={defaultValues?.contact}
        name="contact"
        id="contact"
        placeholder="email: contact@gmail.com phone: +256878714557"
      />
    </>
  );
};

export default AddListingForm;
