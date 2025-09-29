import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Phone, Shield, Cross, MapPin, Navigation, Heart, AlertTriangle, X, Zap } from 'lucide-react';

export const FloatingEmergencyButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [isLocationSharing, setIsLocationSharing] = useState(false);

  const emergencyContacts = [
    {
      id: 'ambulance',
      icon: Cross,
      label: 'Medical Emergency',
      number: '108',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Emergency Medical Services',
      priority: 'high'
    },
    {
      id: 'tourist-helpline',
      icon: Phone,
      label: 'Tourist Helpline',
      number: '+91-3592-202-665',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: '24/7 Tourist Support',
      priority: 'medium'
    },
    {
      id: 'police',
      icon: Shield,
      label: 'Police Emergency',
      number: '100',
      color: 'bg-gray-700 hover:bg-gray-800',
      description: 'Police & Security',
      priority: 'high'
    },
    {
      id: 'fire',
      icon: AlertTriangle,
      label: 'Fire Department',
      number: '101',
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Fire & Rescue Services',
      priority: 'high'
    }
  ];

  const quickActions = [
    {
      id: 'share-location',
      icon: MapPin,
      label: 'Share Location',
      action: () => shareCurrentLocation(),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'emergency-alert',
      icon: AlertTriangle,
      label: 'Send SOS',
      action: () => sendEmergencyAlert(),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'directions-hospital',
      icon: Navigation,
      label: 'Nearest Hospital',
      action: () => findNearestHospital(),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock reverse geocoding
          setCurrentLocation('Near Rumtek Monastery, Gangtok');
        },
        (error) => {
          setCurrentLocation('Location unavailable');
        }
      );
    }
  }, []);

  // Monitor battery level (mock)
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(prev - 0.1, 0));
    }, 60000); // Decrease by 0.1% every minute (mock)
    return () => clearInterval(interval);
  }, []);

  const handleEmergencyCall = (contact: typeof emergencyContacts[0]) => {
    // In a real app, this would initiate actual phone call
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    
    const confirmation = confirm(
      `Emergency Call\n\nCalling: ${contact.label}\nNumber: ${contact.number}\n\nYour location: ${currentLocation}\n\nProceed with call?`
    );
    
    if (confirmation) {
      // Log emergency call for safety
      console.log(`Emergency call initiated: ${contact.label} - ${contact.number}`);
      alert(`Calling ${contact.label}: ${contact.number}\n\nLocation shared: ${currentLocation}`);
    }
  };

  const shareCurrentLocation = () => {
    setIsLocationSharing(true);
    if (navigator.share) {
      navigator.share({
        title: 'My Current Location - Emergency',
        text: `I need assistance. My current location: ${currentLocation}`,
        url: `https://maps.google.com/?q=27.2846,88.5594`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(`Emergency: My location is ${currentLocation} - https://maps.google.com/?q=27.2846,88.5594`);
      alert('Location copied to clipboard');
    }
    setTimeout(() => setIsLocationSharing(false), 2000);
  };

  const sendEmergencyAlert = () => {
    // Mock SOS functionality
    const contacts = ['Emergency Services', 'Family Contact', 'Travel Insurance'];
    alert(`SOS Alert Sent!\n\nNotified:\n${contacts.join('\n')}\n\nLocation: ${currentLocation}\nTime: ${new Date().toLocaleString()}`);
  };

  const findNearestHospital = () => {
    alert(`Directions to nearest medical facility:\n\nSIMS Hospital, Gangtok\nDistance: 8.2 km\nETA: 15 minutes\n\nTapping OK will open navigation...`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <Card className="mb-4 w-80 shadow-2xl border-red-200 bg-white">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-red-600">Emergency Services</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0 hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Location & Status */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Current Location</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  {batteryLevel.toFixed(0)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{currentLocation}</p>
            </div>

            {/* Quick Actions */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Quick Actions</h4>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.id}
                      onClick={action.action}
                      className={`${action.color} text-white justify-start h-auto py-2`}
                      disabled={action.id === 'share-location' && isLocationSharing}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      <span className="text-sm">{action.label}</span>
                      {action.id === 'share-location' && isLocationSharing && (
                        <div className="ml-auto w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator className="mb-4" />

            {/* Emergency Contacts */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Emergency Contacts</h4>
              <div className="space-y-2">
                {emergencyContacts.map((contact) => {
                  const IconComponent = contact.icon;
                  return (
                    <Button
                      key={contact.id}
                      onClick={() => handleEmergencyCall(contact)}
                      className={`${contact.color} text-white w-full justify-start h-auto py-3 px-3`}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <IconComponent className="h-5 w-5" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{contact.label}</div>
                          <div className="text-xs opacity-90">{contact.number}</div>
                        </div>
                        {contact.priority === 'high' && (
                          <Badge className="bg-white/20 text-white text-xs">
                            Priority
                          </Badge>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-muted-foreground text-center">
                🚨 For life-threatening emergencies, call 108 immediately
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Emergency Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isExpanded 
            ? 'bg-red-600 hover:bg-red-700 scale-110' 
            : 'bg-red-500 hover:bg-red-600 hover:scale-105'
        } text-white`}
      >
        {isExpanded ? (
          <X className="h-8 w-8" />
        ) : (
          <div className="relative">
            <Phone className="h-8 w-8" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <Cross className="h-2 w-2 text-red-500" />
            </div>
          </div>
        )}
      </Button>
    </div>
  );
};