import React from 'react';
import { Monastery } from '@/data/monasteries';
import { MapPin, Eye, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InteractiveMapProps {
  monasteries: Monastery[];
  onMonasterySelect: (monastery: Monastery) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ monasteries, onMonasterySelect }) => {
  // Calculate center point of all monasteries
  const centerLat = monasteries.reduce((sum, m) => sum + m.coordinates.lat, 0) / monasteries.length;
  const centerLng = monasteries.reduce((sum, m) => sum + m.coordinates.lng, 0) / monasteries.length;

  return (
    <div className="bg-card rounded-lg p-6 shadow-cultural mb-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
        <MapPin className="mr-2 h-5 w-5 text-monastery-red" />
        Interactive Monastery Map
      </h3>
      
      {/* Map Container with Terrain Background */}
      <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg border border-border overflow-hidden">
        {/* Terrain Map Background */}
        <div className="absolute inset-0">
          {/* Mountain ranges background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 via-green-200/40 to-green-300/40 dark:from-blue-800/20 dark:via-green-800/20 dark:to-green-700/20">
            {/* Topographic lines pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  radial-gradient(ellipse 200px 80px at 20% 30%, transparent 30%, rgba(34, 197, 94, 0.1) 31%, rgba(34, 197, 94, 0.1) 35%, transparent 36%),
                  radial-gradient(ellipse 250px 100px at 60% 50%, transparent 30%, rgba(34, 197, 94, 0.1) 31%, rgba(34, 197, 94, 0.1) 35%, transparent 36%),
                  radial-gradient(ellipse 180px 60px at 80% 70%, transparent 30%, rgba(34, 197, 94, 0.1) 31%, rgba(34, 197, 94, 0.1) 35%, transparent 36%),
                  linear-gradient(45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%)
                `,
                backgroundSize: '300px 200px, 400px 250px, 200px 150px, 40px 40px, 40px 40px'
              }} />
            </div>
            {/* Rivers/paths */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path d="M0,150 Q100,120 200,140 T400,160" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
                <path d="M0,200 Q150,180 300,190 L400,195" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Monastery Markers */}
        <div className="relative w-full h-full">
          {monasteries.map((monastery, index) => {
            // Position markers based on relative coordinates
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
                  <div className="w-6 h-6 bg-monastery-red rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  {/* Popup on Hover */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            +
          </Button>
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            -
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 bg-monastery-red rounded-full" />
            <span>Monastery</span>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {monasteries.map((monastery) => (
          <button
            key={monastery.id}
            onClick={() => onMonasterySelect(monastery)}
            className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent hover:border-monastery-red/30 transition-colors text-left"
          >
            <MapPin className="h-4 w-4 text-monastery-red flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{monastery.name}</p>
              <p className="text-xs text-muted-foreground truncate">{monastery.location}</p>
            </div>
            <Navigation className="h-3 w-3 text-muted-foreground ml-auto flex-shrink-0" />
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        📍 {monasteries.length} monasteries • Click markers or list items for details
      </div>
    </div>
  );
};

export default InteractiveMap;