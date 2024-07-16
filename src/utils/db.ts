import { faCar, faHouse, faLaptop, faShirt } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connectDb() {
  return mongoose.connect(process.env.MONGODB_URL as string);
}

export const categories = [
  { label: "Cars", key: "cars", icon: faCar },
  { label: "Electronics", key: "electronics", icon: faLaptop },
  { label: "Clothes", key: "clothes", icon: faShirt },
  { label: "Properties", key: "properties", icon: faHouse },
];


export const defaultRadius = 50 * 1000;
