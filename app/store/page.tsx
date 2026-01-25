import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, ChevronRight, Play, ShoppingBag, GraduationCap, BookOpen, Server, CreditCard, FileText, Settings, Users } from 'lucide-react';
import { primaryCards, secondaryCards } from '@/lib/store/cards';
import StoreClientWrapper from './StoreClientWrapper';
import UniversalSearch from '@/components/search/UniversalSearch';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Shop gear, browse courses, download workbooks, and license our workforce platform.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shopping-bag': ShoppingBag,
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'server': Server,
  'credit-card': CreditCard,
  'file-text': FileText,
  'settings': Settings,
  'users': Users,
};

// Quick Stats
const stats = [
  { label: 'Products Available', value: '500+' },
  { label: 'Courses', value: '50+' },
  { label: 'Downloads', value: '200+' },
  { label: 'Organizations', value: '150+' },
];

export default function StorePage() {
  return (
    <StoreClientWrapper>
      <div className="bg-white min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center text-sm">
                <Link href="/" className="text-gray-600 hover:text-black flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                <span className="text-black font-semibold">Store</span>
              </div>
              {/* Tour trigger button */}
              <button
                data-tour-trigger="store-tour"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                <Play className="w-4 h-4" />
                Start Guided Tour
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section with Search */}
        <section className="relative bg-slate-900 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0">
            <Image
              src="/images/programs-hq/technology-hero.jpg"
              alt="Store"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-black mb-4">
                Elevate Store
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Everything you need for workforce development - gear, courses, workbooks, and platform licenses.
              </p>
              
              {/* Universal Search with Quick Filters */}
              <div className="max-w-2xl mx-auto">
                <UniversalSearch 
                  placeholder="Search programs, courses, licenses, tools..."
                  showFilters={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Avatar Guide - Under Hero */}
        <section className="bg-slate-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AvatarVideoOverlay
                videoSrc="/videos/avatars/store-assistant.mp4"
                avatarName="Store Guide"
                position="inline"
                size="medium"
                autoPlay={true}
                showOnLoad={true}
              />
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-orange-600 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-sm text-orange-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Cards - Tier 1 (Above the fold) */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {primaryCards.map((card) => {
                const Icon = iconMap[card.icon];
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    data-tour={card.tourId}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all flex flex-col"
                  >
                    {/* Card Image */}
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-black text-lg mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{card.subtitle}</p>
                      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">{card.description}</p>
                      <span className="inline-flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500 font-medium">
              More
            </span>
          </div>
        </div>

        {/* Secondary Cards - Tier 2 */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {secondaryCards.map((card) => {
                const Icon = iconMap[card.icon];
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    data-tour={card.tourId}
                    className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-orange-500 hover:shadow-lg hover:bg-white transition-all flex items-start gap-4 p-4"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-black mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{card.subtitle}</p>
                      <span className="inline-flex items-center gap-1 text-orange-600 font-medium text-sm">
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-black mb-6 text-center">Quick Links</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'View Cart', href: '/shop/cart', icon: ShoppingBag },
                { label: 'My Orders', href: '/shop/orders', icon: FileText },
                { label: 'My Courses', href: '/lms/dashboard', icon: GraduationCap },
                { label: 'Contact Sales', href: '/contact', icon: Users },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow transition"
                >
                  <link.icon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-black">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-4">Need Help Finding Something?</h2>
            <p className="text-slate-300 mb-6">
              Our team is here to help you find the right products, courses, or platform solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition"
              >
                Contact Us
              </Link>
              <Link 
                href="/demo" 
                className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </StoreClientWrapper>
  );
}
