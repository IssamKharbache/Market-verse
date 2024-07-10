import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Model, model, models, Schema } from "mongoose";

export type listing = {
    title:string;
    price:number;
    description:string;
    contact:string;
    category:string;
    files:UploadResponse[];
    location:{
        lat:number;
        lng:number
    };
    userEmail:string;
}

const listingSchema = new Schema<listing>({
title:String,
price:Number,
category:String,
description:String,
contact:String,
files:[Object],
location:Object,
userEmail:{type:String,required:true}

},{timestamps:true});


export const listingModel = (models?.listingSchema as Model<listing>) || model<listing>("listing",listingSchema);