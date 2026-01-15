'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Info, Building2, Users, DollarSign, Briefcase, Calendar, ArrowRight,
  CheckCircle, Clock, Award, Plus, Search, ChevronRight, FileText,
  TrendingUp, Star, MapPin
} from 'lucide-react';

const companyInfo = {
  name: 'Metro Healthcare Partners',
  industry: 'Healthcare',
  location: 'Indianapolis, IN',
  partnerSince: 'March 2024',
};

const stats = { openRoles: 5, activeCandidates: 12, hiredThisYear: 8, apprentices: 3 };

const candidates = [
  { id: 1, name: 'Sarah Mitchell', program: 'CNA Training', progress: 95, status: 'Interview Scheduled', match: 95, appliedDate: 'Jan 10, 2025', avatar: '/images/testimonials/student-sarah.jpg' },
  { id: 2, name: 'James Thompson', program: 'CNA Training', progress: 88, status: 'Application Review', match: 88, appliedDate: 'Jan 12, 2025', avatar: '/images/testimonials/student-david.jpg' },
  { id: 3, name: 'Lisa Rodriguez', program: 'Medical Assistant', progress: 67, status: 'Screening', match: 82, appliedDate: 'Jan 8, 2025', avatar: '/images/testimonials/testimonial-medical-assistant.png' },
  { id: 4, name: 'Michael Chen', program: 'Phlebotomy', progress: 100, status: 'Offer Extended', match: 91, appliedDate: 'Jan 5, 2025', avatar: '/images/testimonials/student-marcus.jpg' },
  { id: 5, name: 'Amanda Foster', program: 'CNA Training', progress: 78, status: 'Phone Screen', match: 79, appliedDate: 'Jan 11, 2025', avatar: '/images/testimonials/student-graduate-testimonial.jpg' },
];

const openRoles = [
  { id: 1, title: 'CNA - Day Shift', department: 'Patient Care', location: 'Downtown Campus', posted: 'Jan 5, 2025', applicants: 8, status: 'Active' },
  { id: 2, title: 'CNA - Night Shift', department: 'Patient Care', location: 'West Campus', posted: 'Jan 8, 2025', applicants: 5, status: 'Active' },
  { id: 3, title: 'Medical Assistant', department: 'Outpatient', location: 'Main Office', posted: 'Jan 10, 2025', applicants: 3, status: 'Active' },
  { id: 4, title: 'Phlebotomist', department: 'Laboratory', location: 'Downtown Campus', posted: 'Dec 20, 2024', applicants: 12, status: 'Active' },
  { id: 5, title: 'Patient Care Tech', department: 'Emergency', location: 'Downtown Campus', posted: 'Jan 12, 2025', applicants: 2, status: 'Pending' },
];

const apprentices = [
  { id: 1, name: 'David Park', role: 'CNA Apprentice', hours: 847, level: 'Intermediate', startDate: 'Aug 2024', wage: '$16.50/hr', avatar: '/images/testimonials/student-david.jpg' },
  { id: 2, name: 'Jennifer Lee', role: 'MA Apprentice', hours: 456, level: 'Entry', startDate: 'Oct 2024', wage: '$15.00/hr', avatar: '/images/testimonials/student-sarah.jpg' },
  { id: 3, name: 'Robert Wilson', role: 'CNA Apprentice', hours: 1203, level: 'Advanced', startDate: 'May 2024', wage: '$18.00/hr', avatar: '/images/testimonials/student-marcus.jpg' },
];

const wageProgression = [
  { level: 'Entry', wage: '$15.00/hr', hours: '0-500' },
  { level: 'Intermediate', wage: '$16.50/hr', hours: '501-1000' },
  { level: 'Advanced', wage: '$18.00/hr', hours: '1001-1500' },
  { level: 'Journey', wage: '$20.00/hr', hours: '1500+' },
];

const incentivePrograms = [
  { name: 'Work Opportunity Tax Credit (WOTC)', amount: 'Up to $2,400-$9,600', description: 'Federal tax credit for hiring from target groups' },
  { name: 'On-the-Job Training (OJT)', amount: 'Up to 50% wage reimbursement', description: 'Reimbursement during training period' },
  { name: 'Apprenticeship Tax Credit', amount: 'Up to $2,000/apprentice', description: 'State tax credit for registered apprentices' },
];

