import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { MouseEvent, MouseEventHandler } from 'react';
import MyImage from './MyImage';


type Props = {
file:UploadResponse;
onClick?: ()=>void;
}

const UploadThumbnail = ({file,onClick}:Props) => {

  function handleClick(ev:React.MouseEvent){
    if(onClick){
      ev.preventDefault();
      return onClick();
    }
    location.href = file.url;
  }
    if(file.fileType === "image"){
        return(
           <a onClick={handleClick} target='_blank'>
             <MyImage src={file.filePath} aiCrop={true} width={300} height={300}  alt="Listing thumbnail"  />
           </a>
        )
    }
  return (
    <div>{file.url}&raquo;</div>
  )
}

export default UploadThumbnail