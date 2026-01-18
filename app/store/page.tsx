import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  ArrowRight,
  Heart,
  BookOpen,
  Award,
  Laptop,
  Users,
  Zap,
  Shield,
  Check,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description:
    'Platform licenses, certification courses, and digital resources. Every purchase supports free training programs for underserved communities.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

export const dynamic = 'force-dynamic';

const storeCategories = [
  {
    title: 'Platform Licenses',
    description: 'License our complete LMS platform with your branding. Deploy your own training business.',
    href: '/store/licenses',
    image: '/images/pexels/training-team.jpg',
    icon: Laptop,
    badge: 'Most Popular',
    price: 'From $4,999',
  },
  {
    title: 'Certification Courses',
    description: 'Industry-recognized certifications with exam vouchers. Microsoft, Adobe, OSHA, and more.',
    href: '/store/courses',
    image: '/images/pexels/digital-learning.jpg',
    icon: Award,
    badge: null,
    price: 'From $64',
  },
  {
    title: 'Digital Resources',
    description: 'Toolkits, guides, and templates to start and grow your training business.',
    href: '/store/digital',
    image: '/images/pexels/office-work.jpg',
    icon: BookOpen,
    badge: null,
    price: 'From $29',
  },
  {
    title: 'AI Studio',
    description: 'Generate videos, voiceovers, and AI instructors for your courses.',
    href: '/store/ai-studio',
    image: '/images/pexels/success-team.jpg',
    icon: Zap,
    badge: 'New',
    price: 'From $99/mo',
  },
];

const featuredProducts = [
  {
    name: 'School License',
    description: 'Complete platform for training providers',
    price: '$15,000',
    href: '/store/licenses/checkout/school-license',
    features: ['Up to 1,000 students', 'White-label branding', 'Priority support'],
  },
  {
    name: 'Microsoft Excel Certification',
    description: 'MOS: Excel Associate with exam voucher',
    price: '$164',
    href: '/store/courses/microsoft-excel',
    features: ['Self-paced learning', 'Exam voucher included', 'Certificate'],
  },
  {
    name: 'Grant Readiness Guide',
    description: 'Complete guide to workforce funding',
    price: '$29',
    href: '/store/digital/grant-guide',
    features: ['Instant download', 'Templates included', 'Compliance checklist'],
  },
];

export default async function StorePage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Video */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/pexels/store-hero.jpg"
        >
          <source src="/videos/training-providers-video-with-narration.mp4" type="video/mp4" />
        </video>
        {/* Fallback Image */}
        <Image
          src="/images/pexels/store-hero.jpg"
          alt="Elevate Store"
          fill
          className="object-cover -z-10"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/85 to-blue-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 border border-white/20">
              <Heart className="w-4 h-4 text-red-400" />
              Every Purchase Supports Free Training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Tools to Launch
              <span className="block text-blue-300">Your Training Business</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              Platform licenses, certification courses, and digital resources.
              Everything you need to deliver workforce training programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/store/licenses"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Browse Licenses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/store/courses"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
              >
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the right tools for your training organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storeCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {category.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                        {category.badge}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold">
                        {category.price}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular items to get you started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.name}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-3xl font-black text-blue-600 mb-6">
                  {product.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Buy From Us?</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Your purchase directly supports free workforce training for
              underserved communities
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mission-Driven</h3>
              <p className="text-blue-200">
                100% of proceeds support free training programs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
              <p className="text-blue-200">
                Powered by Stripe with bank-level security
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-blue-200">
                Dedicated team to help you succeed
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-blue-200">
                50+ deployments, 10,000+ students trained
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Browse our catalog or talk to our team about custom solutions for
            your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/licenses"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Browse All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?topic=store"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
