import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Utensils, 
  Bed, 
  Car, 
  Calendar,
  MapPin,
  Star,
  Phone,
  Navigation,
  Clock
} from 'lucide-react';
import { Monastery } from '@/data/monasteries';

interface ContextualSuggestionsProps {
  currentDestination: Monastery | null;
  nextDestination: Monastery | null;
}

export const ContextualSuggestions: React.FC<ContextualSuggestionsProps> = ({
  currentDestination,
  nextDestination
}) => {
  const [activeTab, setActiveTab] = useState('nearby');

  // Mock data based on current/next destination
  const suggestions = {
    restaurants: [
      {
        id: '1',
        name: 'Himalayan Kitchen',
        type: 'Tibetan Cuisine',
        distance: '0.8 km',
        rating: 4.5,
        priceRange: '₹₹',
        speciality: 'Momos & Thukpa',
        phone: '+91-3592-123-456'
      },
      {
        id: '2',
        name: 'Monastery View Cafe',
        type: 'Continental',
        distance: '0.3 km',
        rating: 4.2,
        priceRange: '₹₹₹',
        speciality: 'Mountain Views',
        phone: '+91-3592-123-457'
      },
      {
        id: '3',
        name: 'Local Dhaba',
        type: 'Indian',
        distance: '1.2 km',
        rating: 4.0,
        priceRange: '₹',
        speciality: 'Dal Bhat',
        phone: '+91-3592-123-458'
      }
    ],
    accommodations: [
      {
        id: '1',
        name: 'Heritage Homestay',
        type: 'Homestay',
        distance: '0.5 km',
        rating: 4.6,
        priceRange: '₹₹',
        amenities: 'Free WiFi, Mountain View',
        phone: '+91-3592-234-567'
      },
      {
        id: '2',
        name: 'Monastery Guest House',
        type: 'Guest House',
        distance: '0.2 km',
        rating: 4.3,
        priceRange: '₹',
        amenities: 'Traditional, Meditation Hall',
        phone: '+91-3592-234-568'
      }
    ],
    transport: [
      {
        id: '1',
        name: 'Local Taxi Service',
        type: 'Taxi',
        distance: 'On-demand',
        rate: '₹15/km',
        availability: 'Available',
        phone: '+91-3592-345-678'
      },
      {
        id: '2',
        name: 'Shared Jeep Stand',
        type: 'Shared Vehicle',
        distance: '0.3 km',
        rate: '₹50/person',
        availability: 'Next: 3:30 PM',
        phone: '+91-3592-345-679'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Evening Prayer Ceremony',
        time: '6:00 PM',
        location: currentDestination?.name || 'Current Location',
        type: 'Religious',
        description: 'Join the monks for evening prayers'
      },
      {
        id: '2',
        title: 'Cultural Dance Performance',
        time: '7:30 PM',
        location: 'Community Hall',
        type: 'Cultural',
        description: 'Traditional Sikkimese dance performance'
      }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Nearby Recommendations</h3>
        {currentDestination && (
          <p className="text-sm text-muted-foreground">
            Near {currentDestination.name}, {currentDestination.location}
          </p>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nearby" className="flex items-center space-x-1">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Food</span>
          </TabsTrigger>
          <TabsTrigger value="stay" className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span className="hidden sm:inline">Stay</span>
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center space-x-1">
            <Car className="h-4 w-4" />
            <span className="hidden sm:inline">Transport</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="mt-4">
          <div className="space-y-4">
            {suggestions.restaurants.map((restaurant) => (
              <div key={restaurant.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{restaurant.name}</h4>
                    <p className="text-sm text-muted-foreground">{restaurant.type}</p>
                  </div>
                  <Badge variant="outline">{restaurant.priceRange}</Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(restaurant.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {restaurant.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  Speciality: {restaurant.speciality}
                </p>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Navigation className="h-3 w-3" />
                    <span>Directions</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stay" className="mt-4">
          <div className="space-y-4">
            {suggestions.accommodations.map((place) => (
              <div key={place.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{place.name}</h4>
                    <p className="text-sm text-muted-foreground">{place.type}</p>
                  </div>
                  <Badge variant="outline">{place.priceRange}</Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(place.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {place.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{place.distance}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {place.amenities}
                </p>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Check Availability</Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transport" className="mt-4">
          <div className="space-y-4">
            {suggestions.transport.map((option) => (
              <div key={option.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{option.name}</h4>
                    <p className="text-sm text-muted-foreground">{option.type}</p>
                  </div>
                  <Badge variant={option.availability === 'Available' ? 'default' : 'secondary'}>
                    {option.availability}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="text-sm font-medium">{option.rate}</div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{option.distance}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Book Now</Button>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <div className="space-y-4">
            {suggestions.events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>
                
                <Button size="sm" variant="outline">Add to Calendar</Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};