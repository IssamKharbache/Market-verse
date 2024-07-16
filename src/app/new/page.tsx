"use server"

import ListingForm from "@/components/forms/ListingForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignInBtn from "@/components/auth/SignInBtn";



const newListPage =  async () => {
  const defaultLocation = {
    lat: 33.573616824951735,
    lng: -7.617842797047212

  }
  const session = await  getServerSession(authOptions);
  if(!session){
      return (
        <div className="flex flex-col gap-8 items-center justify-center">
         <p className="font-bold text-2xl md:text-5xl mt-24"> Please log in to create a new listing</p>
          <SignInBtn />
        </div>
      )
  }
  return (
   <div className="">
    <h1 className="font-bold  mx-auto mt-4 ml-8 text-4xl">New listing</h1>
     <ListingForm  isEdit={false} defaultLocation={defaultLocation} />
   </div>
  );
};

export default newListPage;
