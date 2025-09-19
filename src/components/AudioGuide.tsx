import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, History, Mic, MicOff, Clock, Calendar, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Monastery } from '@/data/monasteries';

interface AudioGuideProps {
  isNearMonastery: boolean;
  currentMonastery?: Monastery;
}

export const AudioGuide: React.FC<AudioGuideProps> = ({ isNearMonastery, currentMonastery }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(300); // 5 minutes default
  const [volume, setVolume] = useState(0.8);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const audioAreas = [
    { 
      id: 'main-hall', 
      name: 'Main Prayer Hall', 
      description: 'This magnificent prayer hall was built in the 16th century and serves as the heart of monastery life. The intricate murals on the walls depict the life of Buddha and important Buddhist teachings.',
      duration: '4:30',
      content: currentMonastery ? `Welcome to the main prayer hall of ${currentMonastery.name}. ${currentMonastery.description}` : 'Welcome to the main prayer hall.'
    },
    { 
      id: 'courtyard', 
      name: 'Sacred Courtyard', 
      description: 'This sacred courtyard hosts the annual Cham Dance festival and serves as a gathering place for monks and visitors. The ancient stone carvings tell stories of Buddhist mythology.',
      duration: '3:45',
      content: 'You are now in the sacred courtyard, a place where centuries of spiritual gatherings have taken place.'
    },
    { 
      id: 'library', 
      name: 'Ancient Library', 
      description: 'This library houses rare Buddhist manuscripts, some over 800 years old. The collection includes texts in Sanskrit, Tibetan, and other ancient languages.',
      duration: '5:15',
      content: 'The ancient library contains invaluable Buddhist scriptures and teachings passed down through generations.'
    },
    { 
      id: 'meditation', 
      name: 'Meditation Hall', 
      description: 'A place of silent contemplation where monks practice daily meditation. The peaceful atmosphere and traditional architecture create perfect conditions for spiritual practice.',
      duration: '6:00',
      content: 'Enter the meditation hall, where silence speaks volumes and inner peace is cultivated daily.'
    }
  ];

  const languages = [
    { value: 'english', label: '🇺🇸 English', flag: '🇺🇸' },
    { value: 'hindi', label: '🇮🇳 Hindi', flag: '🇮🇳' },
    { value: 'nepali', label: '🇳🇵 Nepali', flag: '🇳🇵' },
    { value: 'tibetan', label: '🏔️ Tibetan', flag: '🏔️' }
  ];

  // Request audio permissions and auto-start when near monastery
  useEffect(() => {
    if (isNearMonastery && !hasAudioPermission) {
      requestAudioPermission();
    }
  }, [isNearMonastery]);

  // Progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          const newProgress = prev + (100 / audioDuration);
          if (newProgress >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, audioDuration]);

  const requestAudioPermission = async () => {
    try {
      setIsLoading(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasAudioPermission(true);
      // Auto-start audio guide when permission granted
      if (currentMonastery) {
        setTimeout(() => {
          playAudioContent(currentMonastery.description);
        }, 1000);
      }
    } catch (error) {
      console.error('Audio permission denied:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudioContent = (content: string) => {
    if ('speechSynthesis' in window) {
      // Stop any existing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.volume = volume;
      utterance.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 
                      selectedLanguage === 'nepali' ? 'ne-NP' : 'en-US';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setAudioProgress(0);
      };
      
      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (currentArea) {
        const area = audioAreas.find(a => a.id === currentArea);
        if (area) playAudioContent(area.content);
      }
      setIsPlaying(true);
    }
  };

  const selectArea = (areaId: string) => {
    setCurrentArea(areaId);
    const area = audioAreas.find(a => a.id === areaId);
    if (area && hasAudioPermission) {
      playAudioContent(area.content);
    }
  };

  const skipForward = () => {
    setAudioProgress(prev => Math.min(prev + 10, 100));
  };

  const skipBackward = () => {
    setAudioProgress(prev => Math.max(prev - 10, 0));
  };

  return (
    <Card className="mb-6 shadow-lg border-monastery-red/20 bg-gradient-to-br from-background to-monastery-red/5">
      <CardContent className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-monastery-red flex items-center">
              <Volume2 className="mr-2 h-6 w-6" />
              Smart Audio Guide
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="text-monastery-red hover:bg-monastery-red/10"
              >
                <History className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="bg-monastery-saffron/20 text-monastery-red">
                {hasAudioPermission ? <Mic className="h-3 w-3 mr-1" /> : <MicOff className="h-3 w-3 mr-1" />}
                {hasAudioPermission ? 'Audio Enabled' : 'Audio Disabled'}
              </Badge>
            </div>
          </div>

          {!hasAudioPermission && isNearMonastery && (
            <div className="mb-4 p-3 bg-monastery-saffron/10 rounded-lg border border-monastery-saffron/30">
              <p className="text-sm text-monastery-red mb-2">Enable audio for immersive experience</p>
              <Button 
                onClick={requestAudioPermission} 
                size="sm" 
                disabled={isLoading}
                className="bg-monastery-red hover:bg-monastery-red/90"
              >
                {isLoading ? 'Requesting...' : 'Enable Audio Guide'}
              </Button>
            </div>
          )}
          
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

          {/* Audio Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={skipBackward}
              disabled={!hasAudioPermission || !isNearMonastery}
              className="text-monastery-red hover:bg-monastery-red/10"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            {/* Main Play Button */}
            <Button
              onClick={toggleAudio}
              size="lg"
              className="w-20 h-20 rounded-full bg-monastery-red hover:bg-monastery-red/90 text-white shadow-xl hover:scale-105 transition-all duration-300"
              disabled={!isNearMonastery || !hasAudioPermission}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={skipForward}
              disabled={!hasAudioPermission || !isNearMonastery}
              className="text-monastery-red hover:bg-monastery-red/10"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="w-full max-w-md mx-auto mb-4">
              <Progress value={audioProgress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.floor((audioProgress / 100) * audioDuration)}s</span>
                <span>{audioDuration}s</span>
              </div>
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isNearMonastery 
              ? (isPlaying ? 'Audio guide is narrating...' : hasAudioPermission ? 'Tap to start narration' : 'Enable audio to continue')
              : 'Get closer to the monastery to access audio guide'
            }
          </p>
        </div>

        {/* Monastery History Section */}
        {showHistory && currentMonastery && (
          <div className="mb-6 p-4 bg-monastery-saffron/5 rounded-lg border border-monastery-saffron/20">
            <h3 className="text-lg font-semibold text-monastery-red mb-3 flex items-center">
              <History className="mr-2 h-5 w-5" />
              {currentMonastery.name} History
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Calendar className="h-4 w-4 text-monastery-red mt-0.5" />
                <div>
                  <p className="font-medium">Founded: {currentMonastery.historicalInfo.founded}</p>
                  <p className="text-muted-foreground">Era: {currentMonastery.era}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="h-4 w-4 text-monastery-red mt-0.5" />
                <div>
                  <p className="font-medium">Significance</p>
                  <p className="text-muted-foreground">{currentMonastery.historicalInfo.significance}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Volume2 className="h-4 w-4 text-monastery-red mt-0.5" />
                <div>
                  <p className="font-medium">Architecture</p>
                  <p className="text-muted-foreground">{currentMonastery.historicalInfo.architecture}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Area Triggers */}
        {isNearMonastery && hasAudioPermission && (
          <div className="space-y-4">
            <Separator />
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Volume2 className="mr-2 h-5 w-5 text-monastery-red" />
              Audio Zones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {audioAreas.map((area) => (
                <Card 
                  key={area.id} 
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    currentArea === area.id ? 'border-monastery-red bg-monastery-red/5' : 'border-border hover:border-monastery-red/30'
                  }`}
                  onClick={() => selectArea(area.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-monastery-red">{area.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {area.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{area.description}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant={currentArea === area.id ? "default" : "outline"}
                      className="flex-1"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {currentArea === area.id && isPlaying ? 'Playing' : 'Listen'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};