export default function EmployerDemoPage() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return 'bg-green-100 text-green-700';
      case 'Offer Extended': return 'bg-purple-100 text-purple-700';
      case 'Application Review': return 'bg-blue-100 text-blue-700';
      case 'Phone Screen': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode — Fully interactive employer partner portal
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/demo" className="text-slate-600 hover:text-orange-600 transition">
              ← Back to Demo Hub
            </Link>
            <Link href="/schedule" className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
              <Calendar className="w-4 h-4" /> Schedule Demo
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{companyInfo.name}</h1>
                <p className="text-slate-600">{companyInfo.industry} • {companyInfo.location} • Partner since {companyInfo.partnerSince}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{stats.openRoles}</div>
                <div className="text-xs text-slate-500">Open Roles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.hiredThisYear}</div>
                <div className="text-xs text-slate-500">Hired YTD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.apprentices}</div>
                <div className="text-xs text-slate-500">Apprentices</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {['pipeline', 'roles', 'apprenticeship', 'incentives'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition border-b-2 -mb-px ${
                activeTab === tab ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'pipeline' ? 'Candidate Pipeline' : tab === 'roles' ? 'Open Roles' : tab}
            </button>
          ))}
        </div>

        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Candidate</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Program</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Match</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image src={candidate.avatar} alt={candidate.name} width={40} height={40} className="rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-slate-900">{candidate.name}</p>
                            <p className="text-sm text-slate-500">Applied {candidate.appliedDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{candidate.program}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${candidate.progress}%` }} />
                          </div>
                          <span className="text-sm text-slate-600">{candidate.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-slate-900">{candidate.match}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedCandidate(candidate.id)}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Open Positions</h2>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                <Plus className="w-5 h-5" /> Post New Role
              </button>
            </div>

            <div className="grid gap-4">
              {openRoles.map((role) => (
                <div key={role.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {role.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {role.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted {role.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{role.applicants}</div>
                        <div className="text-xs text-slate-500">Applicants</div>
                      </div>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        role.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {role.status}
                      </span>
                      <button className="text-purple-600 hover:text-purple-700">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apprenticeship Tab */}
        {activeTab === 'apprenticeship' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Current Apprentices</h2>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      Registered with Indiana DOL
                    </span>
                  </div>
                  <div className="space-y-4">
                    {apprentices.map((apprentice) => (
                      <div key={apprentice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Image src={apprentice.avatar} alt={apprentice.name} width={48} height={48} className="rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-slate-900">{apprentice.name}</p>
                            <p className="text-sm text-slate-500">{apprentice.role} • Started {apprentice.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="font-bold text-slate-900">{apprentice.hours.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">Hours</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-purple-600">{apprentice.level}</p>
                            <p className="text-xs text-slate-500">Level</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-green-600">{apprentice.wage}</p>
                            <p className="text-xs text-slate-500">Current Wage</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Wage Progression</h3>
                  <div className="space-y-3">
                    {wageProgression.map((level, idx) => (
                      <div key={level.level} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{level.level}</p>
                          <p className="text-xs text-slate-500">{level.hours} hours</p>
                        </div>
                        <p className="font-bold text-green-600">{level.wage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <Award className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-purple-900 mb-2">Apprenticeship Benefits</h3>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> OJT hour tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Wage progression records</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Competency tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Compliance documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Incentives Tab */}
        {activeTab === 'incentives' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
              <DollarSign className="w-10 h-10 mb-3 opacity-80" />
              <h2 className="text-2xl font-bold mb-2">Hiring Incentives Available</h2>
              <p className="opacity-90 mb-4">You may be eligible for up to $50,000 in annual hiring incentives</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">$5,000</p>
                  <p className="text-sm opacity-80">Per eligible hire</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">50%</p>
                  <p className="text-sm opacity-80">OJT wage reimbursement</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-3xl font-bold">$2,000</p>
                  <p className="text-sm opacity-80">Per apprentice credit</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {incentivePrograms.map((program, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{program.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{program.amount}</p>
                  <p className="text-sm text-slate-500">{program.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <Info className="w-4 h-4 inline mr-2" />
                Eligibility and approval requirements apply. Contact your workforce representative for details on available incentives.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            {(() => {
              const candidate = candidates.find(c => c.id === selectedCandidate);
              if (!candidate) return null;
              return (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <Image src={candidate.avatar} alt={candidate.name} width={64} height={64} className="rounded-full object-cover" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
                      <p className="text-slate-500">{candidate.program}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-500">Program Progress</p>
                      <p className="text-2xl font-bold text-slate-900">{candidate.progress}%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-500">Match Score</p>
                      <p className="text-2xl font-bold text-green-600">{candidate.match}%</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setSelectedCandidate(null)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-medium">
                      Close
                    </button>
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                      Schedule Interview
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <section className="bg-slate-900 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to streamline your hiring?</h2>
          <p className="text-slate-300 mb-6">Schedule a demo to see how Elevate can help you find and hire qualified candidates.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule" className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              <Calendar className="w-5 h-5" /> Schedule a Live Demo
            </Link>
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Back to Demo Hub <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
