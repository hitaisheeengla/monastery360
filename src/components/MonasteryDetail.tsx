import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monastery } from '@/data/monasteries';
import { Pannellum } from 'pannellum-react';
import { Play, Pause, MapPin, Plus, Camera, Volume2, Info, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTripPlanner } from '@/hooks/useTripPlanner';

// ✅ Import your audio file
import tourAudio from '@/assets/rumtek.mp3';

interface MonasteryDetailProps {
  monastery: Monastery | null;
  isOpen: boolean;
  onClose: () => void;
}

const MonasteryDetail: React.FC<MonasteryDetailProps> = ({ monastery, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { addMonastery } = useTripPlanner();

  if (!monastery) return null;

  const handleAddToTrip = () => {
    addMonastery(monastery);
    toast({
      title: "Added to Trip!",
      description: `${monastery.name} has been added to your itinerary.`,
    });
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      toast({
        title: "Audio Paused",
        description: "Narrated tour paused",
      });
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio play error:", err);
      });
      setIsPlaying(true);
      toast({
        title: "Audio Playing",
        description: "Starting narrated walkthrough...",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between p-2">
              <div>
                <DialogTitle className="text-2xl mb-2">{monastery.name}</DialogTitle>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{monastery.location}</span>
                  </div>
                  <Badge variant="outline">{monastery.era}</Badge>
                </div>
              </div>
              <div className="flex space-x-2 mt-2 mr-1">
                <Button onClick={toggleAudio} variant="outline" size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Audio Tour'}
                </Button>
                <Button onClick={handleAddToTrip} variant="monastery" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Trip
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* ✅ Hidden audio element */}
          <audio ref={audioRef} src={tourAudio} preload="auto" />

          <div className="flex-1 overflow-y-auto p-6 pt-0">

            <Tabs defaultValue="tour" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tour" className="flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>360° Tour</span>
                </TabsTrigger>
                <TabsTrigger value="info" className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>History</span>
                </TabsTrigger>
                <TabsTrigger value="gallery" className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Gallery</span>
                </TabsTrigger>
              </TabsList>
              {/* ✅ Wrapper with margin so TabsList doesn't shift */}
              <div className="mt-6 min-h-[450px]">
                <TabsContent value="tour">
                  <div className="relative flex justify-center">
                    <Pannellum
                      width="95%"
                      height="400px"
                      image={monastery.panoramaUrl}
                      pitch={10}
                      yaw={180}
                      hfov={110}
                      autoLoad
                      showControls
                      showFullscreenCtrl
                      showZoomCtrl
                    />
                    {isPlaying && (
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-monastery-red animate-pulse" />
                        <span className="text-sm font-medium">Narrated Tour Playing</span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="info">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-monastery-red">Description</h3>
                      <p className="text-muted-foreground">{monastery.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-monastery-red">Foundation</h3>
                      <p className="text-muted-foreground">{monastery.historicalInfo.founded}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-monastery-red">Religious Significance</h3>
                      <p className="text-muted-foreground">{monastery.historicalInfo.significance}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-monastery-red">Architecture</h3>
                      <p className="text-muted-foreground">{monastery.historicalInfo.architecture}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {monastery.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${monastery.name} - Image ${index + 1}`}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto rounded-lg p-2"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MonasteryDetail;
