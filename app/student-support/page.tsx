import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HeartHandshake, BookOpen, DollarSign, Briefcase, Users, Phone, MessageSquare, Calendar } from 'lucide-react';

export const metadata: Metadata = { title: 'Student Support | Elevate LMS' };

export default function StudentSupportPage() {
  const services = [
    { icon: BookOpen, title: 'Academic Support', description: 'Tutoring, study groups, and academic advising', link: '/student-support/academic' },
    { icon: DollarSign, title: 'Financial Aid', description: 'Scholarships, grants, and payment plans', link: '/student-support/financial-aid' },
    { icon: Briefcase, title: 'Career Services', description: 'Job placement, resume help, and interview prep', link: '/student-support/career' },
    { icon: Users, title: 'Counseling', description: 'Personal counseling and wellness resources', link: '/student-support/counseling' },
    { icon: HeartHandshake, title: 'Accessibility', description: 'Accommodations and disability services', link: '/student-support/accessibility' },
    { icon: Calendar, title: 'Scheduling', description: 'Class scheduling and calendar management', link: '/student-support/scheduling' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-green-800 text-white py-16">
        <Image
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Student Support"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Student Support Services</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            We're here to help you succeed. Access resources and support throughout your educational journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-gray-600">1-800-ELEVATE</p>
                <p className="text-sm text-gray-500">Mon-Fri 8am-6pm</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-gray-600">Available 24/7</p>
                <Link href="/chat" className="text-sm text-green-600 hover:underline">Start Chat</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Schedule Meeting</p>
                <p className="text-gray-600">Book an appointment</p>
                <Link href="/student-support/schedule" className="text-sm text-green-600 hover:underline">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
