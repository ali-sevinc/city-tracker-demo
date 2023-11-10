import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCityContext } from "../../store/CityContext";

import useUrlPosition from "../../hooks/useUrlPosition";
import useGeolocation from "../../hooks/useGeolocation";

import { flagemojiToPNG } from "../../helpers/functions";

import Button from "../ui/Button";

import styles from "./Map.module.css";

export default function Map() {
  const { cities } = useCityContext();
  const {
    getPosition,
    isLoading: positionLoading,
    position: geolocationPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) {
        setMapPosition([Number(lat), Number(lng)]);
      }
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geolocationPosition?.lat && geolocationPosition?.lng) {
        const params: LatLngExpression = [
          geolocationPosition?.lat,
          geolocationPosition?.lng,
        ];

        setMapPosition(params);
      }
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="button" style="position" onClick={getPosition}>
          {positionLoading ? "loading" : "Get current position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const emoji = flagemojiToPNG(city.emoji);
          return (
            <Marker
              position={[Number(city.position.lat), Number(city.position.lng)]}
              key={city.id}
            >
              <Popup>
                <img
                  src={`https://flagcdn.com/24x18/${emoji}.png`}
                  alt={city.country}
                />
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}

        <ChangeCenter positions={mapPosition} />

        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ positions }: { positions: LatLngExpression }) {
  const map = useMap();
  map.setView(positions);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (event) =>
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  });

  return null;
}
