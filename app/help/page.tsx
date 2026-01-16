import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { HelpCircle, BookOpen, Video, FileText, Search, ArrowRight, Users, Settings, CreditCard, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | Elevate For Humanity',
  description: 'Find answers and learn how to use our platform.',
};

export const dynamic = 'force-dynamic';

export default async function HelpPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from('help_articles')
    .select('*')
    .eq('is_published', true)
    .order('views', { ascending: false })
    .limit(6);

  const categories = [
    { icon: GraduationCap, title: 'Getting Started', desc: 'New to Elevate? Start here', href: '/help/getting-started', count: 12 },
    { icon: BookOpen, title: 'Programs & Courses', desc: 'Learn about our offerings', href: '/help/programs', count: 18 },
    { icon: Users, title: 'Account & Profile', desc: 'Manage your account', href: '/help/account', count: 15 },
    { icon: CreditCard, title: 'Payments & Financial Aid', desc: 'Billing and assistance', href: '/help/payments', count: 10 },
    { icon: Settings, title: 'Technical Support', desc: 'Troubleshooting guides', href: '/help/technical', count: 8 },
    { icon: FileText, title: 'Policies', desc: 'Terms and guidelines', href: '/help/policies', count: 6 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Find answers, tutorials, and guides to help you succeed.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition">
                  <cat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{cat.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{cat.desc}</p>
                  <span className="text-indigo-600 text-sm">{cat.count} articles</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {articles && articles.length > 0 ? articles.map((article: any) => (
            <Link key={article.id} href={`/help/articles/${article.slug}`} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex items-center gap-4">
              <FileText className="w-8 h-8 text-indigo-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-gray-500 text-sm">{article.category}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </Link>
          )) : (
            <>
              <Link href="/help/articles/how-to-enroll" className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex items-center gap-4">
                <FileText className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">How to Enroll in a Program</h3>
                  <p className="text-gray-500 text-sm">Getting Started</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </Link>
              <Link href="/help/articles/reset-password" className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex items-center gap-4">
                <FileText className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Reset Your Password</h3>
                  <p className="text-gray-500 text-sm">Account & Profile</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </Link>
              <Link href="/help/articles/financial-aid" className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex items-center gap-4">
                <FileText className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Applying for Financial Aid</h3>
                  <p className="text-gray-500 text-sm">Payments & Financial Aid</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </Link>
              <Link href="/help/articles/certificates" className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex items-center gap-4">
                <FileText className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Downloading Your Certificate</h3>
                  <p className="text-gray-500 text-sm">Programs & Courses</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </Link>
            </>
          )}
        </div>

        <div className="bg-indigo-50 rounded-xl p-8 text-center">
          <HelpCircle className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-4">Our support team is ready to help.</p>
          <Link href="/support" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
