import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Globe,
  MapPin,
  Calendar,
  Archive,
  Route,
  Camera
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/explore', label: 'Explore Monasteries', icon: MapPin },
    { path: '/plan-trip', label: 'Plan Trip', icon: Route },
    { path: '/archives', label: 'Digital Archives', icon: Archive },
    { path: '/events', label: 'Events Calendar', icon: Calendar },
    { path: '/journey', label: 'In-Journey', icon: Camera },
  ];

  return (
    <header className="bg-gradient-card border-b border-border sticky top-0 z-50 shadow-cultural">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Monastery360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button 
                  variant={isActive(path) ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Language Selector & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-1 text-sm"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              <option value="Nepali">नेपाली</option>
            </select>
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-2 mt-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button 
                    variant={isActive(path) ? "default" : "ghost"}
                    className="w-full justify-start flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
            
            <div className="flex flex-col space-y-2 mt-4">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
                <option value="Nepali">नेपाली</option>
              </select>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">Sign In</Button>
                <Button className="flex-1">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;