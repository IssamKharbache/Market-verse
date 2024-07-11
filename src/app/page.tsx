"use client";
import UploadThumbnail from "@/components/imagehandler/UploadThumbnail";
import { listings } from "@/models/listing";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [listingData, setListingData] = useState<listings[]>([]);

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
  return (
    <div className="flex  w-full">
      {/* search */}
      <div className="bg-slate-200 grow w-1/4">Search</div>
      {/* listings */}
      <div className="grow w-3/4 p-4">
      <h2 className="font-bold text-2xl mb-6 mt-2 ">Latest Listings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-6 mt-4">
      {listingData.map((listing,idx) => (
          <div key={idx} className="min-h-24 flex  flex-col gap-4 justify-start">
            {listing.files?.length > 0 && (
              <div className="rounded-md relative">
                <UploadThumbnail onClick={()=>{}} file={listing.files[0]} />
                  <Link href={`/listing/${listing._id}`} className="absolute inset-0 "></Link>
              </div>
            )}
            <div className="">
              <p className="font-bold  mt-4 text-2xl">
                ${listing.price}
              </p>
              <Link href={`/listing/${listing._id}`} className=" font-bold mt-4 text-xl">
                {listing.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
