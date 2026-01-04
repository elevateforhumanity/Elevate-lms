"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'course' | 'quiz';
  category: string;
  duration?: string;
  thumbnail?: string;
}

export default function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to Barbering',
      type: 'video',
      category: 'Barber',
      duration: '15 min',
    },
    {
      id: '2',
      title: 'HVAC Fundamentals',
      type: 'course',
      category: 'HVAC',
      duration: '2 hours',
    },
    {
      id: '3',
      title: 'Medical Terminology Guide',
      type: 'document',
      category: 'Medical Assistant',
    },
    {
      id: '4',
      title: 'Safety Quiz',
      type: 'quiz',
      category: 'General',
      duration: '10 min',
    },
  ];

  const categories = ['all', 'Barber', 'HVAC', 'Medical Assistant', 'CDL', 'General'];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      case 'course':
        return '📚';
      case 'quiz':
        return '✏️';
      default:
        return '📁';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            Content="Search content..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{getTypeIcon(item.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  {item.duration && (
                    <span className="text-sm text-gray-500">{item.duration}</span>
                  )}
                </div>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Open
            </button>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No content found matching your search.</p>
        </div>
      )}
    </div>
  );
}
