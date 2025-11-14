import Link from 'next/link';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export const metadata = {
  title: 'Blog | Elevate for Humanity',
  description: 'Latest news and updates from Elevate for Humanity',
};

// Example: Fetch blog posts from CMS or database
async function getBlogPosts() {
  // In production, this would fetch from Supabase or CMS
  // For now, return mock data
  return [
    {
      id: 1,
      title: 'New CNA Program Launches',
      excerpt: 'We are excited to announce our new CNA training program...',
      date: '2024-11-01',
      slug: 'new-cna-program',
    },
    {
      id: 2,
      title: 'HVAC Apprenticeship Success Stories',
      excerpt: 'Meet our graduates who are now working in the HVAC industry...',
      date: '2024-10-15',
      slug: 'hvac-success-stories',
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold">Elevate for Humanity</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/programs" className="hover:text-blue-600">
                Programs
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-700 mb-12">
            Latest news and updates from Elevate for Humanity
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <time className="text-sm text-gray-500">{post.date}</time>
                <h2 className="text-2xl font-bold mt-2 mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
