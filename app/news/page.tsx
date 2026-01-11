import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'News & Press | Elevate for Humanity',
  description: 'Latest news, updates, and press releases from Elevate for Humanity.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/news',
  },
};

export default function NewsPage() {
  const newsItems = [
    {
      title: 'Elevate for Humanity Expands Healthcare Training Programs',
      date: '2024-01-15',
      excerpt:
        'New CNA and Medical Assistant programs now available in partnership with local healthcare providers.',
      category: 'Program Launch',
    },
    {
      title: 'Partnership Announcement: EmployIndy Workforce Initiative',
      date: '2024-01-10',
      excerpt:
        'Elevate partners with EmployIndy to provide free training to Indianapolis residents.',
      category: 'Partnership',
    },
    {
      title: '500+ Students Placed in Jobs This Year',
      date: '2023-12-20',
      excerpt:
        'Record-breaking year for job placements across healthcare, skilled trades, and technology sectors.',
      category: 'Milestone',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero with Image */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[70vh] w-full overflow-hidden">
          <Image
            src="/media/programs/workforce-readiness-hero.jpg"
            alt="News and Updates"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-orange-700/90" />
          
          <div className="relative z-10 flex items-center justify-center min-h-[70vh]">
            <div className="container mx-auto px-4 text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">News & Press</h1>
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl">
                Stay updated with the latest news, announcements, and success
                stories from Elevate for Humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {newsItems.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="/media/programs/cpr-certification-group-hd.jpg"
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-black mb-2">
                    <time>{new Date(item.date).toLocaleDateString()}</time>
                    <span className="mx-2">•</span>
                    <span className="text-orange-600 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                  <p className="text-black mb-4">{item.excerpt}</p>
                  <Link
                    href="#"
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-black mb-4">
              Looking for press materials or media inquiries?
            </p>
            <Link href="/contact">
              <Button variant="outline">Contact Our Press Team</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-black mb-8">
              Subscribe to our newsletter for the latest updates, success
              stories, and program announcements.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
