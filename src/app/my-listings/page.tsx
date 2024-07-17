"use server";

import { getServerSession } from "next-auth";
import { connectDb } from "@/utils/db";
import { listingModel } from "@/models/listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Listing from "@/components/home/Listing";
import Loading from "./loading";
import { authOptions } from "../api/auth/[...nextauth]/option";

const MyListingPage = async () => {
  const session = await getServerSession(authOptions);
  await connectDb();

  const myListings = await listingModel.find({
    userEmail: session?.user?.email,
  });

  return (
    <div>
      {myListings.length > 0 ? (
        <div className="max-w-[1400px] mx-auto bg-slate-200">
           <h1 className="text-5xl text-center items-center  mb-6 p-4">My Listings</h1>
         <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            {
                myListings.map((listing,idx)=>(
                    <Listing listing={listing} key={idx} /> 
                ))
            }
        </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-36">
          <p className="font-bold text-4xl text-center">You don't have any listings yet </p>
          <Link
          href="/new"
          className="hidden md:flex bg-primary hover:bg-primary-hover text-white  items-center gap-2 py-2 px-4 mt-4 rounded transition"
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          <span>Create a listing</span>
        </Link>
        </div>
      )}
    </div>
  );
};

export default MyListingPage;
