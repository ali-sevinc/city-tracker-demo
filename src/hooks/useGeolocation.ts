import { useState } from "react";

export default function useGeolocation(
  defaultPosition = null as {
    lat: number;
    lng: number;
  } | null
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    defaultPosition
  );
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message || "Something went wrong.");
        setIsLoading(false);
      }
    );
  }
  return { getPosition, isLoading, error, position };
}
