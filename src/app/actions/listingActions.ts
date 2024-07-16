"use server"

import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const createAd = async (formData:FormData) => {
    const {files,location,...data} = Object.fromEntries(formData)
    await connectDb();
    const session = await getServerSession(authOptions);
    const newListing =  {
        ...data,
        files:JSON.parse(files as string),
        location:JSON.parse(location as string),
        userEmail:session?.user?.email
    }
    const newListingDoc = await listingModel.create(newListing);
   return JSON.parse(JSON.stringify(newListingDoc));
}



export const updateListing = async (formData:FormData) => {
    const {files,_id,location,...data} = Object.fromEntries(formData)
    await connectDb();
    const session = await getServerSession(authOptions);
    const listing = await listingModel.findById(_id);
    if(!listing || listing?.userEmail !== session?.user?.email){
       return;
    }
    
    const updatedListing =  {
        ...data,
        files:JSON.parse(files as string),
        location:JSON.parse(location as string),
    }
    const newListingDoc = await listingModel.findByIdAndUpdate(_id,updatedListing);
    revalidatePath("/listing/"+_id) 
   return JSON.parse(JSON.stringify(newListingDoc));
}


