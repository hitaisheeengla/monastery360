import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Shield, Cross } from 'lucide-react';

export const EmergencyBar: React.FC = () => {
  const emergencyContacts = [
    {
      id: 'ambulance',
      icon: Cross,
      label: 'Ambulance',
      number: '108',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Medical Emergency'
    },
    {
      id: 'helpline',
      icon: Phone,
      label: 'Tourist Helpline',
      number: '+91-3592-202-665',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: '24/7 Tourist Support'
    },
    {
      id: 'police',
      icon: Shield,
      label: 'Local Police',
      number: '100',
      color: 'bg-gray-700 hover:bg-gray-800',
      description: 'Police Emergency'
    }
  ];

  const handleEmergencyCall = (contact: typeof emergencyContacts[0]) => {
    // In a real app, this would initiate a phone call
    alert(`Calling ${contact.label}: ${contact.number}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center space-x-2">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground text-center mb-2">
              🚨 Emergency Quick Access
            </p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          {emergencyContacts.map((contact) => {
            const IconComponent = contact.icon;
            
            return (
              <Button
                key={contact.id}
                onClick={() => handleEmergencyCall(contact)}
                className={`${contact.color} text-white flex-1 max-w-[120px] h-14 flex-col py-2 px-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-200`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium leading-tight">
                  {contact.label}
                </span>
              </Button>
            );
          })}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          Tap any button to call emergency services
        </p>
      </div>
    </div>
  );
};