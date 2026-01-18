import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Search, ChevronRight, Eye } from 'lucide-react';

export const metadata: Metadata = { title: 'Help Articles | Elevate LMS' };

export default function HelpArticlesPage() {
  const categories = [
    { name: 'Getting Started', count: 12, slug: 'getting-started' },
    { name: 'Account & Billing', count: 8, slug: 'account-billing' },
    { name: 'Courses & Learning', count: 15, slug: 'courses-learning' },
    { name: 'Technical Support', count: 10, slug: 'technical-support' },
    { name: 'Certifications', count: 6, slug: 'certifications' },
    { name: 'Career Services', count: 9, slug: 'career-services' },
  ];

  const popularArticles = [
    { id: '1', title: 'How to enroll in a program', views: 2345, category: 'Getting Started' },
    { id: '2', title: 'Payment plans and financial aid options', views: 1876, category: 'Account & Billing' },
    { id: '3', title: 'Accessing your course materials', views: 1654, category: 'Courses & Learning' },
    { id: '4', title: 'Scheduling your certification exam', views: 1432, category: 'Certifications' },
    { id: '5', title: 'Troubleshooting video playback issues', views: 1234, category: 'Technical Support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-800 text-white py-16">
        <Image
          src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Help Center"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-blue-100 mb-8">Find answers to your questions</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search for articles..." className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link key={category.slug} href={`/help/articles/${category.slug}`} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} articles</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {popularArticles.map((article) => (
                <Link key={article.id} href={`/help/articles/article/${article.id}`} className="block p-4 hover:bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{article.category}</span>
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.views.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Can't find what you need?</h3>
              <p className="text-sm text-blue-700 mb-4">Our support team is here to help.</p>
              <Link href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
