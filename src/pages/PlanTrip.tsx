import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ItineraryManager from '@/components/ItineraryManager';
import TravelRoutes from '@/components/TravelRoutes';
import TransportInfo from '@/components/TransportInfo';
import HomestayBooking from '@/components/HomestayBooking';
import PDFExport from '@/components/PDFExport';

const PlanTrip = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your personalized monastery pilgrimage with our comprehensive trip planning tools.
            Add monasteries, plan routes, book stays, and download everything for offline access.
          </p>
        </div>

        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="itinerary">My Itinerary</TabsTrigger>
            <TabsTrigger value="routes">Travel Routes</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="homestays">Homestays</TabsTrigger>
            <TabsTrigger value="export">Download</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Monastery Itinerary</CardTitle>
                <CardDescription>
                  Manage your selected monasteries and events. Visit the Explore page to discover and add monasteries to your trip.
                </CardDescription>
              </CardHeader>
            </Card>
            <ItineraryManager />
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Travel Routes</CardTitle>
                <CardDescription>
                  Optimized routes between your selected monasteries with distance, time, and cost estimates.
                </CardDescription>
              </CardHeader>
            </Card>
            <TravelRoutes />
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <TransportInfo />
          </TabsContent>

          <TabsContent value="homestays" className="space-y-6">
            <HomestayBooking />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <PDFExport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanTrip;