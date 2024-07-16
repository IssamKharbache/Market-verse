"use client";
import { useState } from 'react'
import AddListingForm, { ListingTextFields } from './AddListingForm'
import SubmitButton from './SubmitButton'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { createAd, updateListing } from '@/app/actions/listingActions'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import LocationPicker, { Location } from '../map/LocationPicker'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadArea from '../imagehandler/UploadArea';




type Props = {
  id?:string | null
  defaultFiles?:UploadResponse[];
  defaultLocation:Location;
  defaultValues?:ListingTextFields;
  isEdit:boolean;
}
const ListingForm = ({
  id=null,
  defaultFiles = [],
  defaultLocation,
  defaultValues = {},
  isEdit,
}:Props) => {
      const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
      const [location, setLocation] = useState<Location | null>(defaultLocation);
      const [geoLocation, setGeoLocation] = useState<Location | null>(null);
      //states to handle submit
      const [isImageUploading,setIsImageUploading] = useState<boolean>(false);

      const router = useRouter();
      //get current location function
      const handleLocateMyPosition = () => {
        navigator.geolocation.getCurrentPosition((ev) => {
          const location = { lat: ev.coords.latitude, lng: ev.coords.longitude }
          setLocation(location);
          setGeoLocation(location);
        }, console.error);
      }
         //handle submit function
    
    const handleSubmit = async (formData: FormData) => {
      formData.set("location", JSON.stringify(location));
      formData.set("files", JSON.stringify(files));
      if(id){
        formData.set("_id",id);
      }
       const  res =  id ? await updateListing(formData) : await createAd(formData);
      if(id){
         toast.success("Listing updated successfully");
         router.push("/listing/"+res._id);
        }else{
        toast.success("Listing created successfully");
        router.push("/listing/"+res._id)
      }
    }
    
  return (
    <form action={handleSubmit} className="max-w-[1000px] p-8 mx-auto flex flex-col lg:flex-row lg:p-0  gap-8 mt-8 mb-8">
      {/* input fiels */}
      <div className="grow">
        <AddListingForm defaultValues={defaultValues}/>
        <SubmitButton cn='hidden lg:block'  isImageUploading={isImageUploading}>
          {!isEdit ? "Publish listing" : "Update listing"}
         </SubmitButton>
      </div>
      {/* image uploader and location */}
      <div className="flex flex-col">
        <UploadArea setIsImageUploading={setIsImageUploading} files={files} setFiles={setFiles} />
        <div className="mt-6">
          <div className="flex items-center justify-between gap-6 mb-4">
            <label className="mb-2" htmlFor="where">Where is your listing located</label>
            <button type="button" onClick={handleLocateMyPosition} className="flex items-center border p-2 rounded bg-slate-100 hover:bg-slate-200 duration-200">
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </button>
          </div>
          <div className="bg-slate-200 rounded p-4 min-h-12 text-gray-100">
            {/* map here */}
            <LocationPicker geoCords={geoLocation} defaultLocation={defaultLocation} onChange={(location) => setLocation(location)} />
          </div>
        </div>
        <SubmitButton cn='block lg:hidden'  isImageUploading={isImageUploading}>
        {!isEdit ? "Publish listing" : "Update listing"}
         </SubmitButton>
      </div>
      
     
    </form>
  )
}

export default ListingForm