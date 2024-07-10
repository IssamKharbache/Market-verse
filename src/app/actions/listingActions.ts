"use server"

import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

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