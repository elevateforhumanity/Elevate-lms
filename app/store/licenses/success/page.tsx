'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Copy,
  Download,
  Mail,
  ArrowRight,
  Key,
  Github,
  Server,
  Palette,
  Database,
  CreditCard,
  Globe,
  BookOpen,
  MessageCircle,
  Check,
  ExternalLink,
} from 'lucide-react';

export default function LicenseSuccessPage() {
  const searchParams = useSearchParams();
  const [licenseData, setLicenseData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const productSlug = searchParams.get('product');
  const paymentIntent = searchParams.get('payment_intent');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Fetch license details after successful payment
    async function fetchLicense() {
      // Try session_id first (new flow), then payment_intent (legacy)
      const identifier = sessionId || paymentIntent;
      const param = sessionId ? 'session_id' : 'payment_intent';
      
      if (identifier) {
        try {
          // First check checkout session status
          if (sessionId) {
            const statusRes = await fetch(`/api/licenses/checkout?session_id=${sessionId}`);
            if (statusRes.ok) {
              const statusData = await statusRes.json();
              if (statusData.payment_status === 'paid') {
                // Payment confirmed, fetch license
                const licenseRes = await fetch(`/api/store/licenses/get-by-payment?${param}=${identifier}`);
                if (licenseRes.ok) {
                  const data = await licenseRes.json();
                  setLicenseData(data);
                }
              }
            }
          } else {
            // Legacy flow
            const res = await fetch(`/api/store/licenses/get-by-payment?${param}=${identifier}`);
            if (res.ok) {
              const data = await res.json();
              setLicenseData(data);
            }
          }
        } catch (error) {
          console.error('Failed to fetch license:', error);
        }
      }
      setLoading(false);
    }
    fetchLicense();
  }, [paymentIntent, sessionId]);

  const copyLicenseKey = () => {
    if (licenseData?.licenseKey) {
      navigator.clipboard.writeText(licenseData.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const implementationSteps = [
    {
      step: 1,
      title: 'Access Your Repository',
      description: 'Clone the private GitHub repository to your local machine or fork it to your account.',
      icon: Github,
      action: {
        label: 'Open GitHub Repository',
        href: licenseData?.repoUrl || 'https://github.com/elevateforhumanity/elevate-lms',
      },
      details: [
        'You\'ll receive an email with repository access',
        'Use your license key when prompted during setup',
        'Repository includes full source code and documentation',
      ],
    },
    {
      step: 2,
      title: 'Set Up Supabase Database',
      description: 'Create a free Supabase project and run the database migrations.',
      icon: Database,
      action: {
        label: 'Create Supabase Project',
        href: 'https://supabase.com/dashboard',
      },
      details: [
        'Create a new project at supabase.com',
        'Copy your project URL and anon key',
        'Run migrations: npx supabase db push',
      ],
    },
    {
      step: 3,
      title: 'Configure Stripe Payments',
      description: 'Connect your Stripe account to accept payments from students.',
      icon: CreditCard,
      action: {
        label: 'Stripe Dashboard',
        href: 'https://dashboard.stripe.com',
      },
      details: [
        'Create or use existing Stripe account',
        'Get your API keys from Developers section',
        'Set up webhook endpoint for payment events',
      ],
    },
    {
      step: 4,
      title: 'Customize Your Branding',
      description: 'Update colors, logo, and organization name to match your brand.',
      icon: Palette,
      action: {
        label: 'View Branding Guide',
        href: '/docs/branding',
      },
      details: [
        'Update logo in /public/images/',
        'Modify colors in tailwind.config.js',
        'Edit organization name in .env.local',
      ],
    },
    {
      step: 5,
      title: 'Deploy to Production',
      description: 'Deploy your platform to Netlify, AWS, or your preferred hosting.',
      icon: Server,
      action: {
        label: 'Deploy to Netlify',
        href: 'https://app.netlify.com/start',
      },
      details: [
        'Connect your GitHub repository',
        'Add environment variables',
        'Deploy with one click',
      ],
    },
    {
      step: 6,
      title: 'Connect Your Domain',
      description: 'Point your custom domain to your deployed platform.',
      icon: Globe,
      action: {
        label: 'Domain Setup Guide',
        href: '/docs/custom-domain',
      },
      details: [
        'Add domain in Vercel dashboard',
        'Update DNS records at your registrar',
        'SSL certificate auto-provisioned',
      ],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">License Activated!</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Your platform license is ready. Follow the steps below to deploy your own workforce training platform.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* License Key Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 -mt-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl font-bold">Your License Key</h2>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <code className="text-green-400 font-mono text-lg break-all">
                {licenseData?.licenseKey || 'EFH-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX'}
              </code>
              <button
                onClick={copyLicenseKey}
                className="ml-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition flex-shrink-0"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 mb-1">License Type</div>
              <div className="font-semibold capitalize">
                {licenseData?.tier || productSlug?.replace('-', ' ') || 'Professional'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 mb-1">Valid Until</div>
              <div className="font-semibold">
                {licenseData?.expiresAt
                  ? new Date(licenseData.expiresAt).toLocaleDateString()
                  : 'Lifetime'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 mb-1">Deployments</div>
              <div className="font-semibold">
                {licenseData?.maxDeployments === 999 ? 'Unlimited' : licenseData?.maxDeployments || '1'}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-800">License key sent to your email</p>
              <p className="text-amber-700">
                Save this key securely. You'll need it to validate your deployment and access updates.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2">Implementation Guide</h2>
          <p className="text-gray-600 mb-8">
            Follow these steps to deploy your platform. Most customers are live within 30 minutes.
          </p>

          <div className="space-y-6">
            {implementationSteps.map((item) => (
              <div
                key={item.step}
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">
                        Step {item.step}: {item.title}
                      </h3>
                      <a
                        href={item.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        {item.action.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <ul className="space-y-1">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <Check className="w-4 h-4 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <BookOpen className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">
              Complete guides for setup, customization, and administration.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
            >
              View Documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <MessageCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Priority Support</h3>
            <p className="text-gray-600 mb-4">
              Get help from our team with setup, customization, or technical issues.
            </p>
            <Link
              href="/contact?topic=license-support"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Start Commands */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Quick Start Commands</h3>
          <div className="space-y-4 font-mono text-sm">
            <div>
              <div className="text-gray-400 mb-1"># Clone the repository</div>
              <code className="text-green-400">
                git clone https://github.com/elevateforhumanity/elevate-lms.git my-platform
              </code>
            </div>
            <div>
              <div className="text-gray-400 mb-1"># Install dependencies</div>
              <code className="text-green-400">cd my-platform && pnpm install</code>
            </div>
            <div>
              <div className="text-gray-400 mb-1"># Copy environment template</div>
              <code className="text-green-400">cp .env.example .env.local</code>
            </div>
            <div>
              <div className="text-gray-400 mb-1"># Start development server</div>
              <code className="text-green-400">pnpm dev</code>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need help getting started? Schedule a free onboarding call with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule?type=onboarding"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Schedule Onboarding Call
            </Link>
            <Link
              href="/store/deployment"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition border border-gray-300"
            >
              View Deployment Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
