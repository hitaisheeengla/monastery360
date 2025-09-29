import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArchiveItem } from '@/data/archives';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Plus, 
  Calendar, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  ExternalLink,
  Tag,
  Clock
} from 'lucide-react';

interface ArchiveDetailModalProps {
  archive: ArchiveItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArchiveDetailModal: React.FC<ArchiveDetailModalProps> = ({ archive, isOpen, onClose }) => {
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { toast } = useToast();

  if (!archive) return null;

  const handleZoomIn = () => setImageScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setImageScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setImageRotation(prev => (prev + 90) % 360);
  
  const handleDownload = () => {
    if (archive.downloadable) {
      // In a real app, this would trigger actual download
      toast({
        title: "Download Started",
        description: `${archive.title} is being prepared for download.`,
      });
    } else {
      toast({
        title: "Download Restricted",
        description: "This archive item is not available for download.",
        variant: "destructive",
      });
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
    setImageScale(1);
    setImageRotation(0);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              {archive.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative group cursor-pointer" onClick={openImageModal}>
                <img
                  src={archive.highResImage}
                  alt={archive.title}
                  className="w-full h-96 rounded-lg border-2 border-border/50 hover:border-primary/50 transition-colors "
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!archive.downloadable}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {archive.downloadable ? 'Download' : 'Restricted'}
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="font-medium">{archive.century}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{archive.year}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Monastery */}
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Primary Location</p>
                  <p className="font-medium">{archive.monastery}</p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {archive.description}
                </p>
              </div>

              <Separator />

              {/* Tags */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Tags</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {archive.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Related Monasteries */}
              {archive.relatedMonasteries.length > 1 && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Related Monasteries</h4>
                    </div>
                    <div className="space-y-2">
                      {archive.relatedMonasteries.slice(1).map((monastery) => (
                        <Button key={monastery} variant="outline" size="sm" className="mr-2">
                          {monastery}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-Screen Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2  fixed left-[50%] top-[50%]">
          <div className="relative w-full h-full flex flex-col">
            {/* Controls */}
            <div className="flex justify-between items-center p-2 bg-background/80 backdrop-blur-sm rounded-lg mb-2">
              <h3 className="font-semibold truncate">{archive.title}</h3>
              <div className="flex space-x-1 mr-6 mt-3">
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-muted/30 rounded-lg"
            style={{ maxHeight: '80vh', maxWidth: '90vw' }}>
              <img
                src={archive.highResImage}
                alt={archive.title}
                style={{
                  transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                  transition: 'transform 0.2s ease',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                className="rounded-lg"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArchiveDetailModal;