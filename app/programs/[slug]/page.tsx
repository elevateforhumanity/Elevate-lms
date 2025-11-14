import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DoceboHeader } from '@/components/DoceboHeader';
import { createServerSupabaseClient, createBuildTimeSupabaseClient } from '@/lib/auth';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const supabase = createBuildTimeSupabaseClient();
    const { data: programs, error } = await supabase.from('programs').select('slug');
    
    if (error) {
      console.error('generateStaticParams error:', error);
      return [];
    }
    
    return programs?.map((program) => ({
      slug: program.slug,
    })) || [];
  } catch (err) {
    console.error('generateStaticParams failed:', err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient();
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', params.slug)
    .single();
    
  if (!program) return {};

  return {
    title: `${program.title} | Elevate for Humanity`,
    description: program.summary,
  };
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient();
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <DoceboHeader />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <Link href="/programs" className="text-white/80 hover:text-white mb-4 inline-block">
              ← Back to Programs
            </Link>
            <h1 className="text-5xl font-bold mb-4">{program.title}</h1>
            <p className="text-2xl opacity-90 mb-6">{program.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {program.funding?.map((fund: string) => (
                <span key={fund} className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-semibold border-2 border-white/30">
                  {fund}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <p className="text-xl text-gray-700 mb-8">{program.summary}</p>

              <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-3 mb-8">
                {program.bullets?.map((bullet: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">✓</span>
                    <span className="text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                <h3 className="text-xl font-bold mb-2">Funding Available</h3>
                <p className="text-gray-700">
                  This program is 100% funded through: {program.funding?.join(', ')}
                </p>
              </div>

              {program.cta && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 font-medium">{program.cta}</p>
                </div>
              )}

              <div className="mt-12 flex gap-4">
                <Link href="/apply" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700">
                  Apply Now
                </Link>
                <Link href="/contact" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
