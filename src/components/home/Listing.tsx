"use client";
import UploadThumbnail from '../imagehandler/UploadThumbnail'
import Link from 'next/link'
import { listings } from "@/models/listing";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Listing = ({listing}:{listing:listings}) => {

  const [city,setCity] = useState<string>("");
 
   useEffect(()=>{
    const getGeoCoding = (latitude:number,longitude:number) => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      fetch(apiUrl).then((res)=>res.json()).then((data)=>{

        const adress =  data.results[0].formatted_address.split(",")
        const country = adress[1];
        const countryWithoutNumbers = country?.replace(/\d+/g, '');
        setCity(countryWithoutNumbers ? countryWithoutNumbers : "Unknown");
        
      }).catch((error)=>{
        console.log(error);
      })
    }
    getGeoCoding(listing.location.lat,listing.location.lng);
   },[])
  return (
    <div  className="min-h-24 flex  flex-col gap-2  md:items-start md:justify-start">
    {listing.files?.length > 0 && (
      <div className="rounded-md relative">
        <UploadThumbnail onClick={()=>{}} file={listing.files[0]} />
          <Link href={`/listing/${listing._id}`} className="absolute inset-0 "></Link>
      </div>
    )}
    <div className="flex flex-col gap-4">
      <Link href={`/listing/${listing._id}`} className=" font-bold mt-4 text-xl">
        {listing.title}
      </Link>
      <p className="font-bold  mt-4 text-2xl">
        ${listing.price}
      </p>
     <div className="flex gap-2 items-center mb-4">
      <FontAwesomeIcon icon={faLocationDot} />
     <p className='font-bold'>{city}</p>
     </div>
      <div className="">
      <span className="bg-slate-300 capitalize  text-black font-bold rounded-md p-2 ">{listing.category}</span>
      </div>
    </div>
    </div>
  )
}

export default Listing;