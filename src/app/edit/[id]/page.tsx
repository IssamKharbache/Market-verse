"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import SignInBtn from "@/components/auth/SignInBtn";
import ListingForm from "@/components/forms/ListingForm"
import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { getServerSession } from "next-auth";
import Link from "next/link";


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
  if(!session){
     return (
        <div className="flex flex-col gap-8 items-center justify-center">
         <p className="font-bold text-2xl md:text-5xl mt-24"> Please log in to create a new listing</p>
          <SignInBtn />
        </div>
      )
  }
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    return(
      <div className="flex flex-col gap-8 items-center justify-center">
      <p className="font-bold text-2xl md:text-5xl mt-24"> Please make sure this listing exist</p>
      <Link href="/" className="py-2 px-4 font-bold bg-primary hover:bg-primary-hover transition text-white rounded">Go home</Link>
     </div>
    )
    
}
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
      <ListingForm id={JSON.parse(JSON.stringify(listing._id))} defaultFiles={listing.files} defaultLocation={listing.location} defaultValues={listing} isEdit={true}  />
    </div>
  )
}

export default page