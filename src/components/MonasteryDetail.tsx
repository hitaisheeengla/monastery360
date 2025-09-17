import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monastery } from '@/data/monasteries';
import { Pannellum } from 'pannellum-react';
import { 
  Play, 
  Pause, 
  MapPin, 
  Calendar, 
  Plus, 
  QrCode,
  Camera,
  Volume2,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTripPlanner } from '@/hooks/useTripPlanner';

interface MonasteryDetailProps {
  monastery: Monastery | null;
  isOpen: boolean;
  onClose: () => void;
}

const MonasteryDetail: React.FC<MonasteryDetailProps> = ({ monastery, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Audio Paused" : "Audio Playing", 
      description: isPlaying ? "Narrated tour paused" : "Starting narrated walkthrough...",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between">
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
              <div className="flex space-x-2">
                <Button onClick={toggleAudio} variant="outline" size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Audio Tour'}
                </Button>
                <Button onClick={handleAddToTrip} variant="monastery" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Trip
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 pt-0">
            <Tabs defaultValue="tour" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
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
                <TabsTrigger value="qr" className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4" />
                  <span>Digital Archives</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tour" className="mt-6">
                <div className="relative">
                  <Pannellum
                    width="100%"
                    height="500px"
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
                <p className="mt-4 text-muted-foreground">
                  {monastery.description}
                </p>
              </TabsContent>

              <TabsContent value="info" className="mt-6">
                <div className="space-y-6">
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

              <TabsContent value="gallery" className="mt-6">
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

              <TabsContent value="qr" className="mt-6">
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-background rounded-lg shadow-cultural">
                    <img
                      src={monastery.qrCode}
                      alt="QR Code for Digital Archives"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Digital Archives Access</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Scan this QR code with your mobile device to access exclusive digital archives, 
                    manuscripts, and historical documents related to {monastery.name}.
                  </p>
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </TabsContent>
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
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MonasteryDetail;