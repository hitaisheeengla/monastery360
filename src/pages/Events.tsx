import React from 'react';
import EventCalendar from '@/components/EventCalendar';

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Events & Cultural Calendar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic festivals, sacred ceremonies, and cultural events happening throughout the year 
            at Sikkim's monasteries. Plan your visit to experience these spiritual celebrations.
          </p>
        </div>
        
        <EventCalendar />
      </div>
    </div>
  );
};

export default Events;