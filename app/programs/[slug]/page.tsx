import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { programs, type Program } from '@/app/data/programs';
import { ProgramTemplate } from '@/components/programs/ProgramTemplate';
import type { Metadata } from 'next';
import Link from 'next/link';

type Params = Promise<{ slug: string }>;

const SITE_URL = 'https://www.elevateforhumanity.org';


// Load program from JSON file or TypeScript data
async function loadProgram(slug: string): Promise<Program | null> {
  // First, try to load from JSON file
  const jsonPath = path.join(process.cwd(), 'data', 'programs', `${slug}.json`);

  if (fs.existsSync(jsonPath)) {
    try {
      const fileContent = fs.readFileSync(jsonPath, 'utf-8');
      const data = JSON.parse(fileContent);
      return data as Program;
    } catch (error) { /* Error handled silently */ }
  }

  // Fallback to TypeScript data
  return programs.find((p) => p.slug === slug) || null;
}

// Generate static paths for all programs at build time
export async function generateStaticParams() {
  const programSlugs: string[] = [];

  // Get slugs from TypeScript data
  programSlugs.push(...programs.map((p) => p.slug));

  // Get slugs from JSON files
  const jsonDir = path.join(process.cwd(), 'data', 'programs');
  if (fs.existsSync(jsonDir)) {
    const files = fs.readdirSync(jsonDir);
    const jsonSlugs = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace(/\.json$/, ''));
    programSlugs.push(...jsonSlugs);
  }

  // Remove duplicates
  const uniqueSlugs = [...new Set(programSlugs)];

  return uniqueSlugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await loadProgram(slug);

  if (!program) {
    return {
      title: 'Program Not Found | Elevate for Humanity',
      description: 'The requested program could not be found.',
    };
  }

  return {
    title: `${program.name} | Free Training | Elevate for Humanity`,
    description: program.shortDescription,
    alternates: {
      canonical: `https://www.elevateforhumanity.org/programs/${slug}`,
    },
    openGraph: {
      title: program.name,
      description: program.shortDescription,
      type: 'website',
      url: `https://www.elevateforhumanity.org/programs/${slug}`,
    },
  };
}

// Main page component - Server Component by default
export default async function ProgramDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const program = await loadProgram(slug);

  // Return 404 if program not found
  if (!program) {
    return notFound();
  }

  // If program has minimal data (from simple JSON), render simple template
  if (!program.heroTitle || !program.whatYouLearn) {
    return (
      <div className="py-16 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{program.name}</h1>
          <p className="mb-6 text-lg">
            {program.shortDescription || program.longDescription}
          </p>

          {program.outcomes && program.outcomes.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">What You'll Gain</h2>
              <ul className="list-disc pl-6 space-y-2 mb-8">
                {program.outcomes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex gap-4">
            <Link
              href={program.ctaPrimary?.href || '/apply'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
            >
              {program.ctaPrimary?.label || 'Apply Now'}
            </Link>
            <Link
              href="/programs"
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl transition"
            >
              Back to Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render full program template for complete data
  return <ProgramTemplate program={program} />;
}
