import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, MapPin, Clock, Star } from 'lucide-react';
import { Monastery } from '@/data/monasteries';
import { Event } from '@/hooks/useTripPlanner';

interface JourneyTimelineProps {
  monasteries: Monastery[];
  events: Event[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  monasteries,
  events,
  currentStep,
  onStepClick
}) => {
  const totalSteps = monasteries.length;
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Journey Progress</h3>
        <Badge variant="outline">
          {currentStep} of {totalSteps} completed
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-monastery-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Journey Steps */}
      <div className="space-y-4">
        {monasteries.map((monastery, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const estimatedTime = `${(index + 1) * 45}min`;
          
          return (
            <div key={monastery.id} className="relative">
              <div className="flex items-start space-x-4">
                {/* Step Indicator */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-primary text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < monasteries.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-6">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto justify-start hover:bg-transparent"
                    onClick={() => onStepClick(index)}
                  >
                    <div className="text-left w-full">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="h-4 w-4 text-monastery-red" />
                        <h4 className={`font-semibold ${
                          isCurrent ? 'text-primary' : ''
                        }`}>
                          {monastery.name}
                        </h4>
                        {isCurrent && (
                          <Badge variant="secondary">Current</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {monastery.location} • {monastery.era}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Est. {estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>Audio guide available</span>
                        </div>
                      </div>
                    </div>
                  </Button>

                  {/* Related Events */}
                  {events.filter(event => event.monastery === monastery.name).length > 0 && (
                    <div className="mt-3 pl-6">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Events at this location:
                      </div>
                      {events
                        .filter(event => event.monastery === monastery.name)
                        .slice(0, 1)
                        .map(event => (
                          <div key={event.id} className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-monastery-gold rounded-full" />
                            <span className="text-monastery-gold font-medium">
                              {event.title}
                            </span>
                            <span className="text-muted-foreground">
                              {event.date.toLocaleDateString()}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Journey Summary */}
      {monasteries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No monasteries in your itinerary</p>
          <p className="text-xs mt-1">Add monasteries from the Plan Trip page to start your journey</p>
        </div>
      )}
    </Card>
  );
};