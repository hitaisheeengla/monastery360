import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, X } from 'lucide-react';
import TourGuideModal from './TourGuideModal';

interface FloatingTourGuideButtonProps {
  currentLocation?: { lat: number; lng: number; name: string };
}

const FloatingTourGuideButton: React.FC<FloatingTourGuideButtonProps> = ({ 
  currentLocation 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Expanded Info Card */}
        {isExpanded && (
          <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs animate-in slide-in-from-right-5 duration-300">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-monastery-red to-prayer-gold flex-shrink-0 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground">Virtual Tour Guide</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Get instant answers about monasteries, history, and nearby attractions
                </p>
                <Button 
                  size="sm" 
                  className="mt-3 w-full h-8"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsExpanded(false);
                  }}
                >
                  Start Conversation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-monastery-red to-prayer-gold hover:from-monastery-red/90 hover:to-prayer-gold/90 border-0 transition-all duration-300 hover:scale-110"
          onClick={() => {
            if (isExpanded) {
              setIsModalOpen(true);
              setIsExpanded(false);
            } else {
              setIsExpanded(true);
            }
          }}
          onMouseEnter={() => !isModalOpen && setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageSquare className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Tour Guide Modal */}
      <TourGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLocation={currentLocation}
      />
    </>
  );
};

export default FloatingTourGuideButton;