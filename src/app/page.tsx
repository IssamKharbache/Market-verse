"use client";
import Listing from "@/components/home/Listing";
import UploadThumbnail from "@/components/imagehandler/UploadThumbnail";
import { listings } from "@/models/listing";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [listingData, setListingData] = useState<listings[]>([]);
    //use effect to fetch the data
    useEffect(() => {
      const fetchData = async () => {
        await fetch("/api/listings").then((res) => {
          res.json().then((listings) => {
            setListingData(listings.data);
          });
        });
      };
      fetchData();
    }, []);
    //
    
  return (
    <div className="flex  w-full">
      {/* search */}
      <div className="bg-slate-200 grow w-1/4">Search</div>
      {/* listings */}
      <div className="grow w-3/4 p-4">
      <h2 className="font-bold text-2xl mb-6 mt-2 ">Latest Listings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-6 mt-4">
       {
        listingData.map((listing,idx)=>(
          <Listing key={idx} listing={listing} />
        ))
       }
      </div>
      </div>
    </div>
  );
}
