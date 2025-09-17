import React from 'react';
import { Monastery } from '@/data/monasteries';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  monasteries: Monastery[];
  onMonasterySelect: (monastery: Monastery) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ monasteries, onMonasterySelect }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-cultural mb-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Interactive Map</h3>
      
      {/* Placeholder Map Container */}
      <div className="relative w-full h-96 bg-gradient-to-br from-monastery-mountain/20 to-prayer-blue/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">Interactive Monastery Map</p>
          <p className="text-muted-foreground mb-4">Google Maps integration coming soon</p>
          
          {/* Monastery Pins Simulation */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {monasteries.map((monastery) => (
              <button
                key={monastery.id}
                onClick={() => onMonasterySelect(monastery)}
                className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 text-monastery-red" />
                <div className="text-left">
                  <p className="font-medium text-sm">{monastery.name}</p>
                  <p className="text-xs text-muted-foreground">{monastery.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;