"use client";
import FilterForm from "@/components/forms/FilterForm";
import Listing from "@/components/home/Listing";
import Skeleton from "@/components/home/Skeleton";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { listings } from "@/models/listing";
import { useEffect,useState } from "react";
import Loading from "./loading";
import Loadings from "./loading";

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
    <div className="flex flex-col  md:flex-row  w-full mb-16">
      {/* search */}
     <FilterForm action={handleSearch} />
      {/* listings */}
      <div className="grow w-3/4 h-screen p-4 mx-auto" id="listings">
        <h2 className="font-bold text-2xl mb-6 mt-2 text-center md:text-start ">Latest Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-4 justify-center items-center ">
          {listingData &&  (
            listingData?.map((listing, idx) => (
              <Listing key={idx} listing={listing} />
            ))
          )}
          {
            loading && <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            </>
          }
          
        </div>
        {listingData && listingData?.length === 0 && (
             
             <>
               <div className="p-4  w-full mt-36  mb-6">
                 <p className="text-3xl md:text-5xl font-bold text-center">No Listings found</p>
               </div>
             </>
           )
         }
      </div>
      
    </div>
  );
}
