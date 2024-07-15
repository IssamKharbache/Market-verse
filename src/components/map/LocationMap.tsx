'use client';
import {Loader} from "@googlemaps/js-api-loader";
import {createRef, HTMLAttributes, useEffect} from "react";
import { Location } from "./LocationPicker";

type Props = HTMLAttributes<HTMLDivElement> & {
  location: Location;
};

export default function LocationMap({location, ...divProps}:Props) {
  const mapsDivRef = createRef<HTMLDivElement>();

  useEffect(() => {
    loadMap();
  }, []);

  async function loadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });
    const {Map} = await loader.importLibrary('maps');
    const {AdvancedMarkerElement} = await loader.importLibrary('marker');
    const map = new Map(mapsDivRef.current as HTMLDivElement, {
      mapId: 'map',
      center: location,
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });
    new AdvancedMarkerElement({
      map,
      position: location,
    });
  }

  return (
    <>
      <div {...divProps} ref={mapsDivRef}></div>
    </>
  );
}