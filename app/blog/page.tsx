import { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Elevate For Humanity',
  description: 'Insights, stories, and tips from our community.',
};

// Dynamic rendering - fetches fresh data on each request
// Required because we fetch from database
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
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

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(12);

  const { data: featuredPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Stories, insights, and tips from our community of learners and educators.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {featuredPost && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden md:flex">
              {featuredPost.image_url && (
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
                  <Image src={featuredPost.image_url} alt={featuredPost.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <span className="text-emerald-600 text-sm font-medium mb-2">Featured</span>
                <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author_name || 'Elevate Team'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.published_at).toLocaleDateString()}
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:underline">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? posts.map((post: any) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition">
              {post.image_url && (
                <div className="h-48 bg-gray-200 relative">
                  <Image src={post.image_url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    {post.author_name || 'Elevate Team'}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-emerald-600 font-medium hover:underline text-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          )) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
