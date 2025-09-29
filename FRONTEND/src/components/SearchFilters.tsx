import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  eraFilter: string;
  setEraFilter: (era: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  eraFilter,
  setEraFilter,
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-cultural mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by Name */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search monasteries by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter by Location */}
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by location" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="gangtok">Gangtok, East Sikkim</SelectItem>
            <SelectItem value="pelling">Pelling, West Sikkim</SelectItem>
            <SelectItem value="tashiding">Tashiding, West Sikkim</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Era */}
        <Select value={eraFilter} onValueChange={setEraFilter}>
          <SelectTrigger>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by era" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Eras</SelectItem>
            <SelectItem value="16th">16th Century</SelectItem>
            <SelectItem value="17th">17th Century</SelectItem>
            <SelectItem value="19th">19th Century</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;