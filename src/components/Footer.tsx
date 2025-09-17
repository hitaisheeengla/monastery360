import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-muted/50 to-muted border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Monastery360
              </span>
            </Link>
            <p className="text-muted-foreground">
              Preserving and sharing Sikkim's sacred monastery heritage through immersive digital experiences.
            </p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                  Monasteries
                </Link>
              </li>
              <li>
                <Link to="/archives" className="text-muted-foreground hover:text-foreground transition-colors">
                  Digital Archives
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cultural Events
                </Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trip Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/journey" className="text-muted-foreground hover:text-foreground transition-colors">
                  Travel Guide
                </Link>
              </li>
              <li>
                <Link to="/post-trip" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@monastery360.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Gangtok, Sikkim, India</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-1 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" variant="default">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Monastery360. Preserving sacred heritage digitally.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;