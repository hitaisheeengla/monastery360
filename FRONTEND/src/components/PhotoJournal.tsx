import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Image, Share2, Download, Heart, MapPin, Clock, Trash2 } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  timestamp: Date;
  location: string;
  monastery: string;
  likes: number;
  caption?: string;
}

export const PhotoJournal: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: '/api/placeholder/300/200',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      location: 'Main Prayer Hall',
      monastery: 'Rumtek Monastery',
      likes: 0,
      caption: 'Beautiful morning prayers'
    },
    {
      id: '2', 
      url: '/api/placeholder/300/200',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      location: 'Sacred Courtyard',
      monastery: 'Rumtek Monastery',
      likes: 2,
      caption: 'Peaceful courtyard with mountain views'
    }
  ]);

  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture
    setTimeout(() => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: `/api/placeholder/300/200?${Date.now()}`,
        timestamp: new Date(),
        location: 'Current Location',
        monastery: 'Rumtek Monastery',
        likes: 0,
        caption: 'New journey moment'
      };
      setPhotos(prev => [newPhoto, ...prev]);
      setIsCapturing(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          timestamp: new Date(),
          location: 'Gallery Upload',
          monastery: 'Selected Location',
          likes: 0
        };
        setPhotos(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLikePhoto = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleSharePhoto = (photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: `Photo from ${photo.monastery}`,
        text: `Check out this beautiful moment from my monastery journey at ${photo.location}`,
        url: window.location.href
      });
    } else {
      // Fallback
      navigator.clipboard?.writeText(
        `Beautiful moment from ${photo.monastery} at ${photo.location} - ${window.location.href}`
      );
      alert('Link copied to clipboard!');
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Card className="shadow-lg border-monastery-red/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-monastery-red">Photo Journey</h3>
          <Badge variant="secondary" className="bg-monastery-saffron/20 text-monastery-red">
            {photos.length} photos
          </Badge>
        </div>

        {/* Capture Controls */}
        <div className="flex space-x-2 mb-4">
          <Button
            onClick={handleCameraCapture}
            disabled={isCapturing}
            className="flex-1 bg-monastery-red hover:bg-monastery-red/90 text-white"
          >
            {isCapturing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Camera className="h-4 w-4 mr-2" />
            )}
            {isCapturing ? 'Capturing...' : 'Take Photo'}
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1"
          >
            <Image className="h-4 w-4 mr-2" />
            Upload
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Photo Grid */}
        <div className="space-y-3">
          {photos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No photos yet. Start capturing your journey!</p>
            </div>
          ) : (
            photos.map((photo) => (
              <div key={photo.id} className="bg-muted/20 rounded-lg p-3 space-y-3">
                {/* Photo */}
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={`${photo.monastery} - ${photo.location}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {formatTime(photo.timestamp)}
                  </div>
                </div>

                {/* Photo Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{photo.monastery}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {photo.location}
                      </div>
                      {photo.caption && (
                        <p className="text-sm text-muted-foreground mt-1">{photo.caption}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePhoto(photo.id)}
                        className="h-8 px-2"
                      >
                        <Heart className={`h-4 w-4 mr-1 ${photo.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="text-xs">{photo.likes}</span>
                      </Button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSharePhoto(photo)}
                        className="h-8 px-2"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Photo Stats */}
        {photos.length > 0 && (
          <div className="mt-4 p-3 bg-monastery-saffron/5 rounded-lg border border-monastery-saffron/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-monastery-red">{photos.length}</div>
                <div className="text-xs text-muted-foreground">Photos</div>
              </div>
              <div>
                <div className="text-lg font-bold text-monastery-red">
                  {photos.reduce((sum, photo) => sum + photo.likes, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div>
                <div className="text-lg font-bold text-monastery-red">
                  {new Set(photos.map(p => p.monastery)).size}
                </div>
                <div className="text-xs text-muted-foreground">Locations</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};