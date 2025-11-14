import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elevateconnectsdirectory.org';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/pricing',
    '/login',
    '/signup',
    '/privacy-policy',
    '/lms',
    '/lms/courses',
    '/lms/dashboard',
    '/program-holder/apply',
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const supabase = createBuildTimeSupabaseClient();

    // Get dynamic program pages
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('slug, updated_at')
      .eq('status', 'active');

    // Get dynamic course pages
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, updated_at')
      .eq('published', true);

    if (programsError || coursesError) {
      console.error('Sitemap generation error:', { programsError, coursesError });
      return staticSitemap;
    }

    const sitemap: MetadataRoute.Sitemap = [
      ...staticSitemap,

      // Program pages
      ...(programs || []).map((program) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: new Date(program.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),

      // Course pages
      ...(courses || []).map((course) => ({
        url: `${baseUrl}/lms/courses/${course.id}`,
        lastModified: new Date(course.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];

    return sitemap;
  } catch (err) {
    console.error('Sitemap generation failed, returning static sitemap:', err);
    // Fallback to static sitemap if Supabase fails
    return staticSitemap;
  }
}
