import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Car, MapPin, Clock, Route } from "lucide-react";
import { Monastery } from "@/data/monasteries";

// Default Leaflet icon
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface JourneyMapProps {
  monasteries: Monastery[];
  currentLocation: { lat: number; lng: number } | null;
  travelMode: "driving" | "walking";
  onTravelModeChange: (mode: "driving" | "walking") => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  monasteries,
  currentLocation,
  travelMode,
  onTravelModeChange,
}) => {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [routeInfo, setRouteInfo] = useState({
    totalDistance: "0 km",
    totalDuration: "0 min",
    nextDestination: monasteries[0]?.name || "No destination",
    eta: "--:--",
  });

const center: [number, number] =
  currentLocation
    ? [currentLocation.lat, currentLocation.lng] // convert object → tuple
    : monasteries.length > 0
      ? [monasteries[0].coordinates.lat, monasteries[0].coordinates.lng]
      : [27.5333, 88.6167];

  // Fetch real route from OSRM
  useEffect(() => {
    if (monasteries.length < 2) return;

    const coordsStr = monasteries
      .map((m) => `${m.coordinates.lng},${m.coordinates.lat}`)
      .join(";");

    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/${travelMode}/${coordsStr}?geometries=geojson&overview=full&steps=true`
        );
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];

          const coords = route.geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]] as [number, number]
          );

          const distanceKm = (route.distance / 1000).toFixed(1);
          const durationMin = Math.round(route.duration / 60);

          setRouteCoords(coords);
          setRouteInfo({
            totalDistance: `${distanceKm} km`,
            totalDuration: `${durationMin} min`,
            nextDestination: monasteries[1]?.name || monasteries[0]?.name,
            eta: new Date(Date.now() + route.duration * 1000).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            ),
          });
        }
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  }, [monasteries, travelMode]);

  return (
    <div className="space-y-4">
      {/* Travel Mode Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Journey Route</h3>
          <div className="flex space-x-2">
            <Button
              variant={travelMode === "driving" ? "default" : "outline"}
              size="sm"
              onClick={() => onTravelModeChange("driving")}
              className="flex items-center space-x-2"
            >
              <Car className="h-4 w-4" />
              <span>Drive</span>
            </Button>
            <Button
              variant={travelMode === "walking" ? "default" : "outline"}
              size="sm"
              onClick={() => onTravelModeChange("walking")}
              className="flex items-center space-x-2"
            >
              <Navigation className="h-4 w-4" />
              <span>Walk</span>
            </Button>
          </div>
        </div>

        {/* Route Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {routeInfo.totalDistance}
            </div>
            <div className="text-sm text-muted-foreground">Total Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {routeInfo.totalDuration}
            </div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {monasteries.length}
            </div>
            <div className="text-sm text-muted-foreground">Stops</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{routeInfo.eta}</div>
            <div className="text-sm text-muted-foreground">ETA</div>
          </div>
        </div>
      </Card>

      {/* Real Map */}
      <Card className="p-0 overflow-hidden">
        <MapContainer
          center={center}
          zoom={9}
          style={{ height: "60vh", width: "100%" , zIndex:1 }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location */}
          {currentLocation && (
            <Marker
              position={[currentLocation.lat, currentLocation.lng]}
              icon={
                new L.Icon({
                  iconUrl:
                    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                })
              }
            >
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Monastery Markers */}
          {monasteries.map((m) => (
            <Marker
              key={m.id}
              position={[m.coordinates.lat, m.coordinates.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <strong>{m.name}</strong>
                <br />
                {m.location}
              </Popup>
            </Marker>
          ))}

          {/* Route Line */}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: "red", weight: 5 }}
            />
          )}
        </MapContainer>
      </Card>
    </div>
  );
};
