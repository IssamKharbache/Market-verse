import { listingModel, listings } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { FilterQuery, PipelineStage } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectDb();
    //filtering variables
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const queryCat = searchParams.get("category");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    
    const filter: FilterQuery<listings> = {};

    //filtering with title
    if (query) {
      filter.title = { $regex: ".*" + query + ".*", $options: "i" };
    }
    if (queryCat) {
      if (queryCat !== "all") {
        filter.category = queryCat;
      } else if (queryCat === "all") {
        filter.category = { $regex: ".*" + ".*", $options: "i" };
      }
    }
    //filtering by price
    if (min && !max) filter.price = { $gte: min };
    if (max && !min) filter.price = { $lte: max };
    if (min && max) filter.price = { $gte: min, $lte: max };
 

    const listings = await listingModel.find(filter ,null,{sort:{ createdAt: -1 }});
    return Response.json(listings);
  } catch (error) {
    return Response.json("Error 505 while getting listing");
  }
};
