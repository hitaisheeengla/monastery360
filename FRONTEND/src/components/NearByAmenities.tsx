import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Phone, Clock, Star, Utensils, Hotel, Fuel, ShoppingBag, Hospital, Wifi } from 'lucide-react';

interface Amenity {
  id: string;
  name: string;
  type: string;
  distance: number;
  rating: number;
  isOpen: boolean;
  phone?: string;
  description: string;
  features: string[];
}

export const NearbyAmenities: React.FC = () => {
  const [amenities] = useState<Amenity[]>([
    {
      id: '1',
      name: 'Mountain View Restaurant',
      type: 'restaurant',
      distance: 0.5,
      rating: 4.2,
      isOpen: true,
      phone: '+91-3592-123-456',
      description: 'Traditional Sikkimese cuisine with mountain views',
      features: ['Vegetarian', 'Local Cuisine', 'Mountain View']
    },
    {
      id: '2', 
      name: 'Monastery Guest House',
      type: 'accommodation',
      distance: 0.8,
      rating: 4.0,
      isOpen: true,
      phone: '+91-3592-789-012',
      description: 'Simple, clean rooms near the monastery',
      features: ['Budget Friendly', 'Clean', 'Peaceful']
    },
    {
      id: '3',
      name: 'Bharat Petroleum',
      type: 'fuel',
      distance: 2.1,
      rating: 3.8,
      isOpen: true,
      phone: '+91-3592-345-678',
      description: 'Fuel station with basic amenities',
      features: ['24/7', 'ATM Available', 'Restrooms']
    },
    {
      id: '4',
      name: 'Local Handicrafts Shop',
      type: 'shopping',
      distance: 0.3,
      rating: 4.5,
      isOpen: true,
      description: 'Authentic Sikkimese handicrafts and souvenirs',
      features: ['Handicrafts', 'Souvenirs', 'Local Made']
    },
    {
      id: '5',
      name: 'Gangtok Medical Center',
      type: 'medical',
      distance: 8.5,
      rating: 4.3,
      isOpen: true,
      phone: '+91-3592-911-911',
      description: 'Multi-specialty medical center',
      features: ['Emergency Care', '24/7', 'Pharmacy']
    }
  ]);

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <Utensils className="h-4 w-4" />;
      case 'accommodation': return <Hotel className="h-4 w-4" />;
      case 'fuel': return <Fuel className="h-4 w-4" />;
      case 'shopping': return <ShoppingBag className="h-4 w-4" />;
      case 'medical': return <Hospital className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getAmenityColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'text-orange-600 bg-orange-100';
      case 'accommodation': return 'text-blue-600 bg-blue-100';
      case 'fuel': return 'text-green-600 bg-green-100';
      case 'shopping': return 'text-purple-600 bg-purple-100';
      case 'medical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filterAmenitiesByType = (type: string) => {
    return amenities.filter(amenity => amenity.type === type);
  };

  const renderAmenityCard = (amenity: Amenity) => (
    <Card key={amenity.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${getAmenityColor(amenity.type)}`}>
              {getAmenityIcon(amenity.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{amenity.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{amenity.description}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-2">
                {amenity.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Distance and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {amenity.distance.toFixed(1)} km
            </div>
            <div className="flex items-center text-muted-foreground">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {amenity.rating}
            </div>
            <div className={`flex items-center text-sm ${amenity.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              <Clock className="h-3 w-3 mr-1" />
              {amenity.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Navigation className="h-3 w-3 mr-1" />
            Directions
          </Button>
          {amenity.phone && (
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="shadow-lg border-monastery-red/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-monastery-red">Nearby Amenities</h3>
          <Badge variant="secondary" className="bg-monastery-saffron/20 text-monastery-red">
            {amenities.length} found
          </Badge>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="food" className="text-xs">Food</TabsTrigger>
            <TabsTrigger value="stay" className="text-xs">Stay</TabsTrigger>
            <TabsTrigger value="services" className="text-xs">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-0">
            <div className="max-h-80 overflow-y-auto">
              {amenities.map(renderAmenityCard)}
            </div>
          </TabsContent>

          <TabsContent value="food" className="space-y-0">
            <div className="max-h-80 overflow-y-auto">
              {filterAmenitiesByType('restaurant').length > 0 ? (
                filterAmenitiesByType('restaurant').map(renderAmenityCard)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Utensils className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No restaurants found nearby</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stay" className="space-y-0">
            <div className="max-h-80 overflow-y-auto">
              {filterAmenitiesByType('accommodation').length > 0 ? (
                filterAmenitiesByType('accommodation').map(renderAmenityCard)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Hotel className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No accommodation found nearby</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-0">
            <div className="max-h-80 overflow-y-auto">
              {amenities.filter(a => ['fuel', 'shopping', 'medical'].includes(a.type)).length > 0 ? (
                amenities.filter(a => ['fuel', 'shopping', 'medical'].includes(a.type)).map(renderAmenityCard)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No services found nearby</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Access Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Wifi className="h-3 w-3 mr-1" />
            Find WiFi
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Hospital className="h-3 w-3 mr-1" />
            Emergency Services
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};