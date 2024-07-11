import { UploadResponse } from 'imagekit/dist/libs/interfaces'

import React from 'react'
import MyImage from './MyImage'

const UploadView = ({file}:{file:UploadResponse}) => {
    if(file.fileType === "image"){
        return (
           <MyImage src={file.filePath} alt='Listing'
           width={2048}
           height={2048}
           className='w-auto h-auto max-w-full max-h-full rounded'
           />
        )
    }
  return (
    <div>{file.name}</div>
  )
}

export default UploadView