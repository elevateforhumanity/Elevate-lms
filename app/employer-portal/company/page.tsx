import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import { Building, MapPin, Users, Globe, Phone, Mail, Edit, Camera, Award, Briefcase, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Company Profile | Employer Portal',
  description: 'View and manage your company profile.',
  robots: { index: false, follow: false },
};

const companyData = {
  name: 'ABC Healthcare Services',
  logo: '/images/community/community-hero.jpg',
  cover: '/images/community/event-1.jpg',
  industry: 'Healthcare',
  size: '50-200 employees',
  founded: '2015',
  website: 'www.abchealthcare.com',
  phone: '(555) 123-4567',
  email: 'hr@abchealthcare.com',
  address: '500 Medical Center Dr, Indianapolis, IN 46208',
  description: 'ABC Healthcare Services is a leading provider of home health and medical staffing solutions. We are committed to providing quality care while creating opportunities for career growth.',
  benefits: ['Health Insurance', 'Dental & Vision', '401(k) Match', 'Paid Time Off', 'Training Programs', 'Career Advancement'],
  stats: {
    activeJobs: 5,
    totalHires: 47,
    wotcCredits: '$142,500',
    avgTimeToHire: '18 days',
  },
};

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
            <Breadcrumbs items={[{ label: "Employer Portal", href: "/employer-portal" }, { label: "Company" }]} />
{/* Cover Image */}
      <div className="relative h-64">
        <Image
          src={companyData.cover}
          alt="Company cover"
          fill
          className="object-cover"
        />
        
        <button className="absolute top-4 right-4 px-4 py-2 bg-white/90 rounded-lg hover:bg-white transition flex items-center gap-2 text-sm">
          <Camera className="w-4 h-4" />
          Change Cover
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative -mt-20 md:-mt-24">
                <Image
                  src={companyData.logo}
                  alt={companyData.name}
                  width={120}
                  height={120}
                  className="rounded-xl border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {companyData.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {companyData.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Indianapolis, IN
                  </span>
                </div>
              </div>
              <Link
                href="/employer-portal/company/setup"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-600">{companyData.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{companyData.stats.activeJobs}</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{companyData.stats.totalHires}</p>
                <p className="text-sm text-gray-600">Total Hires</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{companyData.stats.wotcCredits}</p>
                <p className="text-sm text-gray-600">WOTC Credits</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{companyData.stats.avgTimeToHire}</p>
                <p className="text-sm text-gray-600">Avg. Time to Hire</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Benefits & Perks</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {companyData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a href="#" className="text-purple-600 hover:underline">{companyData.website}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{companyData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{companyData.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{companyData.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/employer-portal/jobs/new"
                  className="block w-full px-4 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition"
                >
                  Post New Job
                </Link>
                <Link
                  href="/employer-portal/candidates"
                  className="block w-full px-4 py-3 border border-purple-600 text-purple-600 text-center rounded-lg hover:bg-purple-50 transition"
                >
                  Browse Candidates
                </Link>
                <Link
                  href="/employer-portal/wotc"
                  className="block w-full px-4 py-3 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition"
                >
                  View WOTC Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
