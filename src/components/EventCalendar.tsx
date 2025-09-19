import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, MapPin, Clock, Plus } from 'lucide-react';
import { culturalEvents, CulturalEvent } from '@/data/events';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { toast } from '@/hooks/use-toast';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup moment localizer
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: CulturalEvent;
}

const EventCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const { addEvent } = useTripPlanner();

  // Transform cultural events into calendar events
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return culturalEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: event.date,
      end: new Date(event.date.getTime() + 2 * 60 * 60 * 1000), // 2 hours duration
      resource: event
    }));
  }, []);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event.resource);
  };

  const handleAddToTrip = (event: CulturalEvent) => {
    addEvent({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description
    });
    
    toast({
      title: "Event Added to Trip!",
      description: `${event.title} has been added to your itinerary.`,
    });
    
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const category = event.resource.category;
    let backgroundColor = '#3174ad';
    
    switch (category) {
      case 'festival':
        backgroundColor = 'hsl(var(--monastery-red))';
        break;
      case 'ceremony':
        backgroundColor = 'hsl(var(--monastery-saffron))';
        break;
      case 'teaching':
        backgroundColor = 'hsl(var(--prayer-blue))';
        break;
      case 'cultural':
        backgroundColor = 'hsl(var(--monastery-mountain))';
        break;
      default:
        backgroundColor = 'hsl(var(--primary))';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival': return 'bg-monastery-red text-white';
      case 'ceremony': return 'bg-monastery-saffron text-foreground';
      case 'teaching': return 'bg-prayer-blue text-white';
      case 'cultural': return 'bg-monastery-mountain text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="h-[600px]">
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventStyleGetter}
                  view={view}
                  onView={setView}
                  date={date}
                  onNavigate={setDate}
                  views={[Views.MONTH, Views.WEEK, Views.DAY]}
                  className="monastery-calendar"
                />
              </div>
            </div>
            
            <div className="lg:w-80 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Event Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-monastery-red"></div>
                    <span className="text-sm">Festivals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-monastery-saffron"></div>
                    <span className="text-sm">Ceremonies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-prayer-blue"></div>
                    <span className="text-sm">Teachings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-monastery-mountain"></div>
                    <span className="text-sm">Cultural</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Upcoming Events</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {culturalEvents
                    .filter(event => event.date >= new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map(event => (
                    <Card key={event.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => setSelectedEvent(event)}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-sm">{event.title}</div>
                        <Badge className={`${getCategoryColor(event.category)} text-xs`}>
                          {event.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                        <CalendarIcon className="h-3 w-3" />
                        {event.date.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.timings}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.timings}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <Badge className={getCategoryColor(selectedEvent.category)}>
                {selectedEvent.category}
              </Badge>

              <p className="text-muted-foreground">{selectedEvent.description}</p>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => handleAddToTrip(selectedEvent)} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to My Trip
                </Button>
                <Button variant="outline" className="flex-1">
                  Mock Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style dangerouslySetInnerHTML={{
        __html: `
          .monastery-calendar {
            font-family: inherit;
          }
          .monastery-calendar .rbc-header {
            background: hsl(var(--muted));
            border: 1px solid hsl(var(--border));
            color: hsl(var(--foreground));
            font-weight: 500;
          }
          .monastery-calendar .rbc-today {
            background-color: hsl(var(--accent));
          }
          .monastery-calendar .rbc-off-range-bg {
            background: hsl(var(--muted));
          }
          .monastery-calendar .rbc-toolbar button {
            color: hsl(var(--foreground));
            border: 1px solid hsl(var(--border));
            background: hsl(var(--background));
          }
          .monastery-calendar .rbc-toolbar button:hover {
            background: hsl(var(--accent));
          }
          .monastery-calendar .rbc-toolbar button.rbc-active {
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
          }
        `
      }} />
    </div>
  );
};

export default EventCalendar;