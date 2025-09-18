import React, { useState, useMemo } from 'react';
import { archiveItems } from '@/data/archives';
import ArchiveSearch from '@/components/ArchiveSearch';
import ArchiveFilters from '@/components/ArchiveFilters';
import ArchiveGallery from '@/components/ArchiveGallery';
import ArchiveDetailModal from '@/components/ArchiveDetailModal';
import { ArchiveItem } from '@/data/archives';

const Archives = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonastery, setSelectedMonastery] = useState('all');
  const [selectedCentury, setSelectedCentury] = useState('all');
  const [selectedArchive, setSelectedArchive] = useState<ArchiveItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArchives = useMemo(() => {
    return archiveItems.filter((archive) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.monastery.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || archive.type === selectedCategory;

      // Monastery filter
      const matchesMonastery = selectedMonastery === 'all' || archive.monastery === selectedMonastery;

      // Century filter
      const matchesCentury = selectedCentury === 'all' || archive.century === selectedCentury;

      return matchesSearch && matchesCategory && matchesMonastery && matchesCentury;
    });
  }, [searchQuery, selectedCategory, selectedMonastery, selectedCentury]);

  const handleViewDetails = (archive: ArchiveItem) => {
    setSelectedArchive(archive);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArchive(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Digital Archives
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore ancient manuscripts, murals, and historical documents from Sikkim's monasteries. 
            
          </p>
        </div>

        {/* Search */}
        <div className="mb-2">
          <ArchiveSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Filters */}
        <div className="mb-3 p-0">
          <ArchiveFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMonastery={selectedMonastery}
            setSelectedMonastery={setSelectedMonastery}
            selectedCentury={selectedCentury}
            setSelectedCentury={setSelectedCentury}
          />
        </div>

        {/* Results Count */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArchives.length} of {archiveItems.length} archives
          </p>
        </div>

        {/* Gallery */}
        <ArchiveGallery 
          archives={filteredArchives}
          onViewDetails={handleViewDetails}
        />

        {/* Detail Modal */}
        <ArchiveDetailModal
          archive={selectedArchive}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Archives;