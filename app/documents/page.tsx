'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, Download, Eye, Search, Filter, FolderOpen, File, Image, FileSpreadsheet } from 'lucide-react';

const documents = [
  { id: 1, name: 'Student Handbook 2024', type: 'pdf', size: '2.4 MB', category: 'Policies', date: '2024-01-10' },
  { id: 2, name: 'Course Catalog', type: 'pdf', size: '5.1 MB', category: 'Academic', date: '2024-01-08' },
  { id: 3, name: 'Financial Aid Guide', type: 'pdf', size: '1.8 MB', category: 'Financial', date: '2024-01-05' },
  { id: 4, name: 'Enrollment Form', type: 'docx', size: '245 KB', category: 'Forms', date: '2024-01-03' },
  { id: 5, name: 'Tax Documents Checklist', type: 'xlsx', size: '156 KB', category: 'Tax', date: '2024-01-02' },
  { id: 6, name: 'Program Brochure', type: 'pdf', size: '3.2 MB', category: 'Marketing', date: '2024-01-01' },
];

const categories = ['All', 'Policies', 'Academic', 'Financial', 'Forms', 'Tax', 'Marketing'];

const getIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
    case 'docx': return <File className="w-5 h-5 text-blue-500" />;
    case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    case 'png': case 'jpg': return <Image className="w-5 h-5 text-purple-500" />;
    default: return <File className="w-5 h-5 text-gray-500" />;
  }
};

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = documents.filter(doc => 
    (category === 'All' || doc.category === category) &&
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Documents</span>
        </nav>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Library</h1>
            <p className="text-gray-600">Access forms, guides, and resources</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  category === cat ? 'bg-orange-500 text-white' : 'bg-white border hover:bg-gray-50'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Document</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Size</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {getIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500 uppercase">{doc.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">{doc.category}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{doc.size}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{doc.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded" title="Preview">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded" title="Download">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No documents found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
