
"use effect";
import { createRef, useEffect} from 'react'
import { Loader } from "@googlemaps/js-api-loader"

export type Location ={
    lat:number,
    lng:number
}

const LocationPicker = ({defaultLocation, onChange,geoCords}:{defaultLocation:Location,onChange:(location:Location)=>void ,geoCords:Location| null}) => {
    const mapRef = createRef<HTMLDivElement>();
    const loadMap = async () => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          });
        const {Map} = await  loader.importLibrary("maps");
        const {AdvancedMarkerElement} = await loader.importLibrary("marker");
        const map = new Map(mapRef.current as HTMLDivElement,{
            mapId:"map",
            center:defaultLocation,
            zoom:8,
            mapTypeControl:false,
            streetViewControl:false 
        });

        const marker = new AdvancedMarkerElement({
            map,position:defaultLocation,
        })
        map.addListener("click",(ev:any)=>{
            marker.position = ev?.latLng;
            const lat = ev.latLng.lat();
            const lng = ev.latLng.lng();
             onChange({lat,lng})
        })
    }
   //
    useEffect(()=>{
        loadMap();
    },[geoCords])

  return (
    <div ref={mapRef} id='mapElement' className='w-full h-[300px]' ></div>
  )
}

export default LocationPicker