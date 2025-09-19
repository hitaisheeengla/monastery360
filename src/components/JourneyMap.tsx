import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, Car, MapPin, Clock, Route } from 'lucide-react';
import { Monastery } from '@/data/monasteries';

interface JourneyMapProps {
  monasteries: Monastery[];
  currentLocation: { lat: number; lng: number } | null;
  travelMode: 'driving' | 'walking';
  onTravelModeChange: (mode: 'driving' | 'walking') => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  monasteries,
  currentLocation,
  travelMode,
  onTravelModeChange
}) => {
  const [routeInfo, setRouteInfo] = useState({
    totalDistance: '45.2 km',
    totalDuration: '1h 23m',
    nextDestination: monasteries[0]?.name || 'No destination',
    eta: '2:45 PM'
  });

  // Mock route calculation
  useEffect(() => {
    if (monasteries.length > 0) {
      const distances = travelMode === 'driving' ? [15, 12, 18] : [8, 6, 10];
      const durations = travelMode === 'driving' ? ['25m', '20m', '30m'] : ['45m', '35m', '55m'];
      
      setRouteInfo({
        totalDistance: `${distances.reduce((a, b) => a + b, 0)} km`,
        totalDuration: travelMode === 'driving' ? '1h 15m' : '2h 15m',
        nextDestination: monasteries[0]?.name || 'No destination',
        eta: travelMode === 'driving' ? '2:45 PM' : '4:15 PM'
      });
    }
  }, [monasteries, travelMode]);

  return (
    <div className="space-y-4">
      {/* Travel Mode Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Journey Route</h3>
          <div className="flex space-x-2">
            <Button
              variant={travelMode === 'driving' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTravelModeChange('driving')}
              className="flex items-center space-x-2"
            >
              <Car className="h-4 w-4" />
              <span>Drive</span>
            </Button>
            <Button
              variant={travelMode === 'walking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTravelModeChange('walking')}
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
            <div className="text-2xl font-bold text-primary">{routeInfo.totalDistance}</div>
            <div className="text-sm text-muted-foreground">Total Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{routeInfo.totalDuration}</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{monasteries.length}</div>
            <div className="text-sm text-muted-foreground">Stops</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{routeInfo.eta}</div>
            <div className="text-sm text-muted-foreground">ETA</div>
          </div>
        </div>
      </Card>

      {/* Mock Map Container */}
      <Card className="p-0 overflow-hidden">
        <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              {/* Mock roads */}
              <path d="M0,150 Q100,100 200,150 T400,150" stroke="#666" strokeWidth="2" fill="none" />
              <path d="M50,0 L50,300" stroke="#666" strokeWidth="1" fill="none" />
              <path d="M200,0 L200,300" stroke="#666" strokeWidth="1" fill="none" />
              <path d="M350,0 L350,300" stroke="#666" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Current Location */}
          {currentLocation && (
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg border-2 border-white" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
                You
              </div>
            </div>
          )}

          {/* Monastery Markers */}
          {monasteries.slice(0, 3).map((monastery, index) => (
            <div
              key={monastery.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                index === 0 ? 'top-1/3 right-1/4' : 
                index === 1 ? 'top-2/3 left-1/2' : 'top-1/4 right-1/3'
              }`}
            >
              <div className="relative">
                <MapPin className="w-6 h-6 text-monastery-red fill-current" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded shadow max-w-20 text-center">
                  {monastery.name.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M100,150 Q200,100 300,120 T380,100"
              stroke="#dc2626"
              strokeWidth="3"
              strokeDasharray="5,5"
              fill="none"
              className="animate-pulse"
            />
          </svg>

          {/* Next Turn Indicator */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <Route className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Next: Turn right</div>
                <div className="text-muted-foreground">in 800m on NH10</div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="absolute top-4 left-4 right-4">
            <Card className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {travelMode === 'driving' ? 'Driving' : 'Walking'} to {routeInfo.nextDestination}
                  </span>
                </div>
                <Badge variant="secondary">ETA: {routeInfo.eta}</Badge>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Route Instructions */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Step-by-Step Directions</h4>
        <div className="space-y-3">
          {[
            { instruction: "Head northeast on MG Road", distance: "1.2 km", duration: "3 min" },
            { instruction: "Turn right onto NH10 toward Ranka", distance: "8.5 km", duration: "12 min" },
            { instruction: "Continue straight to Rumtek Monastery", distance: "5.3 km", duration: "8 min" }
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{step.instruction}</div>
                <div className="text-sm text-muted-foreground">
                  {step.distance} • {step.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};