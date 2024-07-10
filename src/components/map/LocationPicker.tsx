
"use effect";
import React, { createRef, useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"

export type Location ={
    lat:number,
    lng:number
}

type LocationHandler = (pos:Location) => void

const LocationPicker = ({onChange}:{onChange:LocationHandler}) => {
    const mapRef = createRef<HTMLDivElement>();
    const loadMap = async () =>{
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          
          });
        const {Map} = await  loader.importLibrary("maps");
        const {AdvancedMarkerElement} = await loader.importLibrary("marker");
        const map = new Map(mapRef.current as HTMLDivElement,{
            mapId:"map",
            center:{lat:0,lng:0},
            zoom:8,
            mapTypeControl:false,
            streetViewControl:false
        });
        
        const marker = new AdvancedMarkerElement({
            map,position:{lat:0,lng:0},
        })
        map.addListener("click",(ev:any)=>{
            marker.position = ev?.latLng;
            const lat = ev.latLng.lat();
            const lng = ev.latLng.lng();
            onChange({lat,lng})
        })
    }
    useEffect(()=>{
        loadMap();
    },[])
  return (
    <div ref={mapRef} id='mapElement' className='w-full h-[300px]' ></div>
  )
}

export default LocationPicker