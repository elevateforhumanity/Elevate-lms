import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { videos } from '../../lms-data/videos';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Training Videos | Elevate for Humanity',
  description:
    'Watch free career training videos. Learn about our programs in healthcare, skilled trades, technology, and business.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/videos',
  },
};

export default function VideosPage() {
  const categories = Array.from(new Set(videos.map((v) => v.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Training Videos
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Watch videos about our free career training programs. Learn what we
            offer and how to get started.
          </p>
        </div>
      </section>

      {/* Videos by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {categories.map((category) => {
            const categoryVideos = videos.filter(
              (v) => v.category === category
            );

            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryVideos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/videos/${video.id}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition"
                    >
                      <div className="relative aspect-video bg-gray-200">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                            <Play className="w-8 h-8 text-orange-600 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                          {video.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Apply now for 100% free career training. No tuition, no debt, real
            careers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-lg border-2 border-gray-300 transition"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
