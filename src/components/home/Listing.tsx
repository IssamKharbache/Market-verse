"use client";
import UploadThumbnail from '../imagehandler/UploadThumbnail'
import Link from 'next/link'
import { listings } from "@/models/listing";

const Listing = ({listing}:{listing:listings}) => {
 
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
      <div className="">
      <span className="bg-slate-300 capitalize  text-black font-bold rounded-md p-2 ">{listing.category}</span>
      </div>
    </div>
    </div>
  )
}

export default Listing;