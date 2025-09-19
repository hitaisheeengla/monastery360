import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Route, Clock, Footprints, Trophy, Camera, Heart, Zap, Target } from 'lucide-react';

export const JourneyStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalDistance: 0,
    timeElapsed: 0,
    stepsWalked: 0,
    monasteryVisited: 0,
    photosToken: 0,
    culturalPoints: 0,
    achievements: 3,
    currentSpeed: 0
  });

  const [achievements] = useState([
    { 
      id: 'first-monastery', 
      name: 'First Steps', 
      description: 'Visited your first monastery',
      icon: Trophy,
      unlocked: true,
      progress: 100
    },
    { 
      id: 'photographer', 
      name: 'Memory Keeper', 
      description: 'Take 10 photos during journey',
      icon: Camera,
      unlocked: false,
      progress: 60
    },
    { 
      id: 'distance-walker', 
      name: 'Pilgrim Walker', 
      description: 'Walk 5km during monastery visits',
      icon: Footprints,
      unlocked: false,
      progress: 75
    },
    { 
      id: 'cultural-explorer', 
      name: 'Cultural Explorer', 
      description: 'Learn about 3 different monasteries',
      icon: Target,
      unlocked: true,
      progress: 100
    }
  ]);

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalDistance: prev.totalDistance + Math.random() * 0.1,
        timeElapsed: prev.timeElapsed + 1,
        stepsWalked: prev.stepsWalked + Math.floor(Math.random() * 3),
        currentSpeed: 15 + Math.random() * 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDistance = (km: number) => {
    return km.toFixed(1);
  };

  return (
    <Card className="shadow-lg border-monastery-red/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-monastery-red">Journey Statistics</h3>
          <Badge variant="secondary" className="bg-monastery-saffron/20 text-monastery-red">
            Live Tracking
          </Badge>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Route className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Distance</span>
            </div>
            <div className="text-xl font-bold text-blue-700">{formatDistance(stats.totalDistance)} km</div>
            <div className="text-xs text-muted-foreground">Total traveled</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <div className="text-xl font-bold text-green-700">{formatTime(stats.timeElapsed)}</div>
            <div className="text-xs text-muted-foreground">Journey time</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Footprints className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Steps</span>
            </div>
            <div className="text-xl font-bold text-purple-700">{stats.stepsWalked.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Walking steps</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Camera className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Photos</span>
            </div>
            <div className="text-xl font-bold text-orange-700">{stats.photosToken}</div>
            <div className="text-xs text-muted-foreground">Memories captured</div>
          </div>
        </div>

        {/* Speed Indicator */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Current Speed</span>
            </div>
            <span className="text-sm font-bold">{stats.currentSpeed.toFixed(1)} km/h</span>
          </div>
          <Progress value={Math.min((stats.currentSpeed / 40) * 100, 100)} className="h-2" />
        </div>

        {/* Achievements Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-monastery-red">Journey Achievements</h4>
            <Badge variant="outline" className="text-xs">
              {achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked
            </Badge>
          </div>

          <div className="space-y-2">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border transition-all ${
                    achievement.unlocked 
                      ? 'bg-monastery-saffron/10 border-monastery-saffron/30' 
                      : 'bg-muted/20 border-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-monastery-saffron/20' : 'bg-muted/40'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        achievement.unlocked ? 'text-monastery-red' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium text-sm ${
                          achievement.unlocked ? 'text-monastery-red' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </span>
                        {achievement.unlocked && (
                          <Trophy className="h-3 w-3 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {!achievement.unlocked && (
                        <Progress value={achievement.progress} className="h-1" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};