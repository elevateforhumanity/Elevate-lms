'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StudentAddForm from './StudentAddForm';

export const metadata: Metadata = {
  title: 'Add Student | Staff Portal | Elevate For Humanity',
  description: 'Enroll a new student in the system.',
  robots: { index: false, follow: false },
};

  const [programs, setPrograms] = useState<{id: string, name: string}[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        if (data.status === 'success' && data.programs) {
          setPrograms(data.programs.map((p: any) => ({ id: p.slug, name: p.name })));
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoadingPrograms(false);
      }
    }
    fetchPrograms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/staff-portal" className="hover:text-orange-600">Staff Portal</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/staff-portal/students" className="hover:text-orange-600">Students</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Add Student</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enroll New Student</h1>
        <p className="text-gray-600 mb-8">Complete the form below to enroll a new student</p>

        <StudentAddForm 
          programs={programs || []} 
          fundingTypes={fundingTypes}
          staffId={user.id}
        />
      </div>
    </div>
  );
}
