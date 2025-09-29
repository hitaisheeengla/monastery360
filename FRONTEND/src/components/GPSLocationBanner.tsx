import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface GPSLocationBannerProps {
  currentLocation: string | null;
  isNearMonastery: boolean;
}

export const GPSLocationBanner: React.FC<GPSLocationBannerProps> = ({
  currentLocation,
  isNearMonastery
}) => {
  if (!currentLocation) return null;

  return (
    <div className="bg-gradient-to-r from-monastery-red to-monastery-mountain text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MapPin className="h-6 w-6 animate-bounce" />
            {isNearMonastery && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <p className="text-sm opacity-90">Current Location</p>
            <p className="font-semibold">
              {isNearMonastery ? `At ${currentLocation}` : `Near ${currentLocation}`}
            </p>
            <p className="text-xs opacity-80">
              {isNearMonastery ? 'You have arrived!' : '0.8 km away'}
            </p>
          </div>
        </div>
        
        {/* Mini Map Placeholder */}
        <div className="hidden sm:block w-20 h-16 bg-white/20 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-green-400/50" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg" />
          </div>
          <Navigation className="absolute bottom-1 right-1 h-3 w-3 text-white/70" />
        </div>
      </div>
    </div>
  );
};