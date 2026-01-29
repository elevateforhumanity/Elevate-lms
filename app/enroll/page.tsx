import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = { 
  title: 'Enroll | Elevate For Humanity',
  description: 'Enroll in free workforce training programs at Elevate For Humanity.',
};

export const dynamic = 'force-dynamic';

export default async function EnrollPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Fetch active programs
  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, name, slug, description, duration_weeks, is_free, price, total_cost, funding_eligible')
    .eq('status', 'active')
    .order('name', { ascending: true })
    .limit(20);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Programs', href: '/programs' }, { label: 'Enroll' }]} />
        </div>
      </div>

      {/* Hero - Image only */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/images/heroes-hq/programs-hero.jpg"
          alt="Enroll in Training"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Programs</h2>
          
          {programs && programs.length > 0 ? (
            <div className="space-y-4">
              {programs.map((program) => (
                <Link
                  key={program.id}
                  href={`/enroll/${program.id}`}
                  className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                      {program.description && (
                        <p className="text-gray-600 mt-1 text-sm line-clamp-2">{program.description}</p>
                      )}
                      {program.duration_weeks && (
                        <p className="text-sm text-gray-500 mt-2">
                          Duration: {program.duration_weeks} weeks
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4 text-right">
                      {program.is_free === true ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Free
                        </span>
                      ) : program.funding_eligible === true ? (
                        <div>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Free with WIOA/WRG
                          </span>
                          {(program.price || program.total_cost) ? (
                            <p className="text-xs text-gray-500 mt-1">
                              or ${((program.price || program.total_cost || 0) as number).toLocaleString()} self-pay
                            </p>
                          ) : null}
                        </div>
                      ) : (program.price || program.total_cost) ? (
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          ${((program.price || program.total_cost || 0) as number).toLocaleString()}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No programs currently available for enrollment.</p>
              <Link
                href="/programs"
                className="text-blue-600 hover:underline"
              >
                View all programs
              </Link>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            Our enrollment team is here to help you find the right program and funding options.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Call (317) 314-3757
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
