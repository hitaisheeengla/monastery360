import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { archiveCategories, monasteryFilters, centuryFilters } from '@/data/archives';
import { X } from 'lucide-react';

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
  setSelectedCentury,
}) => {
  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedMonastery !== 'all',
    selectedCentury !== 'all',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMonastery('all');
    setSelectedCentury('all');
  };

  return (
    <div className="space-y-4">
      {/* Filters Container */}
      <div className="w-full bg-card rounded-lg border border-border p-4 shadow-cultural flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6">
        
        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {archiveCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monastery Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Monastery
          </label>
          <Select value={selectedMonastery} onValueChange={setSelectedMonastery}>
            <SelectTrigger className="w-full">
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

        {/* Time Period Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Time Period
          </label>
          <Select value={selectedCentury} onValueChange={setSelectedCentury}>
            <SelectTrigger className="w-full">
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

      {/* Clear All Button */}
      {activeFiltersCount > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArchiveFilters;
