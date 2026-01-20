'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, User, Briefcase, Home, Heart, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

const sections = [
  { id: 'personal', name: 'Personal Info', icon: User, complete: false },
  { id: 'income', name: 'Income', icon: Briefcase, complete: false },
  { id: 'deductions', name: 'Deductions', icon: Home, complete: false },
  { id: 'credits', name: 'Credits', icon: Heart, complete: false },
  { id: 'review', name: 'Review & File', icon: FileText, complete: false },
];

export default function TaxSelfPrepStartPage() {
  const [activeSection, setActiveSection] = useState('personal');
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const markComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tax-self-prep" className="hover:text-orange-600">Self-Prep</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Start Filing</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Self-Prep Tax Filing</h1>
        <p className="text-gray-600 mb-8">Complete each section to file your taxes</p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="bg-white rounded-xl border p-2 sticky top-4">
              {sections.map((section, idx) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left ${
                    activeSection === section.id ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    completedSections.includes(section.id) ? 'bg-green-500 text-white' :
                    activeSection === section.id ? 'bg-orange-500 text-white' : 'bg-gray-200'
                  }`}>
                    {completedSections.includes(section.id) ? <CheckCircle className="w-4 h-4" /> : <section.icon className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl border p-6">
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Social Security Number</label>
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="XXX-XX-XXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option>Single</option>
                        <option>Married Filing Jointly</option>
                        <option>Married Filing Separately</option>
                        <option>Head of Household</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'income' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Income Sources</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">W-2 Wages</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Employer Name</label>
                          <input type="text" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Wages (Box 1)</label>
                          <input type="number" className="w-full px-3 py-2 border rounded-lg" placeholder="0.00" />
                        </div>
                      </div>
                    </div>
                    <button className="text-orange-600 text-sm font-medium">+ Add another W-2</button>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">1099 Income</h3>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Total 1099 Income</label>
                        <input type="number" className="w-full px-3 py-2 border rounded-lg" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'deductions' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Deductions</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="deduction" defaultChecked />
                      <div>
                        <p className="font-medium">Standard Deduction</p>
                        <p className="text-sm text-gray-500">$13,850 for single filers (2023)</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="deduction" />
                      <div>
                        <p className="font-medium">Itemized Deductions</p>
                        <p className="text-sm text-gray-500">Mortgage interest, charitable donations, etc.</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {activeSection === 'credits' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Tax Credits</h2>
                  <div className="space-y-3">
                    {['Earned Income Tax Credit (EITC)', 'Child Tax Credit', 'Education Credits', 'Retirement Savings Credit'].map(credit => (
                      <label key={credit} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" className="w-5 h-5 rounded" />
                        <span>{credit}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'review' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Review & File</h2>
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-green-600 mb-1">Estimated Refund</p>
                    <p className="text-4xl font-bold text-green-700">$2,847</p>
                  </div>
                  <div className="space-y-2">
                    {sections.slice(0, -1).map(section => (
                      <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>{section.name}</span>
                        {completedSections.includes(section.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="text-sm text-orange-600">Incomplete</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6 pt-4 border-t">
                <button onClick={() => markComplete(activeSection)}
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  {activeSection === 'review' ? 'File My Return' : 'Save & Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
