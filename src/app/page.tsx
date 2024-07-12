"use client";
import Listing from "@/components/home/Listing";
import { listings } from "@/models/listing";
import { categories } from "@/utils/db";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [listingData, setListingData] = useState<listings[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [noItems, setNoItems] = useState(false);

  //use effect to fetch the data
  useEffect(() => {
    fetchData();
  }, []);
  //
  const fetchData = async (params?: URLSearchParams) => {
    const url = `/api/listings?${params?.toString() || ""}`;

    await fetch(url).then((res) => {
      res.json().then((listings) => {
        setListingData(listings.data);
      });
    });
  };
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
  return (
    <div className="flex  w-full">
      {/* search */}
      <form
        ref={formRef}
        action={handleSearch}
        className="flex flex-col  gap-4 grow w-1/4 p-4 border-r-2 "
      >
        {/* form  input */}
        <input name="query" type="text" placeholder="Search listing..." />
        <div>
          <label className="radio-btn group">
            <input
              onClick={() => formRef.current?.requestSubmit()}
              type="radio"
              hidden
              name="category"
              defaultChecked
              value="all"
            />
            <span className="icon group-has-[:checked]:bg-blue-300 group-has-[:checked]:text-white duration-300">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </span>
            All categories
          </label>
          {categories.map(({ key, label, icon }, idx) => (
            <label key={idx} className="radio-btn group">
              <span className="icon group-has-[:checked]:bg-blue-300 group-has-[:checked]:text-white duration-300">
                <FontAwesomeIcon icon={icon} />
              </span>
              <input
                onClick={() => formRef.current?.requestSubmit()}
                hidden
                type="radio"
                name="category"
                value={key}
              />
              {label}
            </label>
          ))}
        </div>
      </form>
      {/* listings */}
      <div className="grow w-3/4 p-4 bg-slate-200/70">
        <h2 className="font-bold text-2xl mb-6 mt-2 ">Latest Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-6 mt-4">
          {listingData.length > 0 ? (
            listingData?.map((listing, idx) => (
              <Listing key={idx} listing={listing} />
            ))
          ) : (
            <>
              <div className="flex w-[500px] items-center justify-center mt-8">
                <p className="text-6xl ">No Listings found</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
