import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monastery } from '@/data/monasteries';
import { MapPin, Calendar, Eye } from 'lucide-react';

interface MonasteryCardProps {
  monastery: Monastery;
  onViewDetails: (monastery: Monastery) => void;
}

const MonasteryCard: React.FC<MonasteryCardProps> = ({ monastery, onViewDetails }) => {
  return (
    <Card className="group hover:shadow-cultural transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-background/90 text-foreground"
        >
          {monastery.era}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{monastery.name}</CardTitle>
        <CardDescription className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{monastery.location}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {monastery.description}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onViewDetails(monastery)}
          className="w-full"
          variant="monastery"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MonasteryCard;