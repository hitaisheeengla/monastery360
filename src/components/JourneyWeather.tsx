import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  AlertTriangle,
} from 'lucide-react';

export const SmallWeatherModal: React.FC = () => {
  const [weather] = useState({
    temperature: 18,
    condition: 'partly-cloudy',
    humidity: 65,
    windSpeed: 12,
    alerts: ['High altitude - stay hydrated'],
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-600" />;
      case 'light-rain':
      case 'rain':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'Sunny';
      case 'partly-cloudy':
        return 'Partly Cloudy';
      case 'cloudy':
        return 'Cloudy';
      case 'light-rain':
        return 'Light Rain';
      case 'rain':
        return 'Rain';
      default:
        return 'Clear';
    }
  };

  return (
    <Card className="w-full  shadow-md border rounded-md">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Weather</h3>
          <Badge variant="outline" className="text-[10px] py-0.5 px-1.5">
            Gangtok
          </Badge>
        </div>

        {/* Temperature & Condition */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.condition)}
            <div className="text-lg font-bold">{weather.temperature}°C</div>
          </div>
          <div className="text-xs text-muted-foreground">
            {getConditionText(weather.condition)}
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-background p-2 rounded">
            <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
            <div>Humidity</div>
            <div className="font-semibold">{weather.humidity}%</div>
          </div>
          <div className="bg-background p-2 rounded">
            <Wind className="h-4 w-4 text-gray-500 mx-auto mb-1" />
            <div>Wind</div>
            <div className="font-semibold">{weather.windSpeed} km/h</div>
          </div>
        </div>

        {/* Alert if present */}
        {weather.alerts.length > 0 && (
          <div className="flex items-start space-x-2 text-xs bg-orange-50 p-2 border border-orange-200 rounded">
            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
            <span className="text-orange-800">{weather.alerts[0]}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
