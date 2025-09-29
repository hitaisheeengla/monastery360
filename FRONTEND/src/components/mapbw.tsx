import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Monastery } from "@/data/monasteries";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Card, CardContent } from "./ui/card";

// Custom default marker
const defaultIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Props
interface RouteMapProps {
  monasteries : Monastery[]
}

const RouteMap: React.FC<RouteMapProps> = ({monasteries}) => {
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  // Center on the first monastery
  const center: [number, number] =
    monasteries.length > 0
      ? [monasteries[0].coordinates.lat, monasteries[0].coordinates.lng]
      : [27.5333, 88.6167]; // fallback center (Sikkim)

  useEffect(() => {
    if (monasteries.length < 2) return;

    const coordsStr = monasteries
      .map((m) => `${m.coordinates.lng},${m.coordinates.lat}`)
      .join(";");

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordsStr}?geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]] as [number, number] // flip lng/lat
          );
          setRouteCoords(coords);
        }
      } catch (error) {
        console.error("Error fetching multi-point route:", error);
      }
    };

    fetchRoute();
  }, [monasteries]);

  return (
    <div className="w-full flex flex-col gap-5 md:flex-row">
  {/* Map Section */}
      <div className="w-full md:w-2/3">
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: "100%", width: "100%", borderRadius: "20px", zIndex: 1 }}
        scrollWheelZoom={false}
        whenCreated={(map) => {
          map.on("click", () => map.scrollWheelZoom.enable());
          map.on("mouseout", () => map.scrollWheelZoom.disable());
        }}
      >
        {/* Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers for each monastery */}
        {monasteries.map((monastery) => (
          <Marker
            key={monastery.id}
            position={[monastery.coordinates.lat, monastery.coordinates.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{monastery.name}</strong>
              <br />
              {monastery.location}
            </Popup>
          </Marker>
        ))}

        {/* Route Line */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} pathOptions={{ color: "red", weight: 5 }} />
        )}
      </MapContainer>
    </div>

  {/* Right-side Cards */}
  <div className="w-full md:w-1/3 h-64 md:h-[60vh] overflow-y-auto space-y-4">
    {monasteries.map((monastery) => (
      <Card
        key={monastery.id}
        className="shadow-md cursor-pointer hover:border-monastery-red/40 transition"
        onClick={() => {}}
      >
        <CardContent className="p-4">
          <h4 className="font-semibold text-base">{monastery.name}</h4>
          <p className="text-xs text-muted-foreground mb-1">{monastery.location}</p>
          <p className="text-sm line-clamp-2">{monastery.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

  );
};

export default RouteMap;
