"use client";
import FilterForm from "@/components/forms/FilterForm";
import Listing from "@/components/home/Listing";
import Skeleton from "@/components/home/Skeleton";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { listings } from "@/models/listing";
import { useEffect,useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [listingData, setListingData] = useState<listings[]>();
  const [loading,setLoading] = useState<boolean>(false);
  //use effect to fetch the data
  useEffect(() => {
    fetchData();
  }, []);
  //

  const fetchData = async (params?: URLSearchParams) => {
    setLoading(true)
    if(!params){
      params = new URLSearchParams();
    }
    const url = `/api/listings?${params?.toString() || ""}`;

    await fetch(url).then((res) => {
      res.json().then((listings) => {
        setLoading(false);
        setListingData(listings);
      });
    });
  };
  //search filtering function
  const handleSearch = (formData: FormData) => {
   
    const params = new URLSearchParams();
    formData &&
      formData.forEach((value, key) => {
        if (typeof value === "string") {
          params.set(key, value);
        }
      });
    fetchData(params);
  };
  //
  return (
    <div className="flex flex-col  md:flex-row  w-full">
      {/* search */}
     <FilterForm action={handleSearch} />
      {/* listings */}
      <div className="grow w-3/4 p-4 mx-auto bg-slate-200/70">
        <h2 className="font-bold text-2xl mb-6 mt-2 text-center md:text-start ">Latest Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-6 mt-4 justify-center items-center">
          {listingData &&  (
            listingData?.map((listing, idx) => (
              <Listing key={idx} listing={listing} />
            ))
          )}

          {listingData && listingData?.length === 0 && (
             
              <>
                <div className="flex  mx-auto items-center justify-center mt-8">
                  <p className="text-3xl md:text-5xl font-bold">No Listings found</p>
                </div>
              </>
            )
          }
          {
            loading && <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            </>
          }
        </div>
      </div>
      
    </div>
  );
}
