"use server";

import Gallery from "@/components/imagehandler/Gallery";
import UploadThumbnail from "@/components/imagehandler/UploadThumbnail";
import UploadView from "@/components/imagehandler/UploadView";
import LocationMap from "@/components/map/LocationMap";
import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  if(!listings){
    return "Not found !"
  }
  return(
    <div className="flex flex-col md:flex-row  absolute inset-0 top-24 " >
    <div className="w-full md:w-3/5  grow bg-black text-white flex flex-col relative">
      {/* left */}
      <Gallery files={listings.files} />
    </div>
    <div className="md:w-2/5 w-full p-8 grow shrink-0">
      <h1 className="text-2xl font-bold">{listings.title}</h1>
      <div className="flex items-center gap-4 mt-4">
        <p className="text-lg font-semibold">Category</p>
        <span className="bg-slate-300 capitalize  text-black font-bold rounded-md p-2">{listings.category}</span>
      </div>
      <label>Description</label>
      <p className="text-sm font-semibold">{listings.description}</p>
      <label>Contact information</label>
      <p className="font-semibold">{listings.contact}</p>
      <div className="flex gap-2 items-center mb-4 mt-6">
      <FontAwesomeIcon icon={faLocationDot} />
     <p className='font-bold'>{country}</p>
     </div>
     <div className="flex flex-col">
    <label htmlFor="">Location</label>
    <LocationMap location={listings.location} className="w-full h-72" />
    </div>
    </div>
  </div>
  )
};

export default page;
