import React from 'react';
import EventCalendar from '@/components/EventCalendar';
import FloatingTourGuideButton from '@/components/FloatingTourGuideButton';

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">Events & Cultural Calendar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Discover authentic festivals, sacred ceremonies, and cultural events happening throughout the year 
            at Sikkim's monasteries. Plan your visit to experience these spiritual celebrations.
          </p>
        </div>
        
        <EventCalendar />
        <FloatingTourGuideButton
      />
      </div>
    </div>
  );
};

export default Events;