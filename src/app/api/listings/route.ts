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
    const radius = searchParams.get("radius");
    const center = searchParams.get("center");
    const filter: FilterQuery<listings> = {};
    const aggregationSteps: PipelineStage[] = [];

    //filtering with title
    if (query) {
      filter.title = { $regex: ".*" + query + ".*", $options: "i" };
    }
    if (queryCat) {
      if (queryCat !== "all") {
        filter.category = { $regex: ".*" + queryCat + ".*", $options: "i" };
      } else if (queryCat === "all") {
        filter.category = { $regex: ".*" + ".*", $options: "i" };
      }
    }
    //filtering by price
    if (min && !max) filter.price = { $gte: min };
    if (max && !min) filter.price = { $lte: max };
    if (min && max) filter.price = { $gte: min, $lte: max };
    if (radius && center) {
      const coords = center.split("-");
      aggregationSteps.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(coords[0]),parseFloat(coords[1])],
          },
          query: filter,
          includeLocs: "location",
          distanceField: "distance",
          maxDistance: parseInt(radius),
          spherical: true,
        },
      });
    }
    aggregationSteps.push({
      $sort: { createdAt: -1 },
    });

    aggregationSteps.push({
      $match: filter,
    });

    aggregationSteps.push({
      $sort: {
        createdAt: -1,
      },
    });
    //
    const listings = await listingModel.aggregate(aggregationSteps);
    return NextResponse.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal error occurred",
    });
  }
};
