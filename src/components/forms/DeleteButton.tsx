"use client";
import { faClose, faL, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "../spinner/LoadingSpinner";


const DeletelistingButton = ({id}:{id:string}) => {
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const handleDelete = () =>{
        setLoading(true);
        fetch(`/api/listings?id=${id}`,{
            method: "DELETE",
        }).then(()=>{
            setLoading(false);
            setShowDeleteQuestion(false); 
            router.push("/");
        })
      
    }
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false);
  if (showDeleteQuestion) {
    return (
      <div className="fixed z-10 inset-0  bg-black/90 flex justify-center items-center  ">
        <div className="bg-white text-black p-4 rounded">
          <div className="flex justify-between items-center gap-4 p-4 mt-2 ">
            <h1 className="text-2xl">Confirmation</h1>
            <FontAwesomeIcon
              className="h-4 w-4 bg-slate-200 hover:bg-slate-300 transition rounded-full p-2"
              onClick={() => setShowDeleteQuestion(false)}
              icon={faClose}
            />
          </div>
          <h1 className="text-xl mt-8 mb-6">
            Are you sure you want to delete this listing ?
          </h1>
          <div className="flex justify-center items-center gap-4 mt-4 *:px-4 *:py-2 *:rounded *:transition">
            {
                loading ? <button  className="flex gap-4 items-center opacity-55   bg-red-500/90 cursor-not-allowed text-white">
                Deleting <LoadingSpinner className="flex" color="slate-50" />
              </button>:<button onClick={handleDelete} className="bg-red-500/90 hover:bg-red-500 text-white">
              I am sure
            </button>
            }
            <button
              onClick={() => setShowDeleteQuestion(false)}
              className="border border-blue-500 hover:bg-blue-500 hover:text-white"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={() => setShowDeleteQuestion(true)}
      className="bg-red-500/80 hover:bg-red-500  text-white "
    >
      <span>Delete</span>
      <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
    </button>
  );
};

export default DeletelistingButton;
