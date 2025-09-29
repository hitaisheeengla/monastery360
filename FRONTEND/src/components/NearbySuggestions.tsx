import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Utensils, 
  Bed, 
  Car, 
  Phone, 
  Navigation,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

interface NearbySuggestionsProps {
  currentLocation: string | null;
}

export const NearbySuggestions: React.FC<NearbySuggestionsProps> = ({
  currentLocation
}) => {
  const suggestions = [
    {
      id: 'monastery',
      icon: Building2,
      title: 'Next Monastery',
      name: 'Enchey Monastery',
      distance: '2.3 km away',
      rating: 4.8,
      description: 'Beautiful hilltop monastery with city views',
      action: 'Navigate',
      actionIcon: Navigation,
      color: 'text-monastery-red'
    },
    {
      id: 'food',
      icon: Utensils,
      title: 'Local Food',
      name: 'Taste of Tibet Momo Shop',
      distance: '0.5 km away',
      rating: 4.6,
      description: 'Authentic Tibetan momos and thukpa',
      action: 'Call',
      actionIcon: Phone,
      color: 'text-orange-600'
    },
    {
      id: 'stay',
      icon: Bed,
      title: 'Accommodation',
      name: 'Norling Heritage Homestay',
      distance: '1.2 km away',
      rating: 4.7,
      description: 'Traditional Sikkimese homestay experience',
      action: 'Book',
      actionIcon: Phone,
      color: 'text-blue-600'
    },
    {
      id: 'transport',
      icon: Car,
      title: 'Transport',
      name: 'Local Taxi Stand',
      distance: '0.3 km away',
      rating: 4.2,
      description: 'Shared taxis and private cabs available',
      action: 'Call Driver',
      actionIcon: Phone,
      color: 'text-green-600'
    }
  ];

  if (!currentLocation) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nearby Suggestions</h3>
          <p className="text-muted-foreground">
            Enable location to see nearby monasteries, food, and accommodation
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-monastery-red" />
          Nearby Suggestions
        </h3>
        
        <div className="space-y-4">
          {suggestions.map((item) => {
            const IconComponent = item.icon;
            const ActionIcon = item.actionIcon;
            
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-monastery-red/30 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground ml-1">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-1">
                      {item.name}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.distance}
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center space-x-1 hover:bg-monastery-red hover:text-white hover:border-monastery-red"
                >
                  <ActionIcon className="h-3 w-3" />
                  <span className="text-xs">{item.action}</span>
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};