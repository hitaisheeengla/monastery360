import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star,
  MapPin,
  Phone,
  Utensils,
  Home,
  Camera,
  ShoppingBag,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";

export const LocalHosts = () => {
  const hostCategories = [
    { id: 'homestay', label: 'Homestays', icon: Home, count: 15 },
    { id: 'guides', label: 'Tour Guides', icon: Camera, count: 8 },
    { id: 'food', label: 'Food Stalls', icon: Utensils, count: 23 },
    { id: 'vendors', label: 'Local Vendors', icon: ShoppingBag, count: 12 }
  ];

  const localHosts = [
    {
      id: 1,
      name: "Pemba's Himalayan Homestay",
      category: "Homestay",
      owner: "Pemba Sherpa",
      location: "Gangtok, Sikkim",
      rating: 4.8,
      reviews: 124,
      phone: "+91 98765 43210",
      services: ["Traditional Meals", "Cultural Programs", "Trekking Guide"],
      price: "₹2,500/night",
      verified: true,
      availability: "Available",
      description: "Experience authentic Sikkimese culture in our traditional family home with organic meals and cultural activities.",
      specialties: ["Momos", "Thukpa", "Local Cultural Dance"]
    },
    {
      id: 2,
      name: "Tenzin's Cultural Tours",
      category: "Guide Service",
      owner: "Tenzin Norbu",
      location: "Rumtek Monastery Area",
      rating: 4.9,
      reviews: 89,
      phone: "+91 98765 43211",
      services: ["Monastery Tours", "Cultural Interpretation", "Photography Guide"],
      price: "₹1,500/day",
      verified: true,
      availability: "Busy until March",
      description: "Expert guide with 15+ years experience in monastery tours and Buddhist cultural interpretation.",
      specialties: ["Monastery History", "Buddhist Philosophy", "Local Legends"]
    },
    {
      id: 3,
      name: "Dolma's Traditional Kitchen",
      category: "Food Stall",
      owner: "Dolma Lepcha",
      location: "Festival Grounds",
      rating: 4.7,
      reviews: 156,
      phone: "+91 98765 43212",
      services: ["Traditional Cuisine", "Festival Catering", "Cooking Classes"],
      price: "₹150-300/meal",
      verified: false,
      availability: "Seasonal",
      description: "Authentic Sikkimese and Tibetan cuisine prepared with traditional methods and local ingredients.",
      specialties: ["Gundruk", "Sinki", "Butter Tea"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Local Hosts & Services</h2>
          <p className="text-muted-foreground">Connect with authentic local experiences and cultural hosts</p>
        </div>
        <Button className="bg-gradient-monastery text-white shadow-monastery hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Register as Host
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hostCategories.map(({ id, label, icon: Icon, count }) => (
          <Card key={id} className="shadow-cultural hover:shadow-monastery transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{label}</h3>
              <p className="text-2xl font-bold text-primary">{count}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Host Listings */}
      <div className="space-y-6">
        {localHosts.map((host) => (
          <Card key={host.id} className="shadow-cultural hover:shadow-monastery transition-all duration-300">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Host Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                        <AvatarFallback className="bg-gradient-monastery text-white text-lg">
                          {host.owner.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{host.name}</h3>
                        <p className="text-muted-foreground">by {host.owner}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{host.category}</Badge>
                          {host.verified ? (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold">{host.rating}</span>
                        <span className="text-muted-foreground text-sm">({host.reviews})</span>
                      </div>
                      <p className="text-lg font-bold text-primary">{host.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{host.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{host.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{host.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Services Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {host.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Specialties & Actions */}
                <div className="space-y-4">
                  <div className="p-4 bg-cultural-warm rounded-lg">
                    <h4 className="font-medium mb-2">Specialties:</h4>
                    <ul className="space-y-1">
                      {host.specialties.map((specialty, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Star className="w-3 h-3 text-accent" />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium text-center mb-2">Availability</p>
                    <Badge 
                      variant={host.availability === "Available" ? "default" : "secondary"}
                      className={host.availability === "Available" ? "bg-green-600 w-full justify-center" : "w-full justify-center"}
                    >
                      {host.availability}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-monastery text-white">
                      Contact Host
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};