"use client";
import AddListingForm from "@/components/forms/AddListingForm";
import UploadArea from "@/components/imagehandler/UploadArea";
import LocationPicker, { Location } from "@/components/map/LocationPicker";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useState } from "react";

const newListPage = () => {  
  const [files, setFiles] = useState<UploadResponse[]>([]);
  const [location,setLocation] = useState<Location>()
  return (
    <form className="max-w-[1000px] mx-auto flex gap-8 mt-8">
      {/* input fiels */}
      <div className="flex flex-col">
        <AddListingForm />
      
       
      </div>
      {/* image uploader */}
      <div className="flex flex-col">
      <UploadArea files={files} setFiles={setFiles} />
      <div className="mt-6">
       <div className="flex items-center justify-between gap-6 mb-4">
       <label htmlFor="where">Where is your listing located</label>
       <button className="flex items-center border p-2 rounded bg-slate-100 hover:bg-slate-200 duration-200">
        <FontAwesomeIcon icon={faLocationCrosshairs} />
        </button>
       </div>
          <div className="bg-slate-200 rounded p-4 min-h-12 text-gray-100">
          {/* map here */}
          <LocationPicker  onChange={location => setLocation(location)}/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default newListPage;
