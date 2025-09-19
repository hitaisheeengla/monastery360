import React, { useState, useEffect } from 'react';
import { GPSLocationBanner } from '@/components/GPSLocationBanner';
import { AudioGuide } from '@/components/AudioGuide';
import { FloatingEmergencyButton } from '@/components/FloatingEmergencyButton';
import { NotificationSystem } from '@/components/NotificationSystem';
import { JourneyMap } from '@/components/JourneyMap';
import { JourneyTimeline } from '@/components/JourneyTimeline';
import { ContextualSuggestions } from '@/components/ContextualSuggestions';
import { SmallWeatherModal } from '@/components/JourneyWeather';
import { JourneyStats } from '@/components/JourneyStats';
import { PhotoJournal } from '@/components/PhotoJournal';
// import { NearbyAmenities } from '@/components/NearByAmenities';
import { CulturalTips } from '@/components/CulturalTips';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Play, Pause,Headphones, Share, FileText, BarChart3, Camera, Compass, Book } from 'lucide-react';
import { BookingStatus } from '@/components/Booking';

const Journey = () => {
  const { savedMonasteries, savedEvents } = useTripPlanner();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [currentLocationName, setCurrentLocationName] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isNearMonastery, setIsNearMonastery] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving');
  const [isJourneyActive, setIsJourneyActive] = useState(false);

  // Mock GPS detection
  const mockGPSDetection = () => {
    setCurrentLocation({ lat: 27.2846, lng: 88.5594 }); // Rumtek coordinates
    setCurrentLocationName("Rumtek Monastery");
    setIsNearMonastery(true);
    setShowNotification(true);
    setIsJourneyActive(true);
    setTimeout(() => setShowNotification(false), 8000);
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleStartJourney = () => {
  if (savedMonasteries.length < 2) {
    alert("Please add at least 2 monasteries to your trip planner to begin the journey!");
    return;
  }
  setIsJourneyActive(true);
  mockGPSDetection();
};

  const currentDestination = savedMonasteries[currentStep] || null;
  const nextDestination = savedMonasteries[currentStep + 1] || null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Journey Status Header */}
      <GPSLocationBanner 
        currentLocation={currentLocationName}
        isNearMonastery={isNearMonastery}
      />
      
      {/* Journey Control Bar */}
      {isJourneyActive && (
        <div className="bg-primary text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Journey Active
              </Badge>
              <div className="text-sm">
                {currentDestination ? `En route to ${currentDestination.name}` : 'Journey Complete'}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <FileText className="mr-2 h-4 w-4" />
                Summary
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-4 pb-24">
        {!isJourneyActive ? (
          /* Pre-Journey State */
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                {savedMonasteries.length > 0 
                  ? `Your itinerary includes ${savedMonasteries.length} monasteries and ${savedEvents.length} events.`
                  : 'Add monasteries to your trip planner to begin your spiritual journey.'
                }
              </p>
              
              {savedMonasteries.length > 0 ? (
                <Button 
                  onClick={handleStartJourney}
                  size="lg"
                  className="bg-monastery-red hover:bg-monastery-red/90 text-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Journey
                </Button>
              ) : (
                <Button 
                  onClick={mockGPSDetection}
                  size="lg"
                  variant="outline"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Demo Journey (Mock GPS)
                </Button>
              )}
            </Card>

            {savedMonasteries.length > 0 && (
              <JourneyTimeline
                monasteries={savedMonasteries}
                events={savedEvents}
                currentStep={0}
                onStepClick={handleStepClick}
              />
            )}
          </div>
        ) : (
          /* Active Journey State */
          <div className="space-y-6">
            {/* Enhanced Journey Dashboard */}
            <Tabs defaultValue="journey" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="journey" className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Journey</span>
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center space-x-1">
                  <Headphones className="h-4 w-4" />
                  <span className="hidden sm:inline">Audio Guide</span>
                </TabsTrigger>
                <TabsTrigger value="explore" className="flex items-center space-x-1">
                  <Compass className="h-4 w-4" />
                  <span className="hidden sm:inline">Your Bookings</span>
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center space-x-1">
                  <Book className="h-4 w-4" />
                  <span className="hidden sm:inline">Tips</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Map and Navigation */}
                  <div className="lg:col-span-2 space-y-6">
                    <JourneyMap
                      monasteries={savedMonasteries}
                      currentLocation={currentLocation}
                      travelMode={travelMode}
                      onTravelModeChange={setTravelMode}
                    />

                  </div>

                  {/* Right Column - Timeline and Suggestions */}
                  <div className="space-y-6"> 
                    <SmallWeatherModal />
                    <ContextualSuggestions
                      currentDestination={currentDestination}
                      nextDestination={nextDestination}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <JourneyTimeline
                    monasteries={savedMonasteries}
                    events={savedEvents}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                  />
                  <JourneyStats />

                </div>
              </TabsContent> */}

              <TabsContent value="photos" className="space-y-6">
                <div className="flex justify-center items-center">
                  <AudioGuide 
                    isNearMonastery={isNearMonastery} 
                    currentMonastery={currentDestination}
                  />
                </div>
              </TabsContent>

              <TabsContent value="explore" className="space-y-6">
                <div className="flex justify-center items-center">
                  <BookingStatus
                        booking={{
                          id: 'b123',
                          hotelName: 'Heritage Homestay',
                          type: 'Homestay',
                          location: 'Gangtok',
                          rating: 4.5,
                          checkIn: '20 Sept, 2025',
                          checkOut: '22 Sept, 2025',
                          phone: '+91-3592-234-567',
                          status: 'Confirmed'
                        }}
                    />

                </div>
              </TabsContent>

              <TabsContent value="tips" className="space-y-6">
                <div className="flex justify-center items-center">
                  <CulturalTips />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <NotificationSystem 
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      
      <FloatingEmergencyButton />
    </div>
  );
};

export default Journey;