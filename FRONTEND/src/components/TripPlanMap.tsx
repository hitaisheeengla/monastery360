import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Utensils, 
  Bed, 
  Camera,
  Plus,
  Route,
  Star
} from 'lucide-react';
import { monasteries } from '@/data/monasteries';

interface NearbySpot {
  id: string;
  type: 'food' | 'stay' | 'attraction';
  name: string;
  lat: number;
  lng: number;
  description: string;
  rating: number;
  distance: string;
}

// Mock nearby spots data
const nearbySpots: NearbySpot[] = [
  {
    id: '1',
    type: 'food',
    name: 'Taste of Tibet Momo Shop',
    lat: 27.335,
    lng: 88.608,
    description: 'Authentic Tibetan momos and thukpa',
    rating: 4.6,
    distance: '0.5 km'
  },
  {
    id: '2',
    type: 'stay',
    name: 'Norling Heritage Homestay',
    lat: 27.340,
    lng: 88.615,
    description: 'Traditional Sikkimese homestay experience',
    rating: 4.7,
    distance: '1.2 km'
  },
  {
    id: '3',
    type: 'attraction',
    name: 'Hanuman Tok Viewpoint',
    lat: 27.345,
    lng: 88.620,
    description: 'Panoramic views of the Himalayas',
    rating: 4.5,
    distance: '2.1 km'
  },
  {
    id: '4',
    type: 'food',
    name: 'Local Tea House',
    lat: 27.330,
    lng: 88.605,
    description: 'Traditional butter tea and snacks',
    rating: 4.3,
    distance: '0.8 km'
  }
];

const TripPlanMap: React.FC = () => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [itinerary, setItinerary] = useState<NearbySpot[]>([]);

  const selectedDestinationMonastery = monasteries.find(m => m.id === destination);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'food': return <Utensils className="h-4 w-4" />;
      case 'stay': return <Bed className="h-4 w-4" />;
      case 'attraction': return <Camera className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'food': return 'bg-orange-500';
      case 'stay': return 'bg-blue-500';
      case 'attraction': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const addToItinerary = (spot: NearbySpot) => {
    if (!itinerary.find(item => item.id === spot.id)) {
      setItinerary([...itinerary, spot]);
    }
  };

  const removeFromItinerary = (spotId: string) => {
    setItinerary(itinerary.filter(item => item.id !== spotId));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="mr-2 h-5 w-5" />
              Trip Route Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Route Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Location</label>
                <Select value={startLocation} onValueChange={setStartLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select starting point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gangtok">Gangtok City Center</SelectItem>
                    <SelectItem value="airport">Bagdogra Airport</SelectItem>
                    <SelectItem value="siliguri">Siliguri Station</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Destination Monastery</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select monastery" />
                  </SelectTrigger>
                  <SelectContent>
                    {monasteries.map(monastery => (
                      <SelectItem key={monastery.id} value={monastery.id}>
                        {monastery.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-border overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)`,
                  backgroundSize: '15px 15px'
                }} />
              </div>

              {/* Route Line */}
              {startLocation && destination && (
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern id="dash" patternUnits="userSpaceOnUse" width="10" height="2">
                      <rect width="5" height="2" fill="#dc2626" />
                    </pattern>
                  </defs>
                  <line
                    x1="20%"
                    y1="80%"
                    x2="80%"
                    y2="20%"
                    stroke="url(#dash)"
                    strokeWidth="3"
                    className="drop-shadow-sm"
                  />
                </svg>
              )}

              {/* Start Location Marker */}
              {startLocation && (
                <div className="absolute bottom-6 left-6 transform">
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    Start
                  </div>
                </div>
              )}

              {/* Destination Marker */}
              {destination && selectedDestinationMonastery && (
                <div className="absolute top-6 right-6 transform">
                  <div className="w-6 h-6 bg-monastery-red rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    {selectedDestinationMonastery.name}
                  </div>
                </div>
              )}

              {/* Nearby Spots */}
              {nearbySpots.map((spot, index) => (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${40 + (index % 2) * 20}%`
                  }}
                  onClick={() => addToItinerary(spot)}
                >
                  <div className={`w-5 h-5 ${getColorForType(spot.type)} rounded-full border-2 border-white shadow-md flex items-center justify-center text-white hover:scale-110 transition-transform`}>
                    {getIconForType(spot.type)}
                  </div>
                  
                  {/* Spot Info Popup */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg min-w-max">
                      <p className="text-xs font-medium">{spot.name}</p>
                      <p className="text-xs text-muted-foreground">{spot.distance}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Route Info */}
              {startLocation && destination && (
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Navigation className="h-4 w-4 text-monastery-red" />
                    <span className="font-medium">Route Info</span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>2h 45min</span>
                    </div>
                    <div>Distance: 65 km</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Itinerary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            {itinerary.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Add stops from the map or nearby suggestions
              </p>
            ) : (
              <div className="space-y-3">
                {itinerary.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className={`w-4 h-4 ${getColorForType(item.type)} rounded-full`} />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.distance}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromItinerary(item.id)}
                      className="text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nearby Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nearby Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nearbySpots.map((spot) => (
                <div key={spot.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 ${getColorForType(spot.type)} rounded-full flex items-center justify-center text-white`}>
                        {getIconForType(spot.type)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{spot.name}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{spot.rating}</span>
                          <span className="text-xs text-muted-foreground">• {spot.distance}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {spot.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{spot.description}</p>
                  <Button
                    size="sm"
                    onClick={() => addToItinerary(spot)}
                    disabled={itinerary.some(item => item.id === spot.id)}
                    className="w-full"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    {itinerary.some(item => item.id === spot.id) ? 'Added' : 'Add to Itinerary'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripPlanMap;