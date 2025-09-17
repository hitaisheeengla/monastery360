import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  Map, 
  Headphones, 
  QrCode, 
  Calendar, 
  Navigation,
  FileText,
  Heart,
  Globe,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const FeaturesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            const cards = Array.from({ length: 9 }, (_, i) => i);
            cards.forEach((index, delay) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, delay * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Camera,
      title: '360° Virtual Tours',
      description: 'Immerse yourself in stunning panoramic views of monastery interiors and sacred spaces with cutting-edge virtual reality.',
      gradient: 'from-monastery-red to-monastery-saffron',
      stats: '50+ Tours',
      featured: true
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Navigate through Sikkim with detailed maps showing monastery locations and travel routes.',
      gradient: 'from-monastery-mountain to-prayer-blue',
      stats: 'Live GPS'
    },
    {
      icon: Headphones,
      title: 'Audio Narration',
      description: 'Listen to guided stories and historical accounts narrated by local monks and historians.',
      gradient: 'from-monastery-saffron to-prayer-yellow',
      stats: '100+ Stories'
    },
    {
      icon: QrCode,
      title: 'QR Digital Archives',
      description: 'Scan QR codes at monasteries to access exclusive digital content and artifacts.',
      gradient: 'from-prayer-green to-monastery-mountain',
      stats: 'AR Enhanced'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Stay updated with monastery festivals, ceremonies, and cultural celebrations.',
      gradient: 'from-prayer-blue to-monastery-red',
      stats: 'Live Calendar'
    },
    {
      icon: Navigation,
      title: 'Smart Trip Planning',
      description: 'Create personalized itineraries with AI-powered suggestions and local recommendations.',
      gradient: 'from-monastery-red to-prayer-red',
      stats: 'AI Powered',
      featured: true
    },
    {
      icon: FileText,
      title: 'Ancient Manuscripts',
      description: 'Explore digitized manuscripts, texts, and historical documents in ultra-high resolution.',
      gradient: 'from-monastery-saffron to-monastery-mountain',
      stats: '1000+ Docs'
    },
    {
      icon: Heart,
      title: 'Community Stories',
      description: 'Share and read experiences from fellow travelers and spiritual seekers worldwide.',
      gradient: 'from-prayer-yellow to-prayer-green',
      stats: 'Global Community'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Access content in English, Hindi, and Nepali for better cultural understanding.',
      gradient: 'from-monastery-mountain to-prayer-blue',
      stats: '3 Languages'
    }
  ];

  return (
    <section ref={sectionRef} className="py-28 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-monastery-saffron/20 to-prayer-yellow/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-monastery-red/20 to-monastery-mountain/20 rounded-full blur-3xl animate-floatReverse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-monastery-saffron/10 border border-monastery-saffron/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-monastery-saffron animate-spin-slow" />
            <span className="text-sm font-medium text-monastery-red">Cutting-Edge Technology</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="block">Experience Sacred Heritage</span>
            <span className="block bg-gradient-to-r from-monastery-red via-monastery-saffron to-prayer-blue bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Powered by AI, enhanced with AR, and designed for the modern spiritual seeker. 
            Bridge ancient wisdom with tomorrow's technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, gradient, stats, featured }, index) => (
            <Card 
              key={title} 
              className={`group relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 bg-gradient-card border-border/50 ${
                featured ? 'lg:col-span-1 ring-2 ring-monastery-saffron/20' : ''
              } ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Featured Badge */}
              {featured && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-monastery-saffron to-prayer-yellow text-white text-xs px-3 py-1 rounded-full font-medium">
                    Featured
                  </div>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardHeader className="text-center relative z-10 pb-4">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <CardTitle className="text-xl font-bold group-hover:text-monastery-red transition-colors duration-300">{title}</CardTitle>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-monastery-saffron group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <div className="inline-flex items-center bg-muted/50 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-monastery-red">{stats}</span>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {description}
                </CardDescription>
              </CardContent>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-monastery-red to-monastery-saffron transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-monastery-red/10 to-monastery-saffron/10 border border-monastery-red/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-monastery-red to-monastery-saffron rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to Begin Your Digital Pilgrimage?</h3>
              <p className="text-muted-foreground">Join thousands of travelers discovering Sikkim's sacred heritage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;