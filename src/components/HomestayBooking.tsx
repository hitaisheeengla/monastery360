import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Home, Star, MapPin, Users, Wifi, Car, Coffee, CheckCircle, ArrowLeft, FileText, Phone, Heart, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import mountainViewImage from '@/assets/homestay-mountain-view.jpg';
import heritageImage from '@/assets/homestay-heritage.jpg';
import valleyImage from '@/assets/homestay-valley.jpg';

interface Homestay {
  id: string;
  name: string;
  location: string;
  nearbyMonastery: string;
  rating: number;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  image: string;
  hostName: string;
  description: string;
}

const HomestayBooking = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<string>('2');
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
  const [bookingStep, setBookingStep] = useState<'browse' | 'details' | 'confirmation'>('browse');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const homestays: Homestay[] = [
    {
      id: 'mountain-view-home',
      name: 'Mountain View Homestay',
      location: 'Near Rumtek Monastery',
      nearbyMonastery: 'Rumtek Monastery (2 km)',
      rating: 4.8,
      pricePerNight: 2500,
      capacity: 4,
      amenities: ['WiFi', 'Parking', 'Traditional Meals', 'Mountain View'],
      image: mountainViewImage,
      hostName: 'Tenzin Lhamo',
      description: 'Traditional Sikkimese home with stunning mountain views and authentic local cuisine.'
    },
    {
      id: 'pelling-heritage',
      name: 'Pelling Heritage Home',
      location: 'Near Pemayangtse Monastery',
      nearbyMonastery: 'Pemayangtse Monastery (1.5 km)',
      rating: 4.6,
      pricePerNight: 2000,
      capacity: 6,
      amenities: ['WiFi', 'Garden', 'Local Cuisine', 'Kanchenjunga View'],
      image: heritageImage,
      hostName: 'Karma Sherpa',
      description: 'Cozy homestay with garden views and traditional Sikkimese hospitality.'
    },
    {
      id: 'tashiding-valley',
      name: 'Tashiding Valley Stay',
      location: 'Near Tashiding Monastery',
      nearbyMonastery: 'Tashiding Monastery (3 km)',
      rating: 4.5,
      pricePerNight: 1800,
      capacity: 4,
      amenities: ['Organic Food', 'Nature Walks', 'Meditation Space', 'River View'],
      image: valleyImage,
      hostName: 'Pemba Tamang',
      description: 'Peaceful valley location perfect for meditation and connecting with nature.'
    }
  ];

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    if (selectedHomestay && checkIn && checkOut) {
      const nights = calculateNights();
      return selectedHomestay.pricePerNight * nights * parseInt(guests);
    }
    return 0;
  };

  const handleHomestaySelection = (homestay: Homestay) => {
    setSelectedHomestay(homestay);
    setBookingStep('details');
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut || !selectedHomestay || !guestName || !guestEmail || !guestPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to proceed with booking.",
        variant: "destructive"
      });
      return;
    }

    setBookingStep('confirmation');
    
    // Simulate booking process
    setTimeout(() => {
      setIsBookingConfirmed(true);
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your stay at ${selectedHomestay.name} is confirmed. Check your email for details.`,
      });
    }, 2000);
  };

  const resetBooking = () => {
    setBookingStep('browse');
    setSelectedHomestay(null);
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    setIsBookingConfirmed(false);
  };

  const getProgressValue = () => {
    switch (bookingStep) {
      case 'browse': return 33;
      case 'details': return 66;
      case 'confirmation': return 100;
      default: return 33;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={bookingStep === 'browse' ? 'font-semibold text-primary' : 'text-muted-foreground'}>
                Browse Homestays
              </span>
              <span className={bookingStep === 'details' ? 'font-semibold text-primary' : 'text-muted-foreground'}>
                Booking Details
              </span>
              <span className={bookingStep === 'confirmation' ? 'font-semibold text-primary' : 'text-muted-foreground'}>
                Confirmation
              </span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Browse Homestays Step */}
      {bookingStep === 'browse' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Choose Your Homestay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {homestays.map((homestay) => (
              <div 
                key={homestay.id}
                className="group border rounded-xl overflow-hidden hover:border-primary transition-all cursor-pointer hover:shadow-mountain bg-gradient-to-br from-card to-card/50"
                onClick={() => handleHomestaySelection(homestay)}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={homestay.image} 
                    alt={homestay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Floating Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{homestay.rating}</span>
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm text-white rounded-lg px-3 py-2">
                    <div className="font-bold text-lg">₹{homestay.pricePerNight}</div>
                    <div className="text-xs opacity-90">per night</div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{homestay.name}</h4>
                      <p className="text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        {homestay.location}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <Home className="h-3 w-3" />
                        {homestay.nearbyMonastery}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Up to {homestay.capacity} guests</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{homestay.description}</p>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {homestay.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                        <span className="flex items-center gap-1">
                          <Wifi className="h-3 w-3" />
                          {amenity}
                        </span>
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Host & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Host: {homestay.hostName}</p>
                        <p className="text-xs text-muted-foreground">Verified Host</p>
                      </div>
                    </div>
                    <Button 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-md"
                      size="sm"
                    >
                      Select Homestay
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Booking Details Step */}
      {bookingStep === 'details' && selectedHomestay && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setBookingStep('browse')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Complete Your Booking</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected Homestay Summary */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{selectedHomestay.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedHomestay.location}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-primary">₹{selectedHomestay.pricePerNight}/night</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{selectedHomestay.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cost Summary */}
            {checkIn && checkOut && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-3">Cost Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>₹{selectedHomestay.pricePerNight} × {calculateNights()} nights × {guests} guests</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your Name *</Label>
                <Input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+91 9876543210"
              />
            </div>

            <div className="space-y-2">
              <Label>Special Requests</Label>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={handleBooking} className="w-full" size="lg">
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Step */}
      {bookingStep === 'confirmation' && selectedHomestay && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              {!isBookingConfirmed ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold">Processing Your Booking...</h3>
                  <p className="text-muted-foreground">Please wait while we confirm your reservation</p>
                  <Progress value={75} className="w-64 mx-auto" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                    <p className="text-muted-foreground">Your homestay reservation is confirmed</p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg text-left max-w-md mx-auto">
                    <h4 className="font-semibold mb-4">Booking Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Homestay:</span>
                        <span className="font-medium">{selectedHomestay.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guest:</span>
                        <span className="font-medium">{guestName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">{checkIn ? format(checkIn, "PPP") : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">{checkOut ? format(checkOut, "PPP") : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total Cost:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Host
                    </Button>
                    <Button onClick={resetBooking}>
                      Book Another Stay
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">What's Next?</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Confirmation email sent to {guestEmail}</li>
                        <li>• Host will contact you within 24 hours</li>
                        <li>• Payment to be made directly to host</li>
                        <li>• Free cancellation up to 48 hours before</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomestayBooking;