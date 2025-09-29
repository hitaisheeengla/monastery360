import { createContext, useContext, useState, ReactNode } from 'react';
import { Monastery } from '@/data/monasteries';

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  monastery?: string;
}

interface TripPlannerContextType {
  savedMonasteries: Monastery[];
  savedEvents: Event[];
  addMonastery: (monastery: Monastery) => void;
  removeMonastery: (monasteryId: string) => void;
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
}

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

export const TripPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [savedMonasteries, setSavedMonasteries] = useState<Monastery[]>([]);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  const addMonastery = (monastery: Monastery) => {
    setSavedMonasteries(prev => 
      prev.find(m => m.id === monastery.id) ? prev : [...prev, monastery]
    );
  };

  const removeMonastery = (monasteryId: string) => {
    setSavedMonasteries(prev => prev.filter(m => m.id !== monasteryId));
  };

  const addEvent = (event: Event) => {
    setSavedEvents(prev => 
      prev.find(e => e.id === event.id) ? prev : [...prev, event]
    );
  };

  const removeEvent = (eventId: string) => {
    setSavedEvents(prev => prev.filter(e => e.id !== eventId));
  };

  return (
    <TripPlannerContext.Provider value={{
      savedMonasteries,
      savedEvents,
      addMonastery,
      removeMonastery,
      addEvent,
      removeEvent
    }}>
      {children}
    </TripPlannerContext.Provider>
  );
};

export const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within TripPlannerProvider');
  }
  return context;
};

export type { Event };