import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ItineraryManager from '@/components/ItineraryManager';
import TravelRoutes from '@/components/TravelRoutes';
import TransportInfo from '@/components/TransportInfo';
import HomestayBooking from '@/components/HomestayBooking';
import PDFExport from '@/components/PDFExport';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { useTripPlanner } from '@/hooks/useTripPlanner';
import { MapPin, Route, Car, Home, Download, Sparkles, Calendar, Users } from 'lucide-react';

const PlanTrip = () => {
  const { savedMonasteries, savedEvents } = useTripPlanner();
  const [activeTab, setActiveTab] = useState('itinerary');
  
  const totalItems = savedMonasteries.length + savedEvents.length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="container mx-auto px-4 py-12 max-w-6xl relative">
          <div className="text-center  animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                Plan Your Perfect Trip
              </h1>
              <Sparkles className="h-8 w-8 text-amber-400 animate-pulse" />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create your personalized monastery pilgrimage with our comprehensive trip planning tools.
              Add monasteries, plan routes, book stays, and download everything.
            </p>
            

          </div>
        </div>
      </div>

        {/* Enhanced Tabs Section */}
        <div className="container mx-auto px-4 max-w-6xl mt-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border/50 shadow-cultural">
              <TabsList className="grid w-full grid-cols-5 bg-transparent gap-1">
                <TabsTrigger 
                  value="itinerary" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-monastery flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-primary/10"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">My Itinerary</span>
                  <span className="sm:hidden">Itinerary</span>
                  {totalItems > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </TabsTrigger>
                
                <TabsTrigger 
                  value="routes" 
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-cultural flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-accent/10"
                >
                  <Route className="h-4 w-4" />
                  <span className="hidden sm:inline">Travel Routes</span>
                  <span className="sm:hidden">Routes</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="transport" 
                  className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-cultural flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-secondary/10"
                >
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Transport</span>
                  <span className="sm:hidden">Transport</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="homestays" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-monastery flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-primary/10"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Homestays</span>
                  <span className="sm:hidden">Stays</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="export" 
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-cultural flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-accent/10"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">Download</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="itinerary" className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-monastery">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        Your Monastery Itinerary
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        Manage your selected monasteries and events. Visit the Explore page to discover and add monasteries to your trip.
                      </CardDescription>
                    </div>
                    {totalItems > 0 && (
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{totalItems}</div>
                        <div className="text-sm text-muted-foreground">Total Items</div>
                      </div>
                    )}
                  </div>
                  <Separator className="mt-4" />
                </CardHeader>
              </Card>
              <div className="animate-fade-in">
                <ItineraryManager />
              </div>
            </TabsContent>

            <TabsContent value="routes" className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-accent/20 shadow-cultural">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Route className="h-6 w-6 text-accent" />
                    Suggested Travel Routes
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Optimized routes between your selected monasteries with distance, time, and cost estimates.
                  </CardDescription>
                  <Separator className="mt-4" />
                </CardHeader>
              </Card>
              <div className="animate-fade-in">
                <TravelRoutes />
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card via-card to-secondary/5 border-secondary/20 shadow-cultural mb-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Car className="h-6 w-6 text-secondary" />
                    Transport Information
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Complete guide to transportation options, contacts, and booking information for your monastery visits.
                  </CardDescription>
                  <Separator className="mt-4" />
                </CardHeader>
              </Card>
              <div className="animate-fade-in">
                <TransportInfo />
              </div>
            </TabsContent>

            <TabsContent value="homestays" className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-monastery mb-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Home className="h-6 w-6 text-primary" />
                    Homestay Booking
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Discover and book authentic homestays near monasteries for an immersive cultural experience.
                  </CardDescription>
                  <Separator className="mt-4" />
                </CardHeader>
              </Card>
              <div className="animate-fade-in">
                <HomestayBooking />
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-accent/20 shadow-cultural mb-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Download className="h-6 w-6 text-accent" />
                    Download Complete Package
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Get your complete offline travel package with maps, contacts, and detailed itinerary information.
                  </CardDescription>
                  <Separator className="mt-4" />
                </CardHeader>
              </Card>
              <div className="animate-fade-in">
                <PDFExport />
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};

export default PlanTrip;