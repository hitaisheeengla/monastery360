import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Users, Heart, AlertTriangle, Clock, Camera, Volume2, Shirt } from 'lucide-react';

export const CulturalTips: React.FC = () => {
  const [readTips, setReadTips] = useState<string[]>([]);

  const culturalTips = [
    {
      id: 'dress-code',
      icon: Shirt,
      category: 'Dress Code',
      title: 'Appropriate Clothing',
      importance: 'high',
      content: `
        • Dress modestly - cover shoulders and knees
        • Remove shoes before entering prayer halls
        • Avoid wearing leather items inside sacred areas
        • Bright colors are welcome, but avoid all-black attire
        • Carry a scarf or shawl for additional coverage
      `,
      tips: [
        'Wear comfortable, modest clothing',
        'Bring socks for walking on cold monastery floors',
        'Avoid tight or revealing clothing'
      ]
    },
    {
      id: 'prayer-etiquette',
      icon: Heart,
      category: 'Prayer Etiquette', 
      title: 'During Prayer Sessions',
      importance: 'high',
      content: `
        • Maintain silence during prayer sessions
        • Sit cross-legged or in meditation posture
        • Keep hands respectfully placed
        • Do not point feet toward Buddha statues
        • Follow the lead of monks and locals
      `,
      tips: [
        'Observe quietly without interrupting',
        'Turn off all electronic devices',
        'Stay for the entire session if you join'
      ]
    },
    {
      id: 'photography',
      icon: Camera,
      category: 'Photography',
      title: 'Photo Guidelines',
      importance: 'medium',
      content: `
        • Always ask permission before photographing people
        • No flash photography inside prayer halls
        • Some areas may be completely photography-free
        • Respect privacy during religious ceremonies
        • Be mindful of sacred objects and statues
      `,
      tips: [
        'Ask monks before taking their photos',
        'Use natural light when possible',
        'Respect "No Photography" signs'
      ]
    },
    {
      id: 'interaction',
      icon: Users,
      category: 'Social Interaction',
      title: 'Interacting with Monks',
      importance: 'medium',
      content: `
        • Greet with "Namaste" or "Tashi Delek"
        • Maintain respectful distance
        • Do not touch monks without permission
        • Speak softly and calmly
        • Show genuine interest in learning
      `,
      tips: [
        'Ask questions about Buddhism respectfully',
        'Listen actively when monks speak',
        'Avoid personal or inappropriate questions'
      ]
    },
    {
      id: 'timing',
      icon: Clock,
      category: 'Timing',
      title: 'Best Times to Visit',
      importance: 'low',
      content: `
        • Early morning prayers (5:00-7:00 AM)
        • Evening prayers (6:00-8:00 PM)  
        • Avoid meal times (12:00-1:00 PM)
        • Special festivals and ceremonies
        • Check monastery schedules in advance
      `,
      tips: [
        'Arrive 15 minutes early for ceremonies',
        'Some monasteries close during lunch',
        'Festival days may have restricted access'
      ]
    },
    {
      id: 'offerings',
      icon: Heart,
      category: 'Offerings & Donations',
      title: 'Making Offerings',
      importance: 'medium',
      content: `
        • Butter lamps and incense are common offerings
        • Monetary donations support monastery upkeep
        • Offer with both hands as a sign of respect
        • White scarves (khata) are traditional offerings
        • Food offerings should be vegetarian
      `,
      tips: [
        'Small denominations are perfectly acceptable',
        'Ask where to place offerings',
        'Bow slightly when making offerings'
      ]
    }
  ];

  const markAsRead = (tipId: string) => {
    if (!readTips.includes(tipId)) {
      setReadTips(prev => [...prev, tipId]);
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 text-xs">Essential</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Important</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Good to Know</Badge>;
      default:
        return null;
    }
  };

  const completionPercentage = Math.round((readTips.length / culturalTips.length) * 100);

  return (
    <Card className="shadow-lg border-monastery-red/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-monastery-red flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Cultural Guidelines
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-monastery-saffron/20 text-monastery-red text-xs">
              {readTips.length}/{culturalTips.length} read
            </Badge>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-4 p-3 bg-monastery-saffron/5 rounded-lg border border-monastery-saffron/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Cultural Preparation</span>
            <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-monastery-red rounded-full h-2 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Essential Tips Alert */}
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800">Before You Enter</p>
              <p className="text-xs text-orange-700 mt-1">
                Please review dress code and prayer etiquette guidelines before visiting the monastery.
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Tips Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {culturalTips.map((tip) => {
            const IconComponent = tip.icon;
            const isRead = readTips.includes(tip.id);
            
            return (
              <AccordionItem key={tip.id} value={tip.id} className="border-b border-muted">
                <AccordionTrigger 
                  className="hover:no-underline py-3"
                  onClick={() => markAsRead(tip.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        tip.importance === 'high' ? 'bg-red-100' : 
                        tip.importance === 'medium' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          tip.importance === 'high' ? 'text-red-600' : 
                          tip.importance === 'medium' ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm flex items-center space-x-2">
                          <span>{tip.title}</span>
                          {isRead && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{tip.category}</div>
                      </div>
                    </div>
                    {getImportanceBadge(tip.importance)}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-4">
                  <div className="ml-12 space-y-3">
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {tip.content}
                    </div>
                    
                    {tip.tips.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2 text-monastery-red">Quick Tips:</h5>
                        <ul className="space-y-1">
                          {tip.tips.map((quickTip, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start">
                              <div className="w-1 h-1 bg-monastery-red rounded-full mt-2 mr-2 flex-shrink-0" />
                              {quickTip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800 font-medium">
                Great! You're well prepared for your monastery visit.
              </p>
            </div>
          </div>
        )}

        {/* Audio Guidelines Toggle */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Volume2 className="h-4 w-4 mr-2" />
            <span className="text-sm">Listen to Audio Guidelines</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};