import mongoose from "mongoose";

export async function connectDb(){
    return mongoose.connect(process.env.MONGODB_URL as string);
}