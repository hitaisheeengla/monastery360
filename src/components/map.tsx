import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Monastery } from '@/data/monasteries';


import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Card, CardContent } from './ui/card';


// Fix default Leaflet icon paths
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

const defaultIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41], // default Leaflet size
  iconAnchor: [12, 41], // bottom center
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Your Monastery type
// interface Monastery {
//   id: number;
//   name: string;
//   position: [number, number];
//   description?: string;
// }

// Monasteries data
// const monasteries: Monastery[] = [
//   { id: 1, name: 'Rumtek Monastery', position: [27.2842, 88.6133], description: 'One of the largest monasteries in Sikkim.' },
//   { id: 2, name: 'Pemayangtse Monastery', position: [27.3197, 88.2471], description: 'Ancient monastery in Pelling.' },
//   { id: 3, name: 'Tashiding Monastery', position: [27.2901, 88.3556], description: 'Important pilgrimage site.' },
//   { id: 4, name: 'Enchey Monastery', position: [27.3357, 88.6119], description: 'Located near Gangtok.' },
// ];
interface MapProps {
  monasteries: Monastery[];
}

const center: [number, number] = [27.5333, 88.6167];

const Map: React.FC<MapProps> = ({ monasteries }) => {
  return (
   <div className="bg-card rounded-lg p-6 shadow-cultural mb-8 flex flex-col lg:flex-row gap-6">
  {/* Map Section */}
  <div className="w-full lg:w-2/3 h-[300px] md:h-[500px]">
        <MapContainer
          center={center}
          zoom={9}
          className="h-full w-full rounded-2xl z-10"
          // style={{ height: "100%", width: "100%", borderRadius: "20px", zIndex: 1 }}
          scrollWheelZoom={false}
          whenCreated={(map) => {
            map.on("click", () => map.scrollWheelZoom.enable());
            map.on("mouseout", () => map.scrollWheelZoom.disable());
          }}
        >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {monasteries.map((monastery) => (
        <Marker
          key={monastery.id}
          position={[monastery.coordinates.lat, monastery.coordinates.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{monastery.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>

  {/* Right-side Cards */}
  <div className="w-full lg:w-1/3 max-h-[50vh] lg:max-h-[74vh] overflow-y-auto space-y-4">
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

export default Map;
