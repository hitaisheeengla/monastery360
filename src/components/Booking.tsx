import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bed,
  Calendar,
  MapPin,
  Phone,
  Star,
  Clock,
} from 'lucide-react';

interface Booking {
  id: string;
  hotelName: string;
  type: string;
  location: string;
  rating: number;
  checkIn: string;
  checkOut: string;
  phone: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface BookingStatusProps {
  booking?: Booking | null;
}

export const BookingStatus: React.FC<BookingStatusProps> = ({ booking }) => {
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Your Booking Status</h3>
        <p className="text-sm text-muted-foreground">
          Stay details for your current or upcoming trip
        </p>
      </div>

      {booking ? (
        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold">{booking.hotelName}</h4>
              <p className="text-sm text-muted-foreground">{booking.type}</p>
            </div>
            <Badge
              variant={
                booking.status === 'Confirmed'
                  ? 'default'
                  : booking.status === 'Pending'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {booking.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(booking.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                {booking.rating}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{booking.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Check-in: {booking.checkIn}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Check-out: {booking.checkOut}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              View Details
            </Button>
            <Button size="sm" variant="outline" className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>Call</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-muted rounded-lg p-6 text-center text-sm text-muted-foreground">
          <Bed className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p>No hotel bookings found at the moment.</p>
        </div>
      )}
    </Card>
  );
};
