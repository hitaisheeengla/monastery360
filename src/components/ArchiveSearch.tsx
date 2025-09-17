import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ArchiveSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const suggestedSearches = [
  'Thangka', 'Manuscript', 'Buddha', 'Avalokiteshvara', 'Mandala', 'Sutra', 'Tara', 'Dharma'
];

const ArchiveSearch: React.FC<ArchiveSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search archives by title, description, or monastery..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-10 h-12 text-base bg-card border-2 border-border/50 focus:border-primary transition-colors"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showSuggestions && !searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-mountain z-50">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium text-muted-foreground">Popular searches</p>
          </div>
          <div className="p-2">
            {suggestedSearches.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                <Search className="inline h-4 w-4 mr-2 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchiveSearch;