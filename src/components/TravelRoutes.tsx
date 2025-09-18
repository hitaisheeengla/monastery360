import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Route, Clock, MapPin, Navigation, Zap, DollarSign, Map } from 'lucide-react';
import { useTripPlanner } from '@/hooks/useTripPlanner';

interface RouteInfo {
  from: string;
  to: string;
  distance: string;
  duration: string;
  transport: 'taxi' | 'bus' | 'walk';
  cost: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  highlights: string[];
  mapUrl?: string;
}

interface OptimizedRoute {
  name: string;
  description: string;
  monasteries: string[];
  totalDistance: string;
  totalDuration: string;
  totalCost: string;
  bestFor: string;
}

const TravelRoutes = () => {
  const { savedMonasteries } = useTripPlanner();
  const [selectedRoute, setSelectedRoute] = useState<'direct' | 'scenic' | 'budget'>('direct');

  // Generate suggested routes based on saved monasteries
  const generateRoutes = (): RouteInfo[] => {
    if (savedMonasteries.length < 2) return [];

    const routes: RouteInfo[] = [];
    for (let i = 0; i < savedMonasteries.length - 1; i++) {
      const from = savedMonasteries[i];
      const to = savedMonasteries[i + 1];
      
      // Mock route calculation with enhanced data
      routes.push({
        from: from.name,
        to: to.name,
        distance: '15-25 km',
        duration: '45-60 mins',
        transport: 'taxi',
        cost: '₹800-1200',
        difficulty: 'moderate',
        highlights: ['Scenic mountain views', 'Traditional villages', 'Prayer wheels along route'],
        mapUrl: `https://via.placeholder.com/400x200/e2e8f0/64748b?text=${encodeURIComponent(from.name + ' → ' + to.name)}`
      });
    }
    return routes;
  };

  // Generate optimized route options
  const generateOptimizedRoutes = (): OptimizedRoute[] => {
    if (savedMonasteries.length < 2) return [];

    return [
      {
        name: 'Direct Route',
        description: 'Fastest route covering all selected monasteries',
        monasteries: savedMonasteries.map(m => m.name),
        totalDistance: `${savedMonasteries.length * 18} km`,
        totalDuration: `${savedMonasteries.length * 50} mins`,
        totalCost: `₹${savedMonasteries.length * 900}`,
        bestFor: 'Time-conscious travelers'
      },
      {
        name: 'Scenic Route', 
        description: 'Beautiful mountain roads with photo stops',
        monasteries: [...savedMonasteries.map(m => m.name), 'Viewpoints'],
        totalDistance: `${savedMonasteries.length * 25} km`,
        totalDuration: `${Math.ceil(savedMonasteries.length * 75)} mins`,
        totalCost: `₹${savedMonasteries.length * 1200}`,
        bestFor: 'Photography enthusiasts'
      },
      {
        name: 'Budget Route',
        description: 'Shared transport and walking where possible',
        monasteries: savedMonasteries.map(m => m.name),
        totalDistance: `${savedMonasteries.length * 15} km`,
        totalDuration: `${Math.ceil(savedMonasteries.length * 90)} mins`,
        totalCost: `₹${savedMonasteries.length * 400}`,
        bestFor: 'Budget travelers'
      }
    ];
  };

  const routes = generateRoutes();
  const optimizedRoutes = generateOptimizedRoutes();

  const transportIcon = (transport: string) => {
    switch (transport) {
      case 'taxi': return '🚗';
      case 'bus': return '🚌';
      case 'walk': return '🚶';
      default: return '🚗';
    }
  };

  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (routes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Suggested Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Add at least 2 monasteries to your itinerary to see suggested travel routes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="optimized" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="optimized">Route Options</TabsTrigger>
          <TabsTrigger value="detailed">Step-by-Step</TabsTrigger>
        </TabsList>

        <TabsContent value="optimized" className="space-y-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Optimized Route Plans
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap w-full gap-5">
              {optimizedRoutes.map((route, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all md:w-full lg:w-[49%] ${
                    selectedRoute === ['direct', 'scenic', 'budget'][index] 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRoute(['direct', 'scenic', 'budget'][index] as any)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {route.name}
                        {index === 0 && <Badge variant="secondary">Recommended</Badge>}
                      </h4>
                      <p className="text-sm text-muted-foreground">{route.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Best for: {route.bestFor}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-xl text-primary">{route.totalCost}</div>
                      <div className="text-xs text-muted-foreground">{route.totalDuration}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-muted rounded">
                      <MapPin className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{route.totalDistance}</div>
                      <div className="text-xs text-muted-foreground">Distance</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{route.totalDuration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <DollarSign className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <div className="text-sm font-medium">{route.totalCost}</div>
                      <div className="text-xs text-muted-foreground">Cost</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {route.monasteries.slice(0, 4).map((monastery, mIndex) => (
                      <Badge key={mIndex} variant="outline" className="text-xs">
                        {monastery}
                      </Badge>
                    ))}
                    {route.monasteries.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{route.monasteries.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant={selectedRoute === ['direct', 'scenic', 'budget'][index] ? "default" : "outline"}
                      className="flex-1"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      {selectedRoute === ['direct', 'scenic', 'budget'][index] ? 'Selected' : 'Select Route'}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Map className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4 ">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Step-by-Step Routes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {routes.map((route, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  {/* Mock embedded map */}
                  <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={route.mapUrl} 
                      alt={`Route from ${route.from} to ${route.to}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="text-2xl">{transportIcon(route.transport)}</span>
                        {route.from} → {route.to}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <div className="font-medium">{route.distance}</div>
                      <div className="text-xs text-muted-foreground">Distance</div>
                    </div>
                    <div className="text-center">
                      <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <div className="font-medium">{route.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center">
                      <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <div className="font-medium">{route.cost}</div>
                      <div className="text-xs text-muted-foreground">Cost</div>
                    </div>
                    <div className="text-center">
                      <Badge 
                        className={`${difficultyColor(route.difficulty)} mx-auto`}
                        variant="secondary"
                      >
                        {route.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Route Highlights</h5>
                    <div className="flex flex-wrap gap-2">
                      {route.highlights.map((highlight, hIndex) => (
                        <Badge key={hIndex} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Map className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Pro Travel Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Best Travel Times</h5>
                  <p className="text-sm text-muted-foreground">Start early (7-8 AM) to avoid traffic and enjoy peaceful monastery visits</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Mountain Roads</h5>
                  <p className="text-sm text-muted-foreground">Weather can change quickly - carry warm clothes and rain gear</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Smart Booking</h5>
                  <p className="text-sm text-muted-foreground">Book taxis in advance for better rates and guaranteed availability</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Navigation className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium">Emergency Preparedness</h5>
                  <p className="text-sm text-muted-foreground">Keep offline maps downloaded and cash for remote areas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelRoutes;