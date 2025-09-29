import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArchiveItem } from '@/data/archives';
import { Eye, Calendar, MapPin } from 'lucide-react';

interface ArchiveGalleryProps {
  archives: ArchiveItem[];
  onViewDetails: (archive: ArchiveItem) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'manuscript': return '📜';
    case 'mural': return '🎨';
    case 'document': return '📖';
    default: return '📚';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'manuscript': return 'bg-monastery-red/10 text-monastery-red border-monastery-red/20';
    case 'mural': return 'bg-monastery-saffron/10 text-monastery-saffron border-monastery-saffron/20';
    case 'document': return 'bg-monastery-mountain/10 text-monastery-mountain border-monastery-mountain/20';
    default: return 'bg-secondary/10 text-secondary border-secondary/20';
  }
};

const ArchiveGallery: React.FC<ArchiveGalleryProps> = ({ archives, onViewDetails }) => {
  if (archives.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">No archives found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {archives.map((archive) => (
        <Card key={archive.id} className="group hover:shadow-monastery transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={archive.thumbnail}
              alt={archive.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge 
              className={`absolute top-3 right-3 ${getTypeColor(archive.type)}`}
            >
              <span className="mr-1">{getTypeIcon(archive.type)}</span>
              {archive.type.charAt(0).toUpperCase() + archive.type.slice(1)}
            </Badge>
          </div>
          
          <CardHeader className="pb-3">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {archive.title}
            </CardTitle>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{archive.century}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate max-w-20">{archive.monastery.split(' ')[0]}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <CardDescription className="line-clamp-3 text-sm">
              {archive.description}
            </CardDescription>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {archive.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {archive.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{archive.tags.length - 2}
                </Badge>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={() => onViewDetails(archive)}
              className="w-full"
              variant="default"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ArchiveGallery;