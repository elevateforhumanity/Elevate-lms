'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Info, Home, Users, GraduationCap, FileText, Building2, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import AdminDemoClient from './AdminDemoClient';

interface Program {
  name: string;
  cat: string;
  enrolled: number;
  done: number;
}

export default function AdminDemo() {
  const [tab, setTab] = useState('home');
  const [search, setSearch] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [students, setStudents] = useState([
    { id: 1, name: 'Darius Williams', email: 'd.williams@email.com', program: 'Barber', progress: 42, status: 'active', avatar: '/images/testimonials/student-marcus.jpg' },
    { id: 2, name: 'Sarah Mitchell', email: 's.mitchell@email.com', program: 'CNA', progress: 95, status: 'active', avatar: '/images/gallery/image9.jpg' },
    { id: 3, name: 'Marcus Johnson', email: 'm.johnson@email.com', program: 'HVAC', progress: 28, status: 'active', avatar: '/images/testimonials/student-david.jpg' },
    { id: 4, name: 'Lisa Rodriguez', email: 'l.rodriguez@email.com', program: 'MA', progress: 67, status: 'active', avatar: '/images/testimonials/testimonial-medical-assistant.jpg' },
    { id: 5, name: 'James Thompson', email: 'j.thompson@email.com', program: 'CDL', progress: 85, status: 'active', avatar: '/images/testimonials/student-graduate-testimonial.jpg' },
  ]);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        if (data.status === 'success' && data.programs) {
          setPrograms(data.programs.slice(0, 6).map((p: any) => ({
            name: p.name || p.title,
            cat: p.category || 'General',
            enrolled: Math.floor(Math.random() * 100) + 20,
            done: Math.floor(Math.random() * 50) + 10,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoadingPrograms(false);
      }
    }
    fetchPrograms();
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.program.toLowerCase().includes(search.toLowerCase()));

  // Format programs for display
  const formattedPrograms = programs?.map(p => ({
    id: p.id,
    name: p.title || p.name,
    category: p.category || 'General',
    enrolled: enrollments?.filter(e => e.program_id === p.id)?.length || 0,
    completed: Math.floor(Math.random() * 50), // Would come from completion tracking
  })) || [];

  // Recent activity (would come from activity log table)
  const recentActivity = [
    { msg: 'New student enrolled in Barber Program', time: '15m ago', type: 'enroll' },
    { msg: 'CNA cohort completed training', time: '1h ago', type: 'complete' },
    { msg: '24 OJT hours verified', time: '2h ago', type: 'verify' },
    { msg: 'New employer partner onboarded', time: '4h ago', type: 'partner' },
  ];

  return (
    <AdminDemoClient
      stats={{
        students: totalStudents,
        programs: totalPrograms,
        activeEnrollments,
        partners: totalPartners,
      }}
      students={formattedStudents}
      programs={formattedPrograms}
      activity={recentActivity}
    />
  );
}
