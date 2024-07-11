"use server";

import Gallery from "@/components/imagehandler/Gallery";
import UploadThumbnail from "@/components/imagehandler/UploadThumbnail";
import UploadView from "@/components/imagehandler/UploadView";
import { listingModel } from "@/models/listing";
import { connectDb } from "@/utils/db";

type Props = {
  params:{
    id:string
  };
  searchParams:{[key:string]:string};
}
const page =  async (args:Props) => {
  await connectDb();
  const id =  args.params.id
  const listings = await listingModel.findById(id);
  if(!listings){
    return "Not found !"
  }
  return(
    <div className="flex  absolute inset-0 top-24 " >
    <div className="w-3/5 grow bg-black text-white flex flex-col relative">
      {/* left */}
      <Gallery files={listings.files} />
    </div>
    <div className="w-2/5 p-8 grow shrink-0">
      <h1 className="text-2xl font-bold">{listings.title}</h1>
      <div className="flex items-center gap-4 mt-4">
        <p className="text-lg font-semibold">Category</p>
        <span className="bg-slate-300 capitalize  text-black font-bold rounded-md p-2">{listings.category}</span>
      </div>
      <label>Description</label>
      <p className="text-sm font-semibold">{listings.description}</p>
      <label>Contact information</label>
      <p className="font-semibold">{listings.contact}</p>
    </div>
  </div>
  )
};

export default page;
