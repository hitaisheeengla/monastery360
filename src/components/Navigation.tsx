import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar,
  Users,
  Megaphone,
  Heart,
  User,
  Menu,
  Bell
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: 'calendar', label: 'Festival Calendar', icon: Calendar },
    { id: 'hosts', label: 'Local Hosts', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'volunteer', label: 'Volunteer', icon: Heart },
  ];

  return (
    <Card className="bg-gradient-monastery shadow-monastery mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-[hsl(45,100%,65%)] to-[hsl(35,100%,50%)] rounded-t-lg">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Menu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Monastery360</h1>
            <p className="text-white/80">Authorities & Localities</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="px-6 pb-6 bg-gradient-to-r from-[hsl(45,100%,65%)] to-[hsl(35,100%,50%)] rounded-b-lg ">
        <div className="flex flex-wrap gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              onClick={() => onTabChange(id)}
              variant={activeTab === id ? "secondary" : "ghost"}
              size="sm"
              className={`flex items-center gap-2 ${
                activeTab === id 
                  ? "bg-white text-primary shadow-cultural" 
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};