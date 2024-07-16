"use client";

import ListingForm from "@/components/forms/ListingForm";



const newListPage = () => {
  const defaultLocation = {
    lat: 33.573616824951735,
    lng: -7.617842797047212

  }
  return (
   <div className="">
    <h1 className="font-bold  mx-auto mt-4 ml-8 text-4xl">New listing</h1>
     <ListingForm  isEdit={false} defaultLocation={defaultLocation} />
   </div>
  );
};

export default newListPage;
