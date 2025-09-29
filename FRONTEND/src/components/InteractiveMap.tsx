import React from 'react';
import { Monastery } from '@/data/monasteries';
import { MapPin, Eye, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from "leaflet";


interface InteractiveMapProps {
  monasteries: Monastery[];
  filteredMonasteries: Monastery[];
  isFiltered: boolean;
  onMonasterySelect: (monastery: Monastery) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ monasteries, filteredMonasteries,
  isFiltered, onMonasterySelect }) => {
  // Calculate center point of all monasteries
  const centerLat = monasteries.reduce((sum, m) => sum + m.coordinates.lat, 0) / monasteries.length;
  const centerLng = monasteries.reduce((sum, m) => sum + m.coordinates.lng, 0) / monasteries.length;
  const center: LatLngExpression = [27.533, 88.512];

  return (
    <div className="bg-card rounded-lg p-6 shadow-cultural mb-8">
      {/* Map + Cards Layout */}
      <div className="flex gap-6">
        {/* Map Container with Terrain Background */}
         
        <div className="relative w-2/3 h-96 bg-gradient-to-br from-green-100 to-blue-100 
                  dark:from-green-900/30 dark:to-blue-900/30 rounded-lg border border-border overflow-hidden">
          {/* Monastery Markers */}
          {monasteries.map((monastery) => {
            const relativeX = ((monastery.coordinates.lng - centerLng + 0.2) / 0.4) * 100;
            const relativeY = ((centerLat - monastery.coordinates.lat + 0.1) / 0.2) * 100;

            return (
              <div
                key={monastery.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${Math.max(10, Math.min(90, relativeX))}%`,
                  top: `${Math.max(10, Math.min(90, relativeY))}%`
                }}
                onClick={() => onMonasterySelect(monastery)}
              >
                {/* Marker Pin */}
                <div className="relative">
                  <div className="w-6 h-6 bg-monastery-red rounded-full border-2 border-white shadow-lg 
                            flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Popup on Hover */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 
                            group-hover:opacity-100 transition-opacity z-10">
                    <Card className="w-48 shadow-lg">
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{monastery.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{monastery.location}</p>
                        <p className="text-xs mb-3 line-clamp-2">{monastery.description}</p>
                        <Button size="sm" className="w-full text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">+</Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">-</Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-monastery-red rounded-full" />
              <span>Monastery</span>
            </div>
          </div>
        </div>

        {/* Right-side Cards */}
        <div className="w-1/3 h-96 overflow-y-auto space-y-4">
          {monasteries.map((monastery) => (
            <Card
              key={monastery.id}
              className="shadow-md cursor-pointer hover:border-monastery-red/40 transition"
              onClick={() => onMonasterySelect(monastery)}
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
      <div className="mt-4 text-sm text-muted-foreground text-center">
        📍 {monasteries.length} monasteries • Click markers or list items for details
      </div>
    </div>
  );
};

export default InteractiveMap;