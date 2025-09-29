import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthorityDashboard } from "@/components/AuthorityDashboard";
import  EventCalendar  from "@/components/EventCalendar";
import { LocalHosts } from "@/components/LocalHosts";
import { AnnouncementBoard } from "@/components/AnnouncementBoard";
import { VolunteerSignup } from "@/components/VolunteerSignup";
import monasteryHero from "@/assets/monastery-hero.jpg";
import "../localOrgIndex.css";

const LocalOrgIndex = () => {
  const [activeTab, setActiveTab] = useState("hosts");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "calendar":
        return <EventCalendar/>;
      case "hosts":
        return <LocalHosts />;
      case "announcements":
        return <AnnouncementBoard />;
      case "volunteer":
        return <VolunteerSignup />;
      default:
        return <LocalHosts />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${monasteryHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-4xl mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-float">
                Monastery360
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Connecting Sacred Heritage with Modern Community
              </p>
              <p className="text-white/80 max-w-2xl mx-auto">
                Empowering monastery authorities and local communities to preserve cultural heritage 
                while engaging visitors with authentic, updated experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 -mt-16 relative z-10 ">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="animate-float">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default LocalOrgIndex;