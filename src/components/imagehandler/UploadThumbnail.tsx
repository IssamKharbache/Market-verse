import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import React from 'react'

const UploadThumbnail = ({file}:{file:UploadResponse}) => {
    if(file.fileType === "image"){
        return(
           <a href={file.url} target='_blank'>
             <img src={file.url+"?tr=w-100,h-100,fo-auto"} style={{height:"100px"}} alt="thumbnail" />
           </a>
        )
    }
  return (
    <div>{file.url}&raquo;</div>
  )
}

export default UploadThumbnail