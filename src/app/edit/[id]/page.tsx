"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListingForm from "@/components/forms/ListingForm"
import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { getServerSession } from "next-auth";


type Props = {
  params:{
    id:string

  };
  searchParams:{[key:string]:string};
}
const page = async (props:Props) => {
  const id =  props.params.id;
  await connectDb();

  const session = await getServerSession(authOptions);
  const listing = await listingModel.findById(id);
  if(!listing){
    return <div className="flex items-center  justify-center mt-24">
    <p className="text-4xl font-bold ">404 Listing not found</p>
  </div>
  }
  if(session?.user?.email !==  listing?.userEmail){
    return <div className="flex items-center  justify-center mt-24">
      <p className="text-4xl font-bold ">Not authorized to edit this listing</p>
    </div>
  }

  return (
    <div>
      <h1 className="font-bold  mx-auto mt-4 ml-8 text-4xl">Edit listing</h1>
      <ListingForm id={listing._id} defaultFiles={listing.files} defaultLocation={listing.location} defaultValues={listing} isEdit={true}  />
    </div>
  )
}

export default page