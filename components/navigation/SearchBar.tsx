'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses, programs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
      
      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 text-sm text-gray-500">
            Search results for "{query}"
          </div>
          <div className="border-t border-gray-100">
            <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-sm">
              <div className="font-medium text-gray-900">Barber Apprenticeship</div>
              <div className="text-gray-500">Professional barbering training</div>
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-sm">
              <div className="font-medium text-gray-900">CNA Certification</div>
              <div className="text-gray-500">Certified Nursing Assistant program</div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
