import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useMemo, useRef } from "react";

interface IProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const Map = ({ latitude, longitude, zoom }: IProps) => {
  const mapContainerRef = useRef<HTMLDivElement>();

  const options: google.maps.MapOptions = useMemo(
    () => ({ center: { lat: latitude, lng: longitude }, zoom }),
    [latitude, longitude, zoom],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(google => {
      const map = new google.maps.Map(mapContainerRef.current, options);
      new google.maps.Marker({ position: options.center, map });
    });
  }, [options]);

  return <div ref={mapContainerRef} className="mapContainer" />;
};
