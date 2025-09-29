import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Bus, Phone, MapPin, Clock } from 'lucide-react';

interface TransportOption {
  type: 'taxi' | 'bus' | 'shared-taxi';
  name: string;
  contact: string;
  routes: string[];
  cost: string;
  availability: string;
  features: string[];
}

const TransportInfo = () => {
  const transportOptions: TransportOption[] = [
    {
      type: 'taxi',
      name: 'Sikkim Taxi Union',
      contact: '+91 9876543210',
      routes: ['Gangtok ↔ All Monasteries', 'Airport Transfers', 'Custom Tours'],
      cost: '₹12-15/km',
      availability: '24/7',
      features: ['GPS Tracking', 'English Speaking Drivers', 'Mountain Experienced']
    },
    {
      type: 'shared-taxi',
      name: 'Shared Cab Service',
      contact: '+91 9876543211',
      routes: ['Gangtok → Pelling', 'Gangtok → Namchi', 'Popular Monastery Routes'],
      cost: '₹150-300/person',
      availability: '6 AM - 8 PM',
      features: ['Fixed Routes', 'Budget Friendly', 'Regular Schedule']
    },
    {
      type: 'bus',
      name: 'Sikkim Transport',
      contact: '+91 9876543212',
      routes: ['Major Town Connections', 'Limited Monastery Access'],
      cost: '₹50-150/person',
      availability: '6 AM - 6 PM',
      features: ['Government Service', 'Very Economical', 'Fixed Schedule']
    }
  ];

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'taxi': return <Car className="h-5 w-5" />;
      case 'shared-taxi': return <Car className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'taxi': return 'Private Taxi';
      case 'shared-taxi': return 'Shared Taxi';
      case 'bus': return 'Public Bus';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transport Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-5">
          {transportOptions.map((option, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4 md:w-full lg:w-[49%]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTransportIcon(option.type)}
                  <div>
                    <h4 className="font-semibold">{option.name}</h4>
                    <Badge variant="secondary">{getTypeLabel(option.type)}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{option.cost}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {option.availability}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium mb-2">Available Routes:</h5>
                  <div className="flex flex-wrap gap-2">
                    {option.routes.map((route, routeIndex) => (
                      <Badge key={routeIndex} variant="outline" className="text-xs">
                        {route}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Features:</h5>
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} className="text-xs bg-monastery-saffron/20 text-foreground">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {option.contact}
                  </Button>
                  <Button className="flex-1">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Important Travel Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h5 className="font-semibold text-blue-800">Permits Required</h5>
              <p className="text-blue-700">Inner Line Permit (ILP) required for Indian nationals. Foreign nationals need Protected Area Permit (PAP).</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <h5 className="font-semibold text-green-800">Best Time to Travel</h5>
              <p className="text-green-700">March to June and September to December. Avoid monsoon season (July-August).</p>
            </div>
            <div className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
              <h5 className="font-semibold text-amber-800">Road Conditions</h5>
              <p className="text-amber-700">Mountain roads can be narrow and winding. Journey times may vary due to weather and traffic.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportInfo;