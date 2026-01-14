import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  HelpCircle, 
  Clock,
  BookOpen,
  Users,
  CreditCard,
  GraduationCap,
  Wrench,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Center | Elevate For Humanity',
  description: 'Get help with enrollment, programs, technical issues, and more. Contact our support team or browse our knowledge base.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/support',
  },
};

const supportCategories = [
  {
    icon: GraduationCap,
    title: 'Enrollment & Admissions',
    description: 'Questions about applying, eligibility, and getting started',
    href: '/support/help?category=enrollment',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Programs & Courses',
    description: 'Information about training programs, schedules, and curriculum',
    href: '/support/help?category=program',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: CreditCard,
    title: 'Billing & Financial Aid',
    description: 'WIOA funding, payment plans, and financial questions',
    href: '/support/help?category=billing',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Login issues, portal access, and technical problems',
    href: '/support/help?category=technical',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Users,
    title: 'Career Services',
    description: 'Job placement, resume help, and career counseling',
    href: '/support/help?category=general',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: AlertCircle,
    title: 'Urgent Issues',
    description: 'Time-sensitive matters requiring immediate attention',
    href: '/support/ticket?category=urgent',
    color: 'bg-red-100 text-red-600',
  },
];

const quickLinks = [
  { title: 'How to Apply for WIOA Funding', href: '/support/help/how-to-apply-wioa-funding' },
  { title: 'Reset Your Password', href: '/support/help/how-to-reset-password' },
  { title: 'Access Student Portal', href: '/support/help/how-to-access-student-portal' },
  { title: 'Program Duration & Schedules', href: '/support/help/how-long-are-training-programs' },
  { title: 'Is Training Really Free?', href: '/support/help/is-training-really-free' },
  { title: 'Job Placement Services', href: '/support/help/job-placement-services' },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find answers in our help center or contact our support team.
          </p>
          <div className="max-w-2xl mx-auto">
            <form action="/support/help" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for help articles..."
                className="w-full px-6 py-4 rounded-full text-black text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <a href="tel:+13173143757" className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition group">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-black">Call Us</h3>
                <p className="text-gray-600">(317) 314-3757</p>
                <p className="text-sm text-gray-500">Mon-Fri 8am-6pm EST</p>
              </div>
            </a>
            <a href="mailto:support@www.elevateforhumanity.org" className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition group">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-black">Email Us</h3>
                <p className="text-gray-600">support@www.elevateforhumanity.org</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </a>
            <Link href="/support/ticket" className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition group">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-black">Submit a Ticket</h3>
                <p className="text-gray-600">Create a support request</p>
                <p className="text-sm text-gray-500">Track your issue online</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category) => (
              <Link key={category.title} href={category.href} className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition group">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-black mb-2 group-hover:text-blue-600 transition">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">Popular Help Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition group">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-black group-hover:text-blue-600 transition">{link.title}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/support/help" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              <BookOpen className="w-5 h-5" />
              Browse All Help Articles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-black">Support Hours & Response Times</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-black mb-4">Office Hours</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Monday - Friday</span><span className="font-medium">8:00 AM - 6:00 PM EST</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="font-medium">9:00 AM - 2:00 PM EST</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="font-medium">Closed</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-black mb-4">Response Times</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Phone Support</span><span className="font-medium text-green-600">Immediate</span></li>
                  <li className="flex justify-between"><span>Email</span><span className="font-medium">Within 24 hours</span></li>
                  <li className="flex justify-between"><span>Support Tickets</span><span className="font-medium">24-48 hours</span></li>
                  <li className="flex justify-between"><span>Urgent Issues</span><span className="font-medium text-orange-600">Same day</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8">Our support team is ready to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support/ticket" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">Submit a Support Ticket</Link>
            <a href="tel:+13173143757" className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition border-2 border-white">Call (317) 314-3757</a>
          </div>
        </div>
      </section>
    </div>
  );
}
