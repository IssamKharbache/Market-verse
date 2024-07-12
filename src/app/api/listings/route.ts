import { listingModel, listings } from "@/models/listing";
import { connectDb } from "@/utils/db"
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";

export const GET =  async (req:Request,res:Response) => {
try {
    await connectDb();
    //filtering variables
    const {searchParams} = new URL(req.url);
    const query =  searchParams.get("query");
    const queryCat  = searchParams.get("category");
    const filter:FilterQuery<listings> = {};

  //filtering with title
    if(query) {
        filter.title = {$regex:'.*'+query+'.*',$options:"i"};
    }
    if(queryCat){
        if(queryCat !== "all"){
            filter.category =  {$regex:'.*'+queryCat+'.*',$options:"i"};
        }
        else if(queryCat === "all") {
            filter.category =  {$regex:'.*'+'.*',$options:"i"};
        }
    }
const listings = await listingModel.find(filter,null,{sort:{createdAt:-1}});
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