import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Volume2, Navigation, Clock, MapPin, IndianRupee } from 'lucide-react';

interface NotificationSystemProps {
  show: boolean;
  onClose: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  show,
  onClose
}) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-40 animate-slide-in-right">
      <div className="bg-monastery-red text-white rounded-lg shadow-2xl p-4 border border-monastery-red/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 animate-bounce" />
            <span className="font-semibold">You're near Rumtek Monastery!</span>
          </div>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <IndianRupee className="h-4 w-4 mr-2" />
            <span>Entry fee: ₹50 per person</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>Special event today at 3:00 PM - Cham Dance</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="flex-1 bg-white text-monastery-red hover:bg-white/90 font-medium"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Start Audio Guide
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-white text-white hover:bg-white/20"
          >
            <Navigation className="h-4 w-4 mr-2" />
            View Directions
          </Button>
        </div>
      </div>
    </div>
  );
};