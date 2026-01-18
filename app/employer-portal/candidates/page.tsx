import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, Search, Filter, MapPin, Briefcase, GraduationCap,
  Star, MessageSquare, Calendar, Download, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Candidates | Employer Portal | Elevate For Humanity',
  description: 'Browse and connect with qualified candidates from our training programs.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function CandidatesPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/employer-portal/candidates');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employer-portal/candidates');
  }

  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Certified Nursing Assistant',
      location: 'Indianapolis, IN',
      experience: '2 years',
      skills: ['Patient Care', 'Vital Signs', 'CPR Certified'],
      rating: 4.8,
      available: true,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      program: 'CNA Training Program',
      graduated: 'Dec 2024',
    },
    {
      id: 2,
      name: 'Marcus Williams',
      title: 'Licensed Barber',
      location: 'Chicago, IL',
      experience: '1 year',
      skills: ['Fades', 'Beard Trimming', 'Customer Service'],
      rating: 4.9,
      available: true,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      program: 'Barber Apprenticeship',
      graduated: 'Nov 2024',
    },
    {
      id: 3,
      name: 'Emily Chen',
      title: 'HVAC Technician',
      location: 'Detroit, MI',
      experience: '3 years',
      skills: ['Installation', 'Repair', 'EPA Certified'],
      rating: 4.7,
      available: false,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      program: 'HVAC Training Program',
      graduated: 'Oct 2024',
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'CDL Driver - Class A',
      location: 'Columbus, OH',
      experience: '5 years',
      skills: ['Long Haul', 'Hazmat', 'Clean Record'],
      rating: 4.6,
      available: true,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      program: 'CDL Training Program',
      graduated: 'Sep 2024',
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      title: 'Medical Assistant',
      location: 'Louisville, KY',
      experience: '1 year',
      skills: ['Phlebotomy', 'EKG', 'Medical Records'],
      rating: 4.8,
      available: true,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      program: 'Medical Assistant Program',
      graduated: 'Jan 2025',
    },
  ];

  const filters = ['All Candidates', 'Healthcare', 'Skilled Trades', 'Transportation', 'Business'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 to-emerald-900 text-white py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
            alt="Candidates"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-green-200" />
            <span className="text-green-200 font-medium">Candidate Pool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Qualified Candidates</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Browse our pool of trained and certified candidates ready to join your team.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skill, or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Programs</option>
                <option>CNA Training</option>
                <option>Barber Apprenticeship</option>
                <option>HVAC Training</option>
                <option>CDL Training</option>
              </select>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {filters.map((filter, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  index === 0 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Candidates Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">{candidates.length} candidates found</p>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Sort by: Most Relevant</option>
              <option>Sort by: Recently Active</option>
              <option>Sort by: Highest Rated</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={candidate.image}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                      />
                      {candidate.available && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{candidate.name}</h3>
                      <p className="text-gray-600 text-sm">{candidate.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900">{candidate.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience} experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="w-4 h-4" />
                      {candidate.program}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/employer-portal/candidates/${candidate.id}`}
                      className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-center"
                    >
                      View Profile
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
