import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Trash2, GripVertical, Plus, Clock } from 'lucide-react';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { format } from 'date-fns';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable item component for monasteries
const SortableMonasteryItem = ({ monastery, index, onRemove }: { 
  monastery: any; 
  index: number; 
  onRemove: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: monastery.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </div>
        
        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
          {index + 1}
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{monastery.name}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            {monastery.location}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">{monastery.era}</Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              2-3 hrs visit
            </Badge>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(monastery.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ItineraryManager = () => {
  const { savedMonasteries, savedEvents, removeMonastery, removeEvent } = useTripPlanner();
  const [monasteries, setMonasteries] = useState(savedMonasteries);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update local state when savedMonasteries changes
  React.useEffect(() => {
    setMonasteries(savedMonasteries);
  }, [savedMonasteries]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setMonasteries((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const organizeByDays = () => {
    const days: any[] = [];
    let currentDay: any[] = [];
    
    monasteries.forEach((monastery, index) => {
      if (index > 0 && index % 3 === 0) {
        days.push(currentDay);
        currentDay = [monastery];
      } else {
        currentDay.push(monastery);
      }
    });
    
    if (currentDay.length > 0) {
      days.push(currentDay);
    }
    
    return days;
  };

  if (savedMonasteries.length === 0 && savedEvents.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Your itinerary is empty</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring monasteries and events to build your perfect spiritual journey!
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/explore'}>
              Explore Monasteries
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const dayPlans = organizeByDays();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="days">Day-wise Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {monasteries.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Monasteries ({monasteries.length})
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Drag to reorder
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={monasteries.map(m => m.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {monasteries.map((monastery, index) => (
                        <SortableMonasteryItem
                          key={monastery.id}
                          monastery={monastery}
                          index={index}
                          onRemove={removeMonastery}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                {monasteries.length > 0 && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Estimated total travel time: {monasteries.length * 2.5}+ hours
                      </span>
                      <Badge variant="outline">
                        {monasteries.length} {monasteries.length === 1 ? 'stop' : 'stops'}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {savedEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Events & Festivals ({savedEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedEvents.map((event, index) => (
                  <div key={event.id} className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-monastery-saffron text-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                          E
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span className="text-sm text-muted-foreground">
                              {format(event.date, 'PPP')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEvent(event.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="days" className="space-y-6">
          {dayPlans.map((dayMonasteries, dayIndex) => (
            <Card key={dayIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Day {dayIndex + 1}
                  <Badge variant="secondary" className="ml-2">
                    {dayMonasteries.length} {dayMonasteries.length === 1 ? 'stop' : 'stops'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dayMonasteries.map((monastery: any, index: number) => (
                  <div key={monastery.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{monastery.name}</h4>
                      <p className="text-sm text-muted-foreground">{monastery.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      2-3 hrs
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ItineraryManager;