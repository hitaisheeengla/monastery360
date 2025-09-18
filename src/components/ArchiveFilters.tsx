import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { archiveCategories, monasteryFilters, centuryFilters } from '@/data/archives';
import { Filter, X } from 'lucide-react';

interface ArchiveFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMonastery: string;
  setSelectedMonastery: (monastery: string) => void;
  selectedCentury: string;
  setSelectedCentury: (century: string) => void;
}

const ArchiveFilters: React.FC<ArchiveFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedMonastery,
  setSelectedMonastery,
  selectedCentury,
  setSelectedCentury
}) => {
  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedMonastery !== 'all',
    selectedCentury !== 'all'
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMonastery('all');
    setSelectedCentury('all');
  };

  return (
    <div>
    <div className="w-full bg-card rounded-lg border border-border p-3 pl-5 pr-5 shadow-cultural flex flex-col md:flex-row md:items-center md:justify-between gap-4">


      {/* Category Toggle Buttons */}
      <div className="mb-6">
        <label className="text-lg font-medium text-foreground mb-3 block">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {archiveCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-sm"
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
          
        </div>


      </div>
      <div className='mb-6'>
        <label className="text-lg font-medium text-foreground mb-2 block">
          Monastery
        </label>
        <Select value={selectedMonastery} onValueChange={setSelectedMonastery}>
          <SelectTrigger className="w-auto min-w-[200px]">
            <SelectValue placeholder="Select monastery" />
          </SelectTrigger>
          <SelectContent>
            {monasteryFilters.map((monastery) => (
              <SelectItem key={monastery.id} value={monastery.id}>
                {monastery.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='mb-6'>
        <label className="text-lg font-medium text-foreground mb-2 block">
          Time Period
        </label>
        <Select value={selectedCentury} onValueChange={setSelectedCentury}>
          <SelectTrigger className="w-auto min-w-[200px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {centuryFilters.map((century) => (
              <SelectItem key={century.id} value={century.id}>
                {century.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
    </div>
  );
};

export default ArchiveFilters;