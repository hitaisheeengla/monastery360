import React, { useState, useMemo } from 'react';
import { monasteries } from '@/data/monasteries';
import SearchFilters from '@/components/SearchFilters';
import InteractiveMap from '@/components/InteractiveMap';
import MonasteryCard from '@/components/MonasteryCard';
import MonasteryDetail from '@/components/MonasteryDetail';
import { Monastery } from '@/data/monasteries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Landmark, Eye, Navigation } from 'lucide-react';
import Map from '@/components/map';

// import "mapbox-gl/dist/mapbox-gl.css";



const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [eraFilter, setEraFilter] = useState('all');
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);

  const filteredMonasteries = useMemo(() => {
    return monasteries.filter((monastery) => {
      const matchesSearch = monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = locationFilter === 'all' ||
        monastery.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesEra = eraFilter === 'all' ||
        monastery.era.toLowerCase().includes(eraFilter.toLowerCase());

      return matchesSearch && matchesLocation && matchesEra;
    });
  }, [searchQuery, locationFilter, eraFilter]);

  const handleViewDetails = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
  };

  const handleMonasterySelect = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
  };

  const isFiltered = searchQuery !== '' || locationFilter !== 'all' || eraFilter !== 'all';
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">

          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              Explore Sacred Monasteries
            </h1>
            <Sparkles className="h-8 w-8 text-amber-400 animate-pulse" />
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the spiritual heritage of Sikkim through immersive virtual tours,
            historical insights, and interactive exploration.
          </p>
        </div>



        <Tabs defaultValue="map" className="mb-8 ">
          <div className='w-auto inline-flex'>
          <TabsList className="w-full h-12 flex justify-center mb-1">
            <TabsTrigger value="map" className='lg:text-lg  text-sm'>
              <MapPin className="mr-2 h-5 w-5  text-monastery-red" />
              <div className="hidden md:block">
  Interactive Monastery Map
</div>
              
            </TabsTrigger>
            <TabsTrigger value="collection" className='lg:text-lg  text-sm'>
              <Landmark className="mr-2 h-5 w-5 text-monastery-red" />
              <div className="hidden md:block">
  Monasteries Collection
</div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="map">
            {/* Search & Filters */}
            <div className="w-full">
              <SearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                eraFilter={eraFilter}
                setEraFilter={setEraFilter}
              />
            </div>
            <Map monasteries={monasteries}/>
            
          </TabsContent>
          <TabsContent value="collection">
            <div className="mb-8">
              {/* <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Monasteries Collection</h2>
                <h2></h2>
              </div> */}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monasteries.map((monastery) => (
                  <MonasteryCard
                    key={monastery.id}
                    monastery={monastery}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* No Results */}
      {filteredMonasteries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">No monasteries found</p>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters to discover more monasteries.
          </p>
        </div>
      )}

      {/* Monastery Detail Modal */}
      <MonasteryDetail
        monastery={selectedMonastery}
        isOpen={!!selectedMonastery}
        onClose={() => setSelectedMonastery(null)}
      />
    </div>
  );
};

export default Explore;