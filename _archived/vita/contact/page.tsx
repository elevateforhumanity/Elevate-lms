import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | VITA Free Tax Prep',
  description: 'Contact VITA for questions about free tax preparation services.',
};

export const dynamic = 'force-dynamic';

export default async function VITAContactPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get contact info
  const { data: contactInfo } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'vita_contact')
    .single();

  const defaultContact = {
    phone: '(317) 314-3757',
    email: 'elevate4humanityedu@gmail.com',
    address: '3737 N Meridian St, Suite 200, Indianapolis, IN 46208',
    hours: 'Monday-Friday: 9am-5pm, Saturday: 10am-2pm (during tax season)',
  };

  const contact = contactInfo?.value || defaultContact;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Contact VITA</h1>
          <p className="text-xl text-green-100">
            Questions about free tax preparation? We're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <a href={`tel:${contact.phone?.replace(/\D/g, '')}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-green-600">{contact.phone}</div>
                  </div>
                </a>

                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <Mail className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-green-600">{contact.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">{contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-gray-600">{contact.hours}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>General Question</option>
                  <option>Appointment Inquiry</option>
                  <option>Eligibility Question</option>
                  <option>Volunteer Interest</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border rounded-lg" required></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
