import { Metadata } from 'next';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'Contact Us | Elevate for Humanity',
  description: 'Get in touch with Elevate for Humanity. Contact us for enrollment questions, financial aid, technical support, or career services. We are here to help.',
  keywords: ['contact', 'support', 'phone', 'email', 'address', 'help', 'enrollment questions'],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us | Elevate for Humanity',
    description: 'Get in touch with Elevate for Humanity for enrollment questions, financial aid, or support.',
    url: `${SITE_URL}/contact`,
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Elevate for Humanity',
    description: 'Get in touch with Elevate for Humanity for enrollment questions or support.',
  },
};

const contactInfo = [
  { icon: Phone, title: 'Phone', value: '(317) 314-3757', subtitle: 'Mon-Fri 8am-6pm EST' },
  { icon: Mail, title: 'Email', value: 'info@elevateforhumanity.org', subtitle: 'We respond within 24 hours' },
  { icon: MapPin, title: 'Address', value: 'Indianapolis, IN', subtitle: 'Central Indiana' },
  { icon: Clock, title: 'Hours', value: 'Mon-Fri 8am-6pm', subtitle: 'Sat 9am-1pm EST' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-900 text-white py-16">
        <Image
          src="/images/heroes/contact-hero.jpg"
          alt="Contact Us"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">We&apos;re here to help with any questions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="font-semibold text-gray-900">{info.title}</h2>
              <p className="text-gray-900 mt-1">{info.value}</p>
              <p className="text-sm text-gray-500">{info.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select id="subject" name="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
                  <option value="">Select a topic...</option>
                  <option value="enrollment">Enrollment Questions</option>
                  <option value="financial">Financial Aid</option>
                  <option value="technical">Technical Support</option>
                  <option value="career">Career Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Campus</h2>
            <div className="relative rounded-xl h-80 overflow-hidden mb-6">
              <Image
                src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Campus"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Elevate for Humanity</h3>
              <p className="text-gray-600">Indianapolis, Indiana</p>
              <p className="text-gray-600">Central Indiana Region</p>
              <p className="text-gray-600 mt-4">Multiple training locations available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
