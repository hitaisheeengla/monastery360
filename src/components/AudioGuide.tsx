import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, Globe, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AudioGuideProps {
  isNearMonastery: boolean;
}

export const AudioGuide: React.FC<AudioGuideProps> = ({ isNearMonastery }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentArea, setCurrentArea] = useState<string | null>(null);

  const audioAreas = [
    { id: 'main-hall', name: 'Main Prayer Hall', description: 'This prayer hall was built in the 16th century...' },
    { id: 'courtyard', name: 'Sacred Courtyard', description: 'This courtyard hosts the annual Cham Dance...' },
    { id: 'library', name: 'Ancient Library', description: 'Houses rare Buddhist manuscripts...' },
    { id: 'meditation', name: 'Meditation Hall', description: 'A place of silent contemplation...' }
  ];

  const languages = [
    { value: 'english', label: '🇺🇸 English', flag: '🇺🇸' },
    { value: 'hindi', label: '🇮🇳 Hindi', flag: '🇮🇳' },
    { value: 'nepali', label: '🇳🇵 Nepali', flag: '🇳🇵' },
    { value: 'tibetan', label: '🏔️ Tibetan', flag: '🏔️' }
  ];

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const selectArea = (areaId: string) => {
    setCurrentArea(areaId);
    setIsPlaying(true);
  };

  return (
    <Card className="mb-6 shadow-lg border-monastery-red/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-monastery-red mb-2 flex items-center justify-center">
            <Volume2 className="mr-2 h-6 w-6" />
            Smart Audio Guide
          </h2>
          
          {/* Language Selection */}
          <div className="mb-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48 mx-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Play Button */}
          <Button
            onClick={toggleAudio}
            size="lg"
            className="w-24 h-24 rounded-full bg-monastery-red hover:bg-monastery-red/90 text-white shadow-xl hover:scale-105 transition-all duration-300"
            disabled={!isNearMonastery}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 ml-1" />
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground mt-2">
            {isNearMonastery 
              ? (isPlaying ? 'Audio guide is playing...' : 'Tap to start narration')
              : 'Get closer to the monastery to access audio guide'
            }
          </p>
        </div>

        {/* Area Triggers */}
        {isNearMonastery && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-monastery-red" />
              Explore Areas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {audioAreas.map((area) => (
                <Button
                  key={area.id}
                  onClick={() => selectArea(area.id)}
                  variant={currentArea === area.id ? "monastery" : "outline"}
                  className="h-auto p-3 flex-col items-start"
                >
                  <span className="font-semibold text-sm">{area.name}</span>
                  <span className="text-xs opacity-75 text-left">
                    Tap to hear about this area
                  </span>
                </Button>
              ))}
            </div>
            
            {currentArea && (
              <div className="mt-4 p-4 bg-monastery-saffron/10 rounded-lg border border-monastery-saffron/30">
                <h4 className="font-semibold text-monastery-red">
                  {audioAreas.find(a => a.id === currentArea)?.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {audioAreas.find(a => a.id === currentArea)?.description}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};