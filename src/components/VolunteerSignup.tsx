import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart,
  Calendar,
  Users,
  Clock,
  Award,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export const VolunteerSignup = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    availability: "",
    motivation: ""
  });

  const volunteerOpportunities = [
    {
      id: 1,
      title: "Festival Event Coordination",
      event: "Losar Festival 2024",
      date: "February 10-12, 2024",
      location: "Rumtek Monastery",
      duration: "3 days",
      volunteersNeeded: 15,
      volunteersRegistered: 8,
      description: "Help coordinate festival activities, manage visitor flow, and assist with cultural program logistics.",
      requirements: ["Good communication skills", "Physical fitness", "Cultural sensitivity"],
      benefits: ["Cultural immersion", "Free meals", "Certificate of participation", "Monastery insights"],
      timeCommitment: "8-10 hours/day",
      category: "Event Management"
    },
    {
      id: 2,
      title: "Visitor Guide & Cultural Interpreter",
      event: "Bumchu Festival 2024",
      date: "February 15, 2024",
      location: "Tashiding Monastery",
      duration: "1 day",
      volunteersNeeded: 10,
      volunteersRegistered: 6,
      description: "Guide visitors through monastery grounds, explain cultural significance, and share Buddhist traditions.",
      requirements: ["Multilingual preferred", "Knowledge of Buddhism", "Friendly personality"],
      benefits: ["Learn monastery history", "Spiritual insights", "Community connections"],
      timeCommitment: "6-8 hours",
      category: "Cultural Education"
    },
    {
      id: 3,
      title: "Digital Documentation Assistant",
      event: "Ongoing Heritage Project",
      date: "Flexible scheduling",
      location: "Various Monasteries",
      duration: "Ongoing",
      volunteersNeeded: 5,
      volunteersRegistered: 2,
      description: "Help document monastery artifacts, record elder monks' stories, and create digital archives.",
      requirements: ["Basic photography skills", "Interest in history", "Attention to detail"],
      benefits: ["Historical knowledge", "Technical skills", "Meaningful contribution"],
      timeCommitment: "4-6 hours/week",
      category: "Heritage Preservation"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Volunteer application:", { ...formData, opportunityId: selectedOpportunity });
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-gradient-monastery rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Volunteer with Us</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Join our community of dedicated volunteers helping preserve monastery heritage and support cultural events. 
          Your contribution makes authentic spiritual experiences possible for visitors from around the world.
        </p>
      </div>

      {/* Volunteer Opportunities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {volunteerOpportunities.map((opportunity) => (
          <Card 
            key={opportunity.id} 
            className={`shadow-cultural hover:shadow-monastery transition-all duration-300 cursor-pointer ${
              selectedOpportunity === opportunity.id ? 'ring-2 ring-primary shadow-monastery' : ''
            }`}
            onClick={() => setSelectedOpportunity(opportunity.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge className="mb-3">{opportunity.category}</Badge>
                  <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                  <p className="text-primary font-medium">{opportunity.event}</p>
                </div>
                {selectedOpportunity === opportunity.id && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{opportunity.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{opportunity.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{opportunity.timeCommitment}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{opportunity.volunteersRegistered}/{opportunity.volunteersNeeded} volunteers</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Requirements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.requirements.map((req, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-sm">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-monastery h-2 rounded-full transition-all"
                    style={{ 
                      width: `${(opportunity.volunteersRegistered / opportunity.volunteersNeeded) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {opportunity.volunteersNeeded - opportunity.volunteersRegistered} spots remaining
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Form */}
      {selectedOpportunity && (
        <Card className="shadow-monastery bg-gradient-cultural">
          <CardHeader>
            <CardTitle className="text-xl">Volunteer Application</CardTitle>
            <p className="text-muted-foreground">
              Selected: {volunteerOpportunities.find(o => o.id === selectedOpportunity)?.title}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input 
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder="e.g., Full event duration, weekends only"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea 
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Share any relevant volunteering, cultural, or professional experience..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to volunteer? *</Label>
                <Textarea 
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Tell us about your motivation to volunteer with monastery heritage preservation..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-monastery text-white shadow-monastery hover:shadow-lg transition-all"
                >
                  Submit Application
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedOpportunity(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Contact Info */}
      <Card className="bg-primary/5 shadow-cultural">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Questions about Volunteering?</h3>
            <p className="text-muted-foreground mb-6">
              Our volunteer coordinators are here to help you find the perfect opportunity to contribute.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>volunteer@monastery360.org</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 00000</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};