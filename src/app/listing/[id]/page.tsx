"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Gallery from "@/components/imagehandler/Gallery";
import LocationMap from "@/components/map/LocationMap";
import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { formatMoney } from "@/utils/NumberFormat";
import { faLocationDot, faPen, faTrashCan, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {
  params:{
    id:string

  };
  searchParams:{[key:string]:string};
}
const page =  async (args:Props) => {
  
  await connectDb();
  const id =  args.params.id
  const country = args.searchParams.location ;
  const listings = await listingModel.findById(id);
  const session = await getServerSession(authOptions);
  if(!listings){
    return "Not found !"
  }
  return(
    <div className="flex flex-col md:flex-row  absolute inset-0 top-24 " >
    <div className="w-full md:w-3/5  grow bg-black text-white flex flex-col relative">
      {/* left */}
      <Gallery files={listings.files} />
    </div>
    <div className="md:w-2/5 w-full p-8 grow shrink-0 overflow-y-scroll">
    <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">{listings.title}</h1>
    {session && session?.user?.email === listings.userEmail && (
        <div className="flex gap-4 *:flex *:gap-2 *:items-center *:py-2 *:px-6 *:rounded *:font-bold *:transition *:cursor-pointer">
          <Link href={`/edit/${listings._id}`}  className="items-center border-2 border-gray-400 hover:bg-gray-400 ">
            <span>Edit</span>
            <FontAwesomeIcon icon={faPen}  className="w-3 h-3"/>
          </Link>
          <button  className="bg-red-500/80 hover:bg-red-500  text-white ">
        
          <span>Delete</span>
          <FontAwesomeIcon icon={faTrashCan}  className="w-3 h-3"/>
          </button>
        </div>
      )}
    </div>
      
     
      <label >Price</label>
      <p className="text-xl font-bold">{formatMoney(listings.price)}</p>
      <div className="flex items-center gap-4 mt-4">
        <label className="text-lg font-semibold">Category</label>
        <span className="bg-slate-300 capitalize  text-black font-bold rounded-md p-2">{listings.category}</span>
      </div>
      <label>Description</label>
      <p className="text-sm font-semibold">{listings.description}</p>
      <label>Contact information</label>
      <p className="font-semibold">{listings.contact}</p>
     <div className="flex flex-col">
    <label htmlFor="">Location</label>
    <LocationMap location={listings.location} className="w-full h-56" />
    </div>
    </div>
  </div>
  )
};

export default page;
