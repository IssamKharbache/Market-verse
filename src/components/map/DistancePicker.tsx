import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { Location } from "./LocationPicker";

const defaultLocation = {
  lat: 33.573616824951735,
  lng: -7.617842797047212,
};

const DistancePicker = ({
  onChange,
  defaultRaduis,
}: {
  onChange: ({ radius, center }: { radius: number; center: Location }) => void;
  defaultRaduis: number;
}) => {
  const [radius, setRadius] = useState(defaultRaduis);
  const [center, setCenter] = useState<Location | null>(null);
  const [zoom, setZoom] = useState<number>(9);
  const [geoError, setGeoError] = useState("");

  const mapRef = useRef<HTMLDivElement | null>(null);
  //load the map
  useEffect(() => {
    if (center) {
      loadMap();
    }
  }, [center]);
  //
  useEffect(() => {
    if (center && radius) {
      onChange({ center, radius });
    }
  }, [radius, center]);
  //
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (ev) => {
        const location = { lat: ev.coords.latitude, lng: ev.coords.longitude };
        setCenter(location);
      },
      (err) => setGeoError(err.message)
    );
  }, []);
  //load map function
  const loadMap = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });
    const core = await loader.importLibrary("core");

    const { Map, Circle } = await loader.importLibrary("maps");

    const map = new Map(mapRef.current as HTMLDivElement, {
      mapId: "map",
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });

    const circle = new Circle({
      map,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: center,
      radius,
      editable: true,
    });
    core.event.addListener(circle, "bounds_changed", () => {
      const radius = circle.getRadius();
      setRadius(radius);
      if (radius > 1500000) map.setZoom(1);
      else if (radius > 800000) map.setZoom(2);
      else if (radius > 400000) map.setZoom(3);
      else if (radius > 180000) map.setZoom(4);
      else if (radius > 100000) map.setZoom(5);
      else if (radius > 50000) map.setZoom(6);
      else if (radius > 25000) map.setZoom(7);
      else if (radius > 11000) map.setZoom(8);
      else if (radius > 5000) map.setZoom(9);
      else if (radius <= 10000) map.setZoom(10);
      setZoom(map.getZoom() as number);
    });
    core.event.addListener(circle, "center_changed", () => {
      const circleCenter: Location | undefined = circle.getCenter()?.toJSON();
      if (circleCenter) {
        setCenter(circleCenter);
        map.setCenter(circleCenter);
      }
    });
  };
  return (
    <>
      <div className="w-full h-56 bg-gray-200" ref={mapRef}>
        {(!center || geoError) && (
          <div className="text-gray-600 p-4 flex justify-center items-center mt-4 font-bold text-xl">
            {geoError === "User denied Geolocation"
              ? "Please allow gps location in your browser"
              : geoError || "Loading..."}
          </div>
        )}
      </div>
    </>
  );
};

export default DistancePicker;
