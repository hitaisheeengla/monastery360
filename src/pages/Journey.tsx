import React, { useState, useEffect } from 'react';
import { GPSLocationBanner } from '@/components/GPSLocationBanner';
import { AudioGuide } from '@/components/AudioGuide';
import { NearbySuggestions } from '@/components/NearbySuggestions';
import { EmergencyBar } from '@/components/EmergencyBar';
import { NotificationSystem } from '@/components/NotificationSystem';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Journey = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isNearMonastery, setIsNearMonastery] = useState(false);

  // Mock GPS detection
  const mockGPSDetection = () => {
    setCurrentLocation("Rumtek Monastery");
    setIsNearMonastery(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 8000);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <GPSLocationBanner 
        currentLocation={currentLocation}
        isNearMonastery={isNearMonastery}
      />
      
      <div className="container mx-auto px-4 py-4 pb-24">
        {/* Mock GPS Button for Demo */}
        {!currentLocation && (
          <div className="text-center mb-6">
            <Button 
              onClick={mockGPSDetection}
              className="bg-monastery-red hover:bg-monastery-red/90 text-white"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Mock GPS Detection
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Click to simulate arriving at Rumtek Monastery
            </p>
          </div>
        )}

        <AudioGuide isNearMonastery={isNearMonastery} />
        
        <NearbySuggestions currentLocation={currentLocation} />
      </div>

      <NotificationSystem 
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      
      <EmergencyBar />
    </div>
  );
};

export default Journey;