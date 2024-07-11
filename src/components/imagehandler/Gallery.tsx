"use client";
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import UploadThumbnail from './UploadThumbnail'
import UploadView from './UploadView'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MyImage from './MyImage';


const Gallery = ({files}:{files:UploadResponse[]}) => {
    const [activeFile,setActiveFile] = useState<UploadResponse | null>(files?.[0] || null);

    const next = () =>{
      const activeFileIndex = files.findIndex(f=>f.fileId === activeFile?.fileId);
      const nextIndex = activeFileIndex === files.length -1 ? 0 : activeFileIndex + 1 ;
      const nextFile = files[nextIndex];
      setActiveFile(nextFile);
    }
    const previous = () =>{
      const activeFileIndex = files.findIndex(f=>f.fileId === activeFile?.fileId);
      const prevIndex = activeFileIndex === 0 ? files.length -1 : activeFileIndex - 1 ;
      const prevFile = files[prevIndex];
      setActiveFile(prevFile);
    }
  return (
    <>
    {
      activeFile &&   <div className="absolute inset-0 overflow-hidden ">
      <MyImage src={activeFile.filePath} alt='bg' width={2048} height={2048} className="object-cover opacity-30 blur h-full w-full " />
      </div>
    }
      <div className="grow flex items-center justify-center p-4 relative">
        {activeFile && (
        <>
       
          <div className="absolute inset-4 flex justify-center items-center ">
                <UploadView file={activeFile} />
          </div>
          <div className="absolute flex items-center inset-4 ">
           <div className="flex justify-between w-full px-2">
           <button onClick={previous} className='size-12 justify-center items-center bg-gray-500/30 hover:bg-gray-500/60 transition rounded-full  p-2'><FontAwesomeIcon icon={faChevronLeft} /></button>
           <button onClick={next} className='size-12 bg-gray-500/30 hover:bg-gray-500/60 rounded-full transition  p-2'><FontAwesomeIcon icon={faChevronRight} /></button>
           </div>
          </div>
        </>
        )}
      </div>
      <div className="p-4 flex gap-4  justify-center relative z-10">
        {files.map((file,idx)=>(
             <div key={idx} className="size-24 cursor-pointer ">
               <UploadThumbnail onClick={()=>{
                setActiveFile(file)
               }}  file={file} />
             </div>
        ))}
      </div></>
  )
}

export default Gallery