import Link from 'next/link';
import { Building2, Users, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';

const offices = [
  { id: 1, name: 'Indianapolis Main', address: '123 Main St, Indianapolis, IN 46204', phone: '(317) 555-0100', manager: 'Sarah Johnson', students: 156, active: true },
  { id: 2, name: 'Fort Wayne', address: '456 Oak Ave, Fort Wayne, IN 46802', phone: '(260) 555-0200', manager: 'Michael Chen', students: 89, active: true },
  { id: 3, name: 'South Bend', address: '789 Elm St, South Bend, IN 46601', phone: '(574) 555-0300', manager: 'Emily Davis', students: 67, active: true },
  { id: 4, name: 'Evansville', address: '321 Pine Rd, Evansville, IN 47708', phone: '(812) 555-0400', manager: 'James Wilson', students: 45, active: false },
];

export default function SubOfficesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sub-Offices</h1>
            <p className="text-gray-600">Manage regional training locations</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add Office</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3"><Building2 className="w-8 h-8 text-blue-600" /><div><p className="text-sm text-gray-500">Total Offices</p><p className="text-2xl font-bold">{offices.length}</p></div></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3"><Users className="w-8 h-8 text-green-600" /><div><p className="text-sm text-gray-500">Total Students</p><p className="text-2xl font-bold">{offices.reduce((s, o) => s + o.students, 0)}</p></div></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3"><TrendingUp className="w-8 h-8 text-purple-600" /><div><p className="text-sm text-gray-500">Active Offices</p><p className="text-2xl font-bold">{offices.filter(o => o.active).length}</p></div></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {offices.map((office) => (
            <div key={office.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{office.name}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${office.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{office.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="text-right"><p className="text-2xl font-bold text-blue-600">{office.students}</p><p className="text-xs text-gray-500">students</p></div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {office.address}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {office.phone}</p>
                <p className="flex items-center gap-2"><Users className="w-4 h-4" /> Manager: {office.manager}</p>
              </div>
              <div className="mt-4 pt-4 border-t flex gap-2">
                <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50">View Details</button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
