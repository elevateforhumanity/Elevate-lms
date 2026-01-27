'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
  Shield,
  Server,
  Users,
  BookOpen,
  Settings,
  Lock,
  Clock,
  Headphones,
  Globe,
  AlertTriangle,
} from 'lucide-react';

const MANAGED_LICENSE = {
  name: 'Managed Enterprise LMS Platform',
  setupFee: { min: 7500, max: 15000 },
  monthlyFee: { min: 1500, max: 3500 },
  description: 'Subscription-based enterprise LMS operated by Elevate for Humanity.',
  includes: [
    'Enterprise LMS (courses, assessments, certificates)',
    'Multi-tenant organization setup',
    'Custom domain and branding',
    'Fully managed hosting and infrastructure',
    'Security updates and maintenance',
    'Compliance-ready infrastructure',
    'Role-based access control',
    'Dedicated support',
  ],
  youManage: [
    'Your organization settings',
    'Users and permissions',
    'Courses and content',
    'Student enrollments',
    'Certificates and credentials',
  ],
  weManage: [
    'Platform hosting and uptime',
    'Security and backups',
    'Software updates',
    'Infrastructure scaling',
    'Compliance maintenance',
    'Technical support',
  ],
};

const ENFORCEMENT_NOTICE = `An active subscription is required for continued platform operation. 
Non-payment results in automatic platform lockout. This is not negotiable.`;

const MASTER_STATEMENT = `All platform products are licensed access to systems operated by Elevate for Humanity. 
Ownership of software, infrastructure, and intellectual property is not transferred.`;

export default function ManagedLicensePage() {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('standard');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
              <Shield className="w-4 h-4" />
              Managed Platform
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              {MANAGED_LICENSE.name}
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              {MANAGED_LICENSE.description} You manage your organization, users, and programs. 
              We manage the platform, infrastructure, security, and enforcement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/store/demo"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Watch Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANAGED_LICENSE.includes.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You Manage vs We Manage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* You Manage */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">You Manage</h3>
              </div>
              <ul className="space-y-3">
                {MANAGED_LICENSE.youManage.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* We Manage */}
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">We Manage</h3>
              </div>
              <ul className="space-y-3">
                {MANAGED_LICENSE.weManage.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8 text-center">Pricing</h2>
          
          <div className="bg-slate-800 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-400 mb-2">One-Time Setup</h3>
                <div className="text-4xl font-black text-white">
                  ${MANAGED_LICENSE.setupFee.min.toLocaleString()} – ${MANAGED_LICENSE.setupFee.max.toLocaleString()}
                </div>
                <p className="text-slate-400 mt-2">
                  Includes tenant provisioning, domain setup, branding configuration, and onboarding.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-400 mb-2">Monthly Subscription</h3>
                <div className="text-4xl font-black text-white">
                  ${MANAGED_LICENSE.monthlyFee.min.toLocaleString()} – ${MANAGED_LICENSE.monthlyFee.max.toLocaleString()}
                  <span className="text-lg font-normal text-slate-400">/month</span>
                </div>
                <p className="text-slate-400 mt-2">
                  Annual commitment preferred. Includes all platform features and support.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <Link
                href="/store/licenses/checkout/managed"
                className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Start License Setup
              </Link>
            </div>
          </div>

          {/* Enforcement Notice */}
          <div className="bg-amber-900/30 border border-amber-600/50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-400 mb-2">Payment Enforcement</h4>
                <p className="text-amber-200/80 text-sm">
                  {ENFORCEMENT_NOTICE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
            Getting Started
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Complete Checkout', desc: 'Pay setup fee and first month subscription.' },
              { step: 2, title: 'Tenant Provisioning', desc: 'We create your dedicated organization space within 24 hours.' },
              { step: 3, title: 'Domain Setup (Optional)', desc: 'Connect your custom domain or use our subdomain.' },
              { step: 4, title: 'Onboarding Call', desc: 'Walk through admin setup, branding, and first courses.' },
              { step: 5, title: 'Go Live', desc: 'Start enrolling students and delivering training.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Statement */}
      <section className="py-8 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-600 italic">
            {MASTER_STATEMENT}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Launch your managed LMS platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Watch Demo First
            </Link>
            <Link
              href="/store/licenses/checkout/managed"
              className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors"
            >
              Start License Setup
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
