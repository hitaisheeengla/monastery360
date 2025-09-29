import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import authorityImg from "@/assets/authority-placeholder.jpg";

export const AuthorityDashboard = () => {
  const authorities = [
    {
      id: 1,
      name: "Lama Tenzin Norbu",
      designation: "Head Monk",
      monastery: "Rumtek Monastery",
      phone: "+91 98765 43210",
      email: "lama.tenzin@rumtek.org",
      location: "Gangtok, Sikkim",
      verified: true,
      events: 12,
      announcements: 5
    },
    {
      id: 2,
      name: "Geshe Lobsang",
      designation: "Senior Monk",
      monastery: "Enchey Monastery",
      phone: "+91 98765 43211",
      email: "geshe.lobsang@enchey.org",
      location: "Gangtok, Sikkim",
      verified: true,
      events: 8,
      announcements: 3
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "Festival",
      title: "Losar Celebration 2024",
      submittedBy: "Local Host - Pemba's Homestay",
      date: "2024-02-10",
      status: "pending"
    },
    {
      id: 2,
      type: "Service",
      title: "Traditional Food Stall",
      submittedBy: "Dolma's Kitchen",
      date: "2024-02-08",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Authority Dashboard</h2>
          <p className="text-muted-foreground">Manage monastery events, announcements, and approvals</p>
        </div>
        <Button className="bg-gradient-monastery text-monastery-red border-2 border-monastery-red">
          <Plus className="w-4 h-4 mr-2" />
          Add Authority
        </Button>
      </div>

      {/* Authority Profiles */}
      <div className="grid md:grid-cols-2 gap-6">
        {authorities.map((authority) => (
          <Card key={authority.id} className="shadow-cultural hover:shadow-monastery transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                    <AvatarImage src={authorityImg} alt={authority.name} />
                    <AvatarFallback className="bg-gradient-monastery text-white text-lg">
                      {authority.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{authority.name}</CardTitle>
                    <p className="text-muted-foreground">{authority.designation}</p>
                    <p className="text-sm font-medium text-primary">{authority.monastery}</p>
                  </div>
                </div>
                <Badge 
                  variant={authority.verified ? "default" : "secondary"}
                  className="bg-gradient-monastery text-white"
                >
                  {authority.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {authority.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {authority.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {authority.location}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{authority.events}</p>
                  <p className="text-xs text-muted-foreground">Events Managed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{authority.announcements}</p>
                  <p className="text-xs text-muted-foreground">Announcements</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Approvals */}
      <Card className="shadow-cultural">
        <CardHeader>
          <CardTitle className="text-xl">Pending Approvals</CardTitle>
          <p className="text-muted-foreground">Review and approve submissions from local hosts</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Submitted by: {item.submittedBy}</p>
                  <p className="text-xs text-muted-foreground">Date: {item.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};