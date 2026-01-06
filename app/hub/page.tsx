import Link from 'next/link';
import {
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  Heart,
  Wrench,
  Church,
  Home,
  Hammer,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Handshake,
  MessageSquare,
  Calendar,
} from 'lucide-react';

export const metadata = {
  title: 'Hub - All Services | Elevate for Humanity',
  description:
    'Explore all businesses, training programs, and services in the Elevate Hub',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/hub',
  },
};

export default function HubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Elevate Hub</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your complete ecosystem for workforce training, business services,
            and community support
          </p>
        </div>
      </section>

      {/* Businesses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            Our Businesses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HubCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Supersonic Fast Cash"
              description="Fast tax refunds and financial services"
              href="/supersonic-fast-cash"
              color="orange"
            />
            <HubCard
              icon={<Church className="w-8 h-8" />}
              title="Kingdom Konnect"
              description="Faith-based community services and programs"
              href="/kingdom-konnect"
              color="purple"
            />
            <HubCard
              icon={<Home className="w-8 h-8" />}
              title="Serene Comfort Care"
              description="Professional home care services"
              href="/serene-comfort-care"
              color="green"
            />
            <HubCard
              icon={<Hammer className="w-8 h-8" />}
              title="Urban Build Crew"
              description="Construction and building services"
              href="/urban-build-crew"
              color="yellow"
            />
            <HubCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Selfish Inc"
              description="Business services and consulting"
              href="/selfish-inc"
              color="blue"
            />
            <HubCard
              icon={<Heart className="w-8 h-8" />}
              title="Rise Foundation"
              description="Nonprofit community foundation"
              href="/rise-foundation"
              color="red"
            />
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🤖 AI-Powered Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HubCard
              title="AI Hub"
              description="All AI tools in one place"
              href="/ai"
              size="small"
            />
            <HubCard
              title="AI Chat"
              description="Chat with AI assistant"
              href="/ai-chat"
              size="small"
            />
            <HubCard
              title="AI Studio"
              description="Create content with AI"
              href="/ai-studio"
              size="small"
            />
            <HubCard
              title="AI Tutor"
              description="Personal AI tutor"
              href="/ai-tutor"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🛒 Marketplace
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <HubCard
              title="Marketplace"
              description="Browse services"
              href="/marketplace"
              size="small"
            />
            <HubCard
              title="Shop"
              description="Online shop"
              href="/shop"
              size="small"
            />
            <HubCard
              title="Store"
              description="Product store"
              href="/store"
              size="small"
            />
            <HubCard
              title="Checkout"
              description="Secure checkout"
              href="/checkout"
              size="small"
            />
            <HubCard
              title="Banking"
              description="Banking services"
              href="/banking"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            Workforce Training
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HubCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Programs"
              description="100+ career training programs"
              href="/programs"
              size="small"
            />
            <HubCard
              icon={<Target className="w-6 h-6" />}
              title="Courses"
              description="Individual skill courses"
              href="/courses"
              size="small"
            />
            <HubCard
              icon={<Users className="w-6 h-6" />}
              title="Apprenticeships"
              description="Earn while you learn"
              href="/apprenticeships"
              size="small"
            />
            <HubCard
              icon={<Award className="w-6 h-6" />}
              title="Certificates"
              description="Earn credentials"
              href="/certificates"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <BookOpen className="w-5 h-5 inline-block" /> Learning Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <HubCard
              title="Lessons"
              description="Browse lessons"
              href="/lessons"
              size="small"
            />
            <HubCard
              title="Syllabi"
              description="Course syllabi"
              href="/syllabi"
              size="small"
            />
            <HubCard
              title="Workbooks"
              description="Digital workbooks"
              href="/workbooks"
              size="small"
            />
            <HubCard
              title="Orientation"
              description="New student orientation"
              href="/orientation"
              size="small"
            />
            <HubCard
              title="Student Handbook"
              description="Student resources"
              href="/student-handbook"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Employers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Briefcase className="w-5 h-5 inline-block" /> For Employers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HubCard
              title="Hire Graduates"
              description="Recruit trained talent"
              href="/hire-graduates"
              size="small"
            />
            <HubCard
              title="OJT & Funding"
              description="On-the-job training programs"
              href="/ojt-and-funding"
              size="small"
            />
            <HubCard
              title="Industries"
              description="Industry partnerships"
              href="/industries"
              size="small"
            />
            <HubCard
              title="Workforce Partners"
              description="Partner network"
              href="/workforce-partners"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Wrench className="w-8 h-8 text-blue-600" />
            Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HubCard
              title="Career Services"
              description="Job placement and career support"
              href="/career-services"
              size="small"
            />
            <HubCard
              title="Support Services"
              description="Barrier removal & assistance"
              href="/support"
              size="small"
            />
            <HubCard
              title="Tax Services (VITA)"
              description="Free tax preparation"
              href="/tax"
              size="small"
            />
            <HubCard
              title="Advising"
              description="Academic and career advising"
              href="/advising"
              size="small"
            />
            <HubCard
              title="Mentorship"
              description="One-on-one mentoring"
              href="/mentorship"
              size="small"
            />
            <HubCard
              title="Booking"
              description="Schedule appointments"
              href="/booking"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Handshake className="w-8 h-8 text-blue-600" />
            Partnerships
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HubCard
              title="Partner With Us"
              description="Become a partner"
              href="/partners"
              size="small"
            />
            <HubCard
              title="SNAP-ET"
              description="SNAP Employment & Training"
              href="/snap-et-partner"
              size="small"
            />
            <HubCard
              title="FSSA"
              description="Family & Social Services"
              href="/fssa-partnership-request"
              size="small"
            />
            <HubCard
              title="WorkOne"
              description="WorkOne partnership"
              href="/workone-partner-packet"
              size="small"
            />
            <HubCard
              title="JRI"
              description="Justice Reinvestment"
              href="/jri"
              size="small"
            />
            <HubCard
              title="Franchise"
              description="Franchise opportunities"
              href="/franchise"
              size="small"
            />
            <HubCard
              title="White Label"
              description="White-label licensing"
              href="/white-label"
              size="small"
            />
            <HubCard
              title="Licensing"
              description="Partnership licensing"
              href="/licensing-partnerships"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            Community
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HubCard
              title="Blog"
              description="Latest news and updates"
              href="/blog"
              size="small"
            />
            <HubCard
              title="Forums"
              description="Community discussions"
              href="/forums"
              size="small"
            />
            <HubCard
              title="Events"
              description="Upcoming events"
              href="/events"
              size="small"
            />
            <HubCard
              title="Webinars"
              description="Online workshops"
              href="/webinars"
              size="small"
            />
            <HubCard
              title="Reels"
              description="Video content"
              href="/reels"
              size="small"
            />
            <HubCard
              title="Success Stories"
              description="Student success"
              href="/success-stories"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of people transforming their lives through our hub
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 text-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}

function HubCard({
  icon,
  title,
  description,
  href,
  color = 'blue',
  size = 'normal',
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color?: string;
  size?: 'normal' | 'small';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <Link
      href={href}
      className={`block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 ${
        size === 'small' ? 'p-4' : 'p-6'
      }`}
    >
      {icon && (
        <div
          className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} text-white mb-4`}
        >
          {icon}
        </div>
      )}
      <h3
        className={`font-bold text-gray-900 mb-2 ${size === 'small' ? 'text-lg' : 'text-xl'}`}
      >
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
