import { Metadata } from 'next';
import Image from 'next/image';
import { Settings, User, Bell, Shield, CreditCard, Building, Users, Mail, Key, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings | Employer Portal',
  description: 'Manage your employer account settings and preferences.',
  robots: { index: false, follow: false },
};

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: User,
    description: 'Update your personal information and contact details',
    fields: [
      { label: 'Full Name', value: 'John Smith', type: 'text' },
      { label: 'Email', value: 'john@company.com', type: 'email' },
      { label: 'Phone', value: '(555) 123-4567', type: 'tel' },
      { label: 'Job Title', value: 'HR Director', type: 'text' },
    ],
  },
  {
    id: 'company',
    name: 'Company Information',
    icon: Building,
    description: 'Manage your company profile and business details',
    fields: [
      { label: 'Company Name', value: 'ABC Corporation', type: 'text' },
      { label: 'Industry', value: 'Healthcare', type: 'select' },
      { label: 'Company Size', value: '50-200 employees', type: 'select' },
      { label: 'EIN', value: '**-***1234', type: 'text' },
    ],
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive alerts and updates',
    toggles: [
      { label: 'New candidate applications', enabled: true },
      { label: 'WOTC status updates', enabled: true },
      { label: 'Program announcements', enabled: false },
      { label: 'Weekly digest emails', enabled: true },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    description: 'Manage your password and security settings',
    actions: [
      { label: 'Change Password', description: 'Last changed 30 days ago' },
      { label: 'Two-Factor Authentication', description: 'Enabled via SMS' },
      { label: 'Active Sessions', description: '2 devices logged in' },
    ],
  },
];

export default function EmployerSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences and company information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <nav className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
              {settingsSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-purple-600 transition"
                >
                  <section.icon className="w-5 h-5" />
                  {section.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 space-y-8">
            {/* Profile Settings */}
            <section id="profile" className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                  <p className="text-gray-600">Update your personal information</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                    Change Photo
                  </button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 5MB</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {settingsSections[0].fields?.map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Company Information */}
            <section id="company" className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
                  <p className="text-gray-600">Manage your business details</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {settingsSections[1].fields?.map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section id="notifications" className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-gray-600">Configure your alert preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                {settingsSections[2].toggles?.map((toggle, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="text-gray-700">{toggle.label}</span>
                    <button
                      className={`relative w-12 h-6 rounded-full transition ${
                        toggle.enabled ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                          toggle.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Security */}
            <section id="security" className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Security</h2>
                  <p className="text-gray-600">Manage your security settings</p>
                </div>
              </div>

              <div className="space-y-4">
                {settingsSections[3].actions?.map((action, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{action.label}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
