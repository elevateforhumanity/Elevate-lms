import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foundation Programs | RISE Foundation | Elevate For Humanity',
  description: 'Scholarships, grants, and support programs from the RISE Foundation.',
};

export const dynamic = 'force-dynamic';

export default async function RiseFoundationProgramsPage() {
  const supabase = await createClient();

  // Fetch foundation programs/scholarships from database
  const { data: scholarships, error } = await supabase
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
    .order('amount', { ascending: false });

  if (error) {
    console.error('Scholarships fetch error:', error.message);
  }

  const programs = scholarships || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <Image
          src="/images/programs-hq/students-learning.jpg"
          alt="RISE Foundation Programs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-orange-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <nav className="flex items-center gap-2 text-sm text-orange-100 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/rise-foundation" className="hover:text-white">RISE Foundation</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Programs</span>
            </nav>
            <h1 className="text-4xl font-bold text-white mb-2">Foundation Programs</h1>
            <p className="text-xl text-orange-100">
              Scholarships, grants, and fellowships to support your educational journey
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {programs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program: any) => {
              const spotsLeft = (program.max_recipients || 0) - (program.current_recipients || 0);
              const fillPercent = program.max_recipients 
                ? Math.round((program.current_recipients / program.max_recipients) * 100)
                : 0;

              return (
                <div key={program.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-40">
                    <Image 
                      src={[
                        '/images/programs-hq/healthcare-hero.jpg',
                        '/images/programs-hq/skilled-trades-hero.jpg',
                        '/images/programs-hq/technology-hero.jpg',
                        '/images/programs-hq/career-success.jpg',
                        '/images/programs-hq/students-learning.jpg',
                        '/images/programs-hq/training-classroom.jpg',
                      ][idx % 6]} 
                      alt={program.name} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ${(program.amount || 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6">
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

                  <Link href={`/rise-foundation/apply?program=${program.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="relative h-48">
              <Image src="/images/programs-hq/students-learning.jpg" alt="Scholarships" fill className="object-cover" />
            </div>
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Scholarships Available</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Check back soon for new scholarship and grant opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply" 
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Apply for Training
                </Link>
                <Link href="/rise-foundation" 
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Learn About RISE
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About RISE Foundation Funding</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Eligibility</h3>
              <p>Most programs require Indiana residency, a high school diploma or GED, and demonstrated financial need. Specific requirements vary by program.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Application Process</h3>
              <p>Complete the online application, submit required documents, and await review. Most decisions are made within 2-4 weeks of submission.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Questions?</h3>
              <p>Contact our scholarship team at <a href="mailto:elevate4humanityedu@gmail.com" className="text-orange-600 hover:underline">elevate4humanityedu@gmail.com</a> or call 317-314-3757.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
