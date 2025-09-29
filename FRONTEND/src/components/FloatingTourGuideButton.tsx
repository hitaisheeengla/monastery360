import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, X, Send, Mic, MicOff, Volume2, Settings,MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface FloatingTourGuideButtonProps {
  currentLocation?: { lat: number; lng: number; name: string };
}

const FloatingTourGuideButton: React.FC<FloatingTourGuideButtonProps> = ({ 
  currentLocation 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🙏 Namaste! I\'m Tenzin, your AI monastery guide. I can help you explore Sikkim\'s sacred monasteries, their history, meditation practices, and spiritual significance. What would you like to discover today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const playNotificationSound = () => {
    if (soundEnabled) {
      // You can add actual audio file here
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore errors
    }
  };

  const simulateTyping = async (responseText: string) => {
    setIsTyping(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    setIsTyping(false);
    
    // Add message with typing effect
    const newMessage: Message = {
      id: Date.now().toString(),
      text: '',
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Type out the message character by character
    for (let i = 0; i <= responseText.length; i++) {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, text: responseText.slice(0, i) }
          : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
    }
    
    playNotificationSound();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI responses based on content
    const responses = [
      "🏯 Rumtek Monastery, also known as the Dharmachakra Centre, is the largest monastery in Sikkim. Built in the 1960s, it's a perfect replica of the original Rumtek in Tibet. The monastery houses precious relics, including the Golden Stupa containing the 16th Karmapa's relics. Would you like to know about visiting hours or the meditation sessions held there?",
      
      "✨ Pemayangtse Monastery, meaning 'Perfect Sublime Lotus,' sits 2085 meters above sea level. Founded in 1705, it belongs to the Nyingma order and offers breathtaking views of Kanchenjunga. The monastery's seven-tiered wooden sculpture depicting heaven and hell is truly remarkable. The best time to visit is during the Chaam dance festival in February/March.",
      
      "🙏 Enchey Monastery, built in 1909, is located on a hilltop in Gangtok. 'Enchey' means 'solitary temple' in the local language. The monastery follows the Nyingma tradition and is famous for its annual Chaam dance performed by masked monks. The peaceful environment makes it perfect for meditation and spiritual reflection.",
      
      "📿 Each monastery follows specific prayer schedules. Morning prayers usually begin at 5:30 AM, followed by afternoon sessions at 4:00 PM. The evening prayers start around 7:00 PM. During festivals like Losar (Tibetan New Year) and Buddha Purnima, special ceremonies extend throughout the day. Which monastery's schedule interests you most?",
      
      "🌸 The monasteries practice various meditation techniques including Shamatha (calm abiding), Vipassana (insight meditation), and Tonglen (taking and giving). Many offer meditation courses for visitors. The serene mountain environment enhances the spiritual experience. Would you like guidance on joining a meditation session?"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await simulateTyping(randomResponse);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition here
  };

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      <div className=" bottom-20 fixed right-12 z-50">
        {!isOpen && (
          <div className="relative">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-monastery-red/30 to-prayer-gold/30 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-monastery-red/20 to-prayer-gold/20 animate-pulse" />
            
            <Button
              size="lg"
              className="relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-monastery-red to-prayer-gold hover:from-monastery-red/90 hover:to-prayer-gold/90 border-2 border-white/20 transition-all duration-300 hover:scale-110 group"
              onClick={() => setIsOpen(true)}
            >
              
               <svg viewBox="0 0 24 24" className="h-7 w-7 text-white">
  <path 
    d="M4 4h16v12H5.17L4 17.17V4z" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  />
  <circle cx="12" cy="10" r="1" fill="currentColor"/>
  <circle cx="16" cy="10" r="1" fill="currentColor"/>
  <circle cx="8" cy="10" r="1" fill="currentColor"/>
</svg>


               

              
              {/* Tooltip */}
              <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                🏯 Ask Monastery AI Guide
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-black/80 border-y-4 border-y-transparent"></div>
              </div>
            </Button>
          </div>
        )}

        {/* Enhanced Chat Interface */}
        {isOpen && (
          <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col animate-in slide-in-from-right-5 duration-500">
            
            {/* Header with AI Avatar */}
            <div className="bg-gradient-to-br from-monastery-red to-prayer-gold p-4 rounded-t-2xl border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white/30">
                    <AvatarImage src="/monk-avatar.jpg" />
                    <AvatarFallback className="bg-white/20 text-white font-bold">🧘</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Tenzin - AI Monastery Guide</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80 text-xs">Online • Powered by AI</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    <Volume2 className={`h-4 w-4 ${soundEnabled ? '' : 'line-through'}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[280px] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-monastery-red to-prayer-gold text-white ml-8'
                        : 'bg-white border border-gray-200 text-gray-800 mr-8 shadow-sm'
                    } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-monastery-red to-prayer-gold flex items-center justify-center">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">AI Guide</span>
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    
                    <div className="flex justify-end mt-2">
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mr-8 shadow-sm animate-pulse">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-monastery-red to-prayer-gold flex items-center justify-center">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Tenzin is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm rounded-b-2xl">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about monasteries, meditation, festivals..."
                    className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-monastery-red focus:border-transparent transition-all duration-200 text-sm"
                    disabled={isTyping}
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-monastery-red"
                    onClick={toggleVoiceInput}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="h-12 w-12 bg-gradient-to-br from-monastery-red to-prayer-gold hover:from-monastery-red/90 hover:to-prayer-gold/90 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  <Send className="h-5 w-5 text-white" />
                </Button>
              </div>
              
              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {['🏯 Best monasteries', '🧘 Meditation sessions', '🎭 Festivals', '📍 Nearby locations'].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-3 rounded-full border-monastery-red/30 text-monastery-red hover:bg-monastery-red/10"
                    onClick={() => setInputText(suggestion.split(' ').slice(1).join(' '))}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingTourGuideButton;
