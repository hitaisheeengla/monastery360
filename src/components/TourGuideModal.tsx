import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  X, 
  Send, 
  Mic, 
  Camera, 
  Globe, 
  Volume2, 
  VolumeX, 
  MapPin,
  MessageSquare,
  User,
  Bot
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
  image?: string;
  location?: { lat: number; lng: number; name: string };
  hasAudio?: boolean;
  isPlaying?: boolean;
}

interface TourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: { lat: number; lng: number; name: string };
}

const TourGuideModal: React.FC<TourGuideModalProps> = ({ 
  isOpen, 
  onClose, 
  currentLocation 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Welcome to your virtual tour guide! I can help you learn about monasteries, their history, and nearby attractions. What would you like to know?',
      timestamp: new Date(),
      hasAudio: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [isRecording, setIsRecording] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { value: 'auto', label: 'Auto Detect' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
    { value: 'ne', label: 'नेपाली' }
  ];

  const suggestedQuestions = [
    "Tell me about this monastery",
    "What's nearby?",
    "History of this place",
    "Cultural significance",
    "Best time to visit",
    "Photography spots"
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: generateAIResponse(inputText),
        timestamp: new Date(),
        hasAudio: true,
        image: Math.random() > 0.5 ? '/placeholder.svg' : undefined,
        location: currentLocation
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('history') || input.includes('monastery')) {
      return `This monastery has a rich history dating back centuries. Built by Tibetan monks, it serves as an important center for Buddhist teachings and meditation. The architecture reflects traditional Himalayan design with intricate woodwork and colorful prayer flags.`;
    }
    if (input.includes('nearby') || input.includes('around')) {
      return `Near your current location, you'll find several points of interest: traditional tea houses, local craft shops, meditation gardens, and scenic viewpoints. There's also a small museum showcasing Buddhist artifacts just 200 meters away.`;
    }
    return `Thank you for your question! I'd be happy to share more about the cultural and spiritual significance of this sacred place. Each monastery has unique features and stories that have been passed down through generations.`;
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    handleSendMessage();
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'auto' ? 'en-US' : selectedLanguage;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image uploaded:', file);
    }
  };

  const playAudio = (messageId: string, text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'auto' ? 'en-US' : selectedLanguage;
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isPlaying: true } : msg
      ));

      utterance.onend = () => {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isPlaying: false } : msg
        ));
      };

      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-5xl h-[95vh] max-h-[900px] p-0 gap-0 sm:rounded-xl">
          <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border bg-gradient-to-r from-card to-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-monastery-red to-prayer-gold flex items-center justify-center shadow-md">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-monastery-red to-prayer-gold bg-clip-text text-transparent">
                    Virtual Tour Guide
                  </DialogTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">Your AI-powered monastery companion</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9"
                >
                  {isAutoPlay ? <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
                {/* <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 sm:h-9 sm:w-9">
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button> */}
              </div>
              
            </div>
          </DialogHeader>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-accent/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    {message.type === 'ai' && (
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-monastery-red to-prayer-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div
                        className={`rounded-xl sm:rounded-lg p-3 sm:p-4 shadow-sm ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-monastery-red to-prayer-gold text-white ml-8 sm:ml-12'
                            : 'bg-card border border-border/50 backdrop-blur-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        
                        {message.image && (
                          <div className="mt-3">
                            <img
                              src={message.image}
                              alt="Tour guide visual"
                              className="rounded-lg max-w-full h-auto"
                            />
                          </div>
                        )}

                        {message.location && (
                          <div className="mt-3 p-3 bg-accent/50 rounded-lg border border-border/30">
                            <div className="flex items-center space-x-2 text-sm">
                              <MapPin className="h-4 w-4 text-monastery-red" />
                              <span className="font-medium">{message.location.name}</span>
                            </div>
                            <div className="mt-2 h-24 sm:h-32 bg-muted/50 rounded-md flex items-center justify-center border border-border/30">
                              <span className="text-xs sm:text-sm text-muted-foreground">Map Preview</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {message.hasAudio && message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => 
                              message.isPlaying 
                                ? stopAudio() 
                                : playAudio(message.id, message.text)
                            }
                            className="text-xs h-7 px-2 hover:bg-accent/50"
                          >
                            {message.isPlaying ? (
                              <VolumeX className="h-3 w-3 mr-1 text-monastery-red" />
                            ) : (
                              <Volume2 className="h-3 w-3 mr-1 text-monastery-red" />
                            )}
                            {message.isPlaying ? 'Stop' : 'Play Audio'}
                          </Button>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>

                    {message.type === 'user' && (
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
              <p className="w-full text-xs text-muted-foreground mb-2">Quick questions:</p>
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs h-7 hover:bg-accent/50 hover:border-monastery-red/30 transition-colors"
                >
                  {question}
                </Button>
              ))}
            </div>

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 sm:p-6 pt-3 sm:pt-4 border-t border-border bg-card/50">
            {/* Mobile-first responsive layout */}
            <div className="space-y-3 sm:space-y-0">
              {/* Language selector - full width on mobile */}
              <div className="sm:hidden">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full h-9">
                    <Globe className="h-4 w-4 mr-2" />
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

              {/* Desktop layout */}
              <div className="hidden sm:flex items-center space-x-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-36">
                    <Globe className="h-4 w-4 mr-1" />
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

                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your journey..."
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceInput}
                      className={`h-7 w-7 p-0 hover:bg-accent ${isRecording ? 'text-red-500 bg-red-50' : 'text-monastery-red'}`}
                    >
                      <Mic className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleImageUpload}
                      className="h-7 w-7 p-0 hover:bg-accent text-monastery-red"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-monastery-red to-prayer-gold hover:from-monastery-red/90 hover:to-prayer-gold/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile input layout */}
              <div className="sm:hidden flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your journey..."
                    className="pr-20 h-10"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceInput}
                      className={`h-8 w-8 p-0 hover:bg-accent ${isRecording ? 'text-red-500 bg-red-50' : 'text-monastery-red'}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleImageUpload}
                      className="h-8 w-8 p-0 hover:bg-accent text-monastery-red"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputText.trim()}
                  size="lg"
                  className="h-10 w-10 p-0 bg-gradient-to-r from-monastery-red to-prayer-gold hover:from-monastery-red/90 hover:to-prayer-gold/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {currentLocation && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-accent/30 rounded-md p-2">
                  <MapPin className="h-3 w-3 text-monastery-red" />
                  <span>Current location: {currentLocation.name}</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};

export default TourGuideModal;