import React, { Dispatch, SetStateAction, useState } from "react";
import Uploader from "./Uploader";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../spinner/LoadingSpinner";
import UploadThumbnail from "./UploadThumbnail";

type Props = {
  files: UploadResponse[];
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
  setIsImageUploading:Dispatch<SetStateAction<boolean>>;
};
const UploadArea = ({ files, setFiles ,setIsImageUploading }: Props) => {
    const [isUploading,setIsUploading] = useState(false);
  return (
    <div className="grow pt-8 ">
      <div className="bg-slate-200 p-4 rounded">
        <h2 className="text-gray-400 font-bold text-center text-2xl">
          Add images for your listing
        </h2>
        <div className="flex flex-col gap-4 mt-8">
       {files.length === 0 &&  <FontAwesomeIcon icon={faImage} className="h-24 text-gray-600" /> }
        <div className="grid grid-cols-3 gap-4">
          {files.map((file,idx) => (
            <UploadThumbnail key={idx} file={file} />
          ))}
          </div>
        
          {
            isUploading ? <LoadingSpinner label="Uploading" /> :<label
            className="upload-btn text-center cursor-pointer bg-primary hover:bg-primary-hover duration-300 text-white px-4 py-2 rounded-md mt-8 font-bold  capitalize"
          >
           
            <Uploader
            onUploadStart={()=>{
              setIsUploading(true);
              setIsImageUploading(true);
            }}
              onSuccess={(file) => {
                setFiles((prev) => [...prev, file]);
                setIsUploading(false);
                setIsImageUploading(false);

            }}
            />
            Add images
          </label>
          }
         
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
