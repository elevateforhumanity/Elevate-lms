import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, Search, Filter, Plus, Mail, Phone, MapPin,
  MoreVertical, Star, Tag, Building2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacts | CRM | Admin | Elevate For Humanity',
  description: 'Manage contacts and leads in the CRM.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/admin/crm/contacts');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin/crm/contacts');
  }

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(317) 555-0123',
      company: 'Healthcare Plus',
      type: 'Lead',
      status: 'Hot',
      lastContact: '2 days ago',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
      id: 2,
      name: 'Marcus Williams',
      email: 'marcus.w@email.com',
      phone: '(312) 555-0456',
      company: 'Style Cuts Barbershop',
      type: 'Customer',
      status: 'Active',
      lastContact: '1 week ago',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '(313) 555-0789',
      company: 'Cool Air HVAC',
      type: 'Partner',
      status: 'Active',
      lastContact: '3 days ago',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.t@email.com',
      phone: '(614) 555-0321',
      company: 'Swift Logistics',
      type: 'Lead',
      status: 'Warm',
      lastContact: '5 days ago',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      email: 'jessica.m@email.com',
      phone: '(502) 555-0654',
      company: 'City Medical Center',
      type: 'Customer',
      status: 'Active',
      lastContact: 'Today',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-700';
      case 'Warm': return 'bg-orange-100 text-orange-700';
      case 'Active': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lead': return 'bg-blue-100 text-blue-700';
      case 'Customer': return 'bg-green-100 text-green-700';
      case 'Partner': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              </div>
              <p className="text-gray-600">Manage your contacts and relationships</p>
            </div>
            <Link
              href="/admin/crm/contacts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Types</option>
                <option>Leads</option>
                <option>Customers</option>
                <option>Partners</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>All Status</option>
                <option>Hot</option>
                <option>Warm</option>
                <option>Active</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={contact.image}
                        alt={contact.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Building2 className="w-3 h-3" />
                        {contact.company}
                      </div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {contact.phone}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
                    {contact.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Last contact: {contact.lastContact}</span>
                  <Link
                    href={`/admin/crm/contacts/${contact.id}`}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
