import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = params.category.replace(/-/g, ' ');
  return {
    title: `${category} | Blog | Elevate For Humanity`,
    description: `Browse ${category} articles from Elevate For Humanity`,
  };
}

async function getCategoryPosts(category: string) {
  try {
    const supabase = await createClient();
    const categoryName = category.replace(/-/g, ' ');

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .ilike('category', categoryName)
      .order('published_at', { ascending: false });

    return posts || [];
  } catch (error: unknown) {
    return [];
  }
}

async function getAllCategories() {
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('published', true)
      .not('category', 'is', null);

    const categories = [
      ...new Set(posts?.map((p) => p.category).filter(Boolean)),
    ];
    return categories;
  } catch (error: unknown) {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = await getCategoryPosts(params.category);
  const allCategories = await getAllCategories();
  const categoryName = params.category.replace(/-/g, ' ');

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="text-sm text-slate-600 mb-4"
          >
            <Link
              href="/blog"
              aria-label="Link"
              className="hover:text-brand-blue-600"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-semibold capitalize">
              {categoryName}
            </span>
          </nav>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 capitalize text-2xl md:text-3xl lg:text-4xl">
            {categoryName}
          </h1>
          <p className="text-slate-600">
            {posts.length} article{posts.length === 1 ? '' : 's'} in this
            category
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {post.featured_image && (
                    <div className="relative h-48">
                      <Image
                        loading="lazy"
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-brand-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                      {post.author && <span>By {post.author}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-6 sticky top-4">
              <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block px-3 py-2 rounded hover:bg-white transition-colors ${
                        cat.toLowerCase() === categoryName.toLowerCase()
                          ? 'bg-blue-100 text-blue-800 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
