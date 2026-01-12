'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface FAQSearchProps {
  onSearch: (query: string) => void;
}

export function FAQSearch({ onSearch }: FAQSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl text-black border-2 border-white/20 focus:border-white focus:outline-none"
          aria-label="Search frequently asked questions"
        />
      </div>
    </div>
  );
}
