import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Megaphone,
  AlertCircle,
  Info,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Pin
} from "lucide-react";

export const AnnouncementBoard = () => {
  const announcements = [
    {
      id: 1,
      type: "emergency",
      title: "Temporary Road Closure to Rumtek Monastery",
      content: "Due to landslide clearance work, the main road to Rumtek Monastery will be closed from 10 AM to 4 PM today. Alternative route via Martam available.",
      timestamp: "2024-01-15T09:00:00Z",
      authority: "Lama Tenzin Norbu",
      monastery: "Rumtek Monastery",
      priority: "high",
      pinned: true,
      expiresAt: "2024-01-15T18:00:00Z"
    },
    {
      id: 2,
      type: "timing",
      title: "Modified Prayer Timings During Winter",
      content: "Morning prayers will commence at 6:30 AM instead of 6:00 AM during winter months (December - February). Evening prayers remain at 6:00 PM.",
      timestamp: "2024-01-12T14:30:00Z",
      authority: "Geshe Lobsang",
      monastery: "Enchey Monastery",
      priority: "medium",
      pinned: false,
      expiresAt: "2024-02-28T23:59:59Z"
    },
    {
      id: 3,
      type: "event",
      title: "Volunteer Registration Open for Losar Festival",
      content: "We are seeking volunteers for various activities during the Losar Festival celebration. Roles include crowd management, cultural program assistance, and visitor guidance. Free meals and cultural insights provided.",
      timestamp: "2024-01-10T10:00:00Z",
      authority: "Lama Tenzin Norbu",
      monastery: "Rumtek Monastery", 
      priority: "medium",
      pinned: true,
      expiresAt: "2024-02-08T23:59:59Z"
    },
    {
      id: 4,
      type: "cultural",
      title: "Special Teaching Sessions on Buddhist Philosophy",
      content: "Join our weekly teaching sessions every Wednesday at 3:00 PM. Topics include meditation practices, Buddhist philosophy, and local monastery history. Open to all visitors and devotees.",
      timestamp: "2024-01-08T16:00:00Z",
      authority: "Geshe Lobsang",
      monastery: "Enchey Monastery",
      priority: "low",
      pinned: false,
      expiresAt: null
    }
  ];

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'emergency': return AlertCircle;
      case 'timing': return Clock;
      case 'event': return Calendar;
      case 'cultural': return Info;
      default: return Megaphone;
    }
  };

  const getAnnouncementStyle = (type: string, priority: string) => {
    if (type === 'emergency' || priority === 'high') {
      return "border-l-4 border-l-destructive bg-destructive/5";
    }
    if (priority === 'medium') {
      return "border-l-4 border-l-accent bg-accent/5";
    }
    return "border-l-4 border-l-primary bg-primary/5";
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = now.getTime() - then.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const regularAnnouncements = announcements.filter(a => !a.pinned);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Announcement Board</h2>
          <p className="text-muted-foreground">Stay updated with monastery news, timings, and important notices</p>
        </div>
        <Button className="bg-gradient-monastery text-white shadow-monastery hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Pinned Announcements</h3>
          </div>
          
          {pinnedAnnouncements.map((announcement) => {
            const IconComponent = getAnnouncementIcon(announcement.type);
            return (
              <Card 
                key={announcement.id} 
                className={`shadow-cultural hover:shadow-monastery transition-all duration-300 ${getAnnouncementStyle(announcement.type, announcement.priority)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      announcement.type === 'emergency' ? 'bg-destructive/20' :
                      announcement.priority === 'medium' ? 'bg-accent/20' : 'bg-primary/20'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        announcement.type === 'emergency' ? 'text-destructive' :
                        announcement.priority === 'medium' ? 'text-accent' : 'text-primary'
                      }`} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold mb-1">{announcement.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {announcement.authority}</span>
                            <span>•</span>
                            <span>{announcement.monastery}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(announcement.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Pin className="w-4 h-4 text-primary" />
                          <Badge 
                            variant={
                              announcement.priority === 'high' ? 'destructive' :
                              announcement.priority === 'medium' ? 'default' : 'secondary'
                            }
                            className={announcement.priority === 'medium' ? 'bg-accent text-black' : ''}
                          >
                            {announcement.priority} priority
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {announcement.content}
                      </p>
                      
                      {announcement.expiresAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                          <Clock className="w-4 h-4" />
                          <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()} at {new Date(announcement.expiresAt).toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Regular Announcements */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">All Announcements</h3>
        
        {regularAnnouncements.map((announcement) => {
          const IconComponent = getAnnouncementIcon(announcement.type);
          return (
            <Card 
              key={announcement.id} 
              className={`shadow-cultural hover:shadow-monastery transition-all duration-300 ${getAnnouncementStyle(announcement.type, announcement.priority)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    announcement.type === 'emergency' ? 'bg-destructive/20' :
                    announcement.priority === 'medium' ? 'bg-accent/20' : 'bg-primary/20'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      announcement.type === 'emergency' ? 'text-destructive' :
                      announcement.priority === 'medium' ? 'text-accent' : 'text-primary'
                    }`} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <Badge 
                        variant={
                          announcement.priority === 'high' ? 'destructive' :
                          announcement.priority === 'medium' ? 'default' : 'secondary'
                        }
                        className={announcement.priority === 'medium' ? 'bg-accent text-black' : ''}
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {announcement.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{announcement.authority}</span>
                      <span>•</span>
                      <span>{announcement.monastery}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(announcement.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};