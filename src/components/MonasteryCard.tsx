import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monastery } from '@/data/monasteries';
import { MapPin, Calendar, Eye } from 'lucide-react';
import { Play, Pause, Plus, Camera, Volume2, Info, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTripPlanner } from '@/hooks/useTripPlanner';


interface MonasteryCardProps {
  monastery: Monastery;
  onViewDetails: (monastery: Monastery) => void;
}
const MonasteryCard: React.FC<MonasteryCardProps> = ({ monastery, onViewDetails }) => {
  const { toast } = useToast();
  const { addMonastery } = useTripPlanner();
  const handleAddToTrip = (monastery) => {
    addMonastery(monastery);
    toast({
      title: "Added to Trip!",
      description: `${monastery.name} has been added to your itinerary.`,
    });
  };
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

      <div className="p-3 flex items-start justify-between">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="text-lg">{monastery.name}</CardTitle>
          <CardDescription className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{monastery.location}</span>
          </CardDescription>
        </CardHeader>
        {/* <Button  onClick={handleAddToTrip} variant="monastery" size="sm" className='pl-2 pr-2'>
          <Plus className="h-4 w-4 mr-0" />
          Add to Trip
        </Button> */}
      </div>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {monastery.description}
        </p>
      </CardContent>

      <CardFooter className='flex space-x-2'>
        <Button
          onClick={() => onViewDetails(monastery)}
          className="w-max pt-0 pb-0 h-9"
          variant="monastery"
        >
          <Eye className="h-4 w-4 mr-0" />
          View Details
        </Button>
        <Button  onClick={handleAddToTrip} variant="monastery" size="sm" >
          <Plus className="h-4 w-4 mr-0" />
          Add to Trip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MonasteryCard;