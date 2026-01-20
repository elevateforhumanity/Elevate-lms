import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ChevronRight, GraduationCap, DollarSign, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foundation Programs | RISE Foundation | Elevate For Humanity',
  description: 'Scholarships, grants, and support programs from the RISE Foundation.',
};

export const dynamic = 'force-dynamic';

export default async function RiseFoundationProgramsPage() {
  const supabase = await createClient();

  // Fetch foundation programs/scholarships
  const { data: scholarships } = await supabase
    .from('scholarships')
    .select(`
      id,
      name,
      description,
      amount,
      deadline,
      eligibility_criteria,
      max_recipients,
      current_recipients,
      is_active
    `)
    .eq('is_active', true)
    .order('deadline', { ascending: true });

  // If no scholarships table, use static data as fallback
  const programs = scholarships && scholarships.length > 0 ? scholarships : [
    {
      id: '1',
      name: 'RISE Scholarship',
      description: 'Full tuition coverage for qualifying students pursuing technology careers',
      amount: 15000,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      eligibility_criteria: ['GPA 3.0+', 'Financial need', 'US Citizen/Resident'],
      max_recipients: 50,
      current_recipients: 32,
    },
    {
      id: '2',
      name: 'Emergency Education Fund',
      description: 'One-time grants for students facing unexpected financial hardship',
      amount: 2500,
      deadline: null,
      eligibility_criteria: ['Current enrollment', 'Demonstrated need', 'Good standing'],
      max_recipients: 100,
      current_recipients: 67,
    },
    {
      id: '3',
      name: 'Career Transition Grant',
      description: 'Support for adults changing careers into high-demand fields',
      amount: 8000,
      deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      eligibility_criteria: ['Age 25+', 'Career change', 'Completed assessment'],
      max_recipients: 30,
      current_recipients: 12,
    },
    {
      id: '4',
      name: 'Community Leader Fellowship',
      description: 'Leadership development program with mentorship and funding',
      amount: 20000,
      deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
      eligibility_criteria: ['Community involvement', 'Leadership potential', 'Essay required'],
      max_recipients: 10,
      current_recipients: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/rise-foundation" className="hover:text-orange-600">RISE Foundation</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Programs</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Foundation Programs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The RISE Foundation provides scholarships, grants, and fellowships to support students on their educational journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program: any) => {
            const spotsLeft = (program.max_recipients || 0) - (program.current_recipients || 0);
            const fillPercent = program.max_recipients 
              ? Math.round((program.current_recipients / program.max_recipients) * 100)
              : 0;

            return (
              <div key={program.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    ${(program.amount || 0).toLocaleString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {program.deadline 
                      ? new Date(program.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Rolling'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Waitlist'}
                  </span>
                </div>

                {program.eligibility_criteria && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Eligibility:</p>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(program.eligibility_criteria) 
                        ? program.eligibility_criteria 
                        : [program.eligibility_criteria]
                      ).map((req: string, idx: number) => (
                        <span key={idx} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          <CheckCircle className="w-3 h-3 text-green-500" /> {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {program.max_recipients && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Applications</span>
                      <span>{program.current_recipients || 0}/{program.max_recipients}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${fillPercent}%` }} />
                    </div>
                  </div>
                )}

                <Link href={`/rise-foundation/programs/${program.id}/apply`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
