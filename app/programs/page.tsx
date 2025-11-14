import Link from 'next/link';
import { DoceboHeader } from '@/components/DoceboHeader';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Training Programs | Elevate for Humanity',
  description: 'Explore our free workforce training programs in healthcare, construction, technology, and more.',
};

export default async function ProgramsPage() {
  const supabase = await createServerSupabaseClient();
  
  // Fetch programs from database
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .order('title');

  return (
    <div className="min-h-screen bg-white">
      <DoceboHeader />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">Training Programs</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            100% funded workforce development programs designed to launch your career
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs?.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="border rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{program.title}</h2>
                  <p className="text-gray-600 mb-4">{program.tagline}</p>
                  <p className="text-sm text-gray-700 mb-4">{program.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {program.funding?.map((fund: string) => (
                      <span key={fund} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {fund}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
