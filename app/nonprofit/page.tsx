import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nonprofit | Mental Wellness & Holistic Healing',
  description:
    'Welcome to Selfish Inc. Your Partner in Mental Wellness and Holistic Healing',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/nonprofit',
  },
};

export default function NonprofitPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Exact replica */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Selfish Inc"
              width={200}
              height={80}
              className="mx-auto"
            />
          </div>

          {/* Animated Headline - Exact from Wix */}
          <h1 className="text-4xl md:text-6xl font-black text-black mb-8 leading-tight">
            "Welcome to Selfish Inc. Your Partner in Mental Wellness and
            Holistic Healing"
          </h1>

          {/* Donate Button */}
          <div className="mb-12">
            <Link
              href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
              target="_blank"
              className="inline-block bg-purple-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>

      {/* Mind Body Spirit Image Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden border-4 border-gray-200">
              <Image
                src="https://static.wixstatic.com/media/a9980c_542c794668484ecc911de7f139dad437~mv2.jpg"
                alt="Mind, Body and spirit words engraved on zen stones"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border-4 border-gray-200">
              <Image
                src="https://static.wixstatic.com/media/a9980c_50880ae14adb46c09fb5244b2fa65c84~mv2.webp"
                alt="Rocks of strength and resilience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Healing Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Shop our healing Products-browse items designed to uplift your mood
            and body.
          </h2>
          <Link
            href="https://curvaturebodysculpting.store/"
            target="_blank"
            className="inline-block bg-brand-orange-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-brand-orange-700 transition-colors shadow-lg uppercase"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-black">Video: 00:00 / 01:26</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Exact from Wix */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Trauma Recovery */}
            <div className="group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://static.wixstatic.com/media/a9980c_49b5dda3ab744437846dedd6063e8f04~mv2.jpg"
                  alt="Freckled face reflecting silent trauma"
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-black">
                Trauma Recovery
              </h3>
            </div>

            {/* Addiction Rehabilitation */}
            <div className="group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://static.wixstatic.com/media/11062b_d43c4524d004480cac5e896e52182b75~mv2.jpg"
                  alt="Doctor's touch: support and understanding"
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-black">
                Addiction Rehabilitation
              </h3>
            </div>

            {/* Divorce Support */}
            <div className="group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://static.wixstatic.com/media/8e2a95a81bd67d6d59f9fc086239d1be.jpg"
                  alt="This scene powerfully captures the emotional complexity of divorce"
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-bold text-black">
                Divorce Support
              </h3>
            </div>
          </div>

          {/* Programs Link */}
          <div className="text-center mt-12">
            <Link
              href="/rise-foundation/programs"
              className="text-lg text-purple-600 hover:text-purple-700 font-semibold underline"
            >
              Mindfulness Workshops, Mental Wellness Programs Holistic, Mental
              Health
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 text-center">
        <p className="text-sm text-black">
          Do Not Sell My Personal Information
        </p>
      </footer>
    </div>
  );
}
