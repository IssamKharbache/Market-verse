import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db"
import { NextResponse } from "next/server";

export const GET =  async () => {
try {
    await connectDb();

const listings = await listingModel.find({},null,{sort:{createdAt:-1}});
return  NextResponse.json({
    success:true,
    data:listings
})
} catch (error) {
    return  NextResponse.json({
        success:false,
        message:"Internal error occurred"
    })
}


}