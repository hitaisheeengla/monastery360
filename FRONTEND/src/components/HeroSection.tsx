import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Route, Archive, Calendar, Sparkles, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/monastery-hero.jpg';
import FloatingTourGuideButton from '@/components/FloatingTourGuideButton';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    {
      title: 'Monasteries',
      description: 'Explore sites with immersive virtual tours.',
      icon: MapPin,
      path: '/explore',
      gradient: 'from-monastery-red via-monastery-saffron to-monastery-mountain',
      stats: '200+ Monasteries'
    },
    {
      title: 'Plan My Trip',
      description: 'Create your personalized spiritual journey',
      icon: Route,
      path: '/plan-trip',
      gradient: 'from-monastery-mountain via-prayer-blue to-prayer-green',
      stats: 'Smart Routing'
    },
    {
      title: 'Research Archives',
      description: 'Dive into ancient manuscripts & artifacts',
      icon: Archive,
      path: '/archives',
      gradient: 'from-monastery-saffron via-prayer-yellow to-prayer-red',
      stats: '1000+ Artifacts'
    },
    {
      title: 'Events Calendar',
      description: 'Join authentic cultural ceremonies',
      icon: Calendar,
      path: '/events',
      gradient: 'from-prayer-blue via-monastery-red to-monastery-saffron',
      stats: 'Live Events'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slowZoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-black/15 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-monastery-saffron/30 to-monastery-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-r from-monastery-mountain/30 to-prayer-blue/20 rounded-full blur-3xl animate-floatReverse" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-prayer-yellow/30 to-prayer-green/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-r from-monastery-red/20 to-monastery-saffron/30 rounded-full blur-2xl animate-float" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20 min-h-screen flex flex-col justify-center">
        <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-monastery-saffron animate-spin-slow" />
            <span className="text-sm font-medium">Experience Sacred Heritage Digitally</span>
            <Sparkles className="w-4 h-4 text-monastery-saffron animate-spin-slow" />
          </div>

          <h1 className="text-6xl lg:text-[5.6rem] font-bold mb-10 mx-2">
            <span className="block animate-slideInLeft">Journey Through</span>
            <span className="block bg-gradient-to-r from-monastery-saffron via-prayer-yellow to-monastery-saffron bg-clip-text text-transparent animate-slideInRight">
              Sikkim's Sacred Monasteries
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed animate-fadeInUp">
            Discover ancient wisdom through immersive 360° virtual tours, guided narrations, 
            and culturally rich experiences that bridge tradition with technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fadeInUp">
            <Link to={'/signup'}>
            <Button  size="lg" variant="hero" className="text-lg px-10 py-5 hover:scale-105 transition-all duration-300 shadow-2xl">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Begin Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-5 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Preview
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Links Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {quickLinks.map(({ title, description, icon: Icon, path, gradient, stats }, index) => (
            <Link key={title} to={path} className="group">
              <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-cultural ${
                activeCard === index ? 'ring-2 ring-monastery-saffron/50 bg-white/15' : ''
              }`}>
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-monastery-saffron transition-colors">{title}</h3>
                    <span className="text-xs bg-monastery-saffron/20 text-monastery-saffron px-2 py-1 rounded-full">{stats}</span>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{description}</p>
                  
                  <div className="flex items-center text-monastery-saffron text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Explore Now <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <FloatingTourGuideButton
      />


      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;