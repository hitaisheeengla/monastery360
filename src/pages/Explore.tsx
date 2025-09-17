import React, { useState, useMemo } from 'react';
import { monasteries } from '@/data/monasteries';
import SearchFilters from '@/components/SearchFilters';
import InteractiveMap from '@/components/InteractiveMap';
import MonasteryCard from '@/components/MonasteryCard';
import MonasteryDetail from '@/components/MonasteryDetail';
import { Monastery } from '@/data/monasteries';

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Explore Sacred Monasteries
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the spiritual heritage of Sikkim through immersive virtual tours, 
            historical insights, and interactive exploration.
          </p>
        </div>

        {/* Search & Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          eraFilter={eraFilter}
          setEraFilter={setEraFilter}
        />

        {/* Interactive Map Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Interactive Monastery Map</h2>
            <p className="text-muted-foreground">Explore monasteries on an interactive map</p>
          </div>
          <InteractiveMap
            monasteries={filteredMonasteries}
            onMonasterySelect={handleMonasterySelect}
          />
        </div>

        {/* Monasteries Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Monasteries Collection</h2>
            <p className="text-muted-foreground mb-4">
              Showing {filteredMonasteries.length} of {monasteries.length} monasteries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonasteries.map((monastery) => (
              <MonasteryCard
                key={monastery.id}
                monastery={monastery}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
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
    </div>
  );
};

export default Explore;