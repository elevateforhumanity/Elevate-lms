'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import { Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Pathway slug to program name mapping
const PATHWAY_TO_PROGRAM: Record<string, string> = {
  'cna-certification': 'CNA (Certified Nursing Assistant)',
  'medical-assistant': 'Medical Assistant',
  'phlebotomy': 'Phlebotomy',
  'hvac-technician': 'HVAC Technician',
  'electrical-apprenticeship': 'Electrical',
  'plumbing-apprenticeship': 'Plumbing',
  'barber-apprenticeship': 'Barber Apprenticeship',
  'cosmetology': 'Cosmetology',
  'cdl-training': 'CDL (Commercial Driver License)',
  'it-support': 'IT Support',
  'cybersecurity': 'Cybersecurity',
  'web-development': 'Web Development',
  'accounting': 'Accounting',
  'business-management': 'Business Management',
};

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [selectedProgram, setSelectedProgram] = useState('');
  const [pathwaySlug, setPathwaySlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check for pathway param first (from /pathways pages)
    const pathway = searchParams.get('pathway');
    if (pathway && PATHWAY_TO_PROGRAM[pathway]) {
      setPathwaySlug(pathway);
      setSelectedProgram(PATHWAY_TO_PROGRAM[pathway]);
      return;
    }

    // Legacy: check for program param
    const programParam = searchParams.get('program');
    if (programParam) {
      // Barber apprenticeship has its own dedicated apply page
      if (programParam === 'barber-apprenticeship') {
        window.location.href = '/programs/barber-apprenticeship/apply';
        return;
      }
      
      const programMap: Record<string, string> = {
        'hvac-technician': 'HVAC Technician',
        'cna-certification': 'CNA (Certified Nursing Assistant)',
      };
      if (programMap[programParam]) {
        setSelectedProgram(programMap[programParam]);
        setPathwaySlug(programParam);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!consent) {
      setError('Please consent to be contacted before submitting.');
      return;
    }
    
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      program: formData.get('program') as string,
      funding: formData.get('funding') as string,
      pathway_slug: pathwaySlug || undefined,
      source: pathwaySlug ? 'pathway' : 'direct',
    };

    // Basic validation
    if (!data.name || data.name.length < 2) {
      setError('Please enter your full name.');
      setLoading(false);
      return;
    }
    
    if (!data.email || !data.email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    
    if (!data.phone || data.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      setLoading(false);
      return;
    }
    
    if (!data.program) {
      setError('Please select a program.');
      setLoading(false);
      return;
    }
    
    if (!data.funding) {
      setError('Please select a funding option.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/apply/success';
        }, 1500);
      } else {
        setError(result.error || 'Application failed. Please try again or call us.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('An error occurred. Please try again or call 317-314-3757.');
      setLoading(false);
    }
  };

  return (
    <>
      <ModernLandingHero
        badge="⚡ Limited Seats Available"
        headline="Start Your Career"
        accentText="In 10 Minutes"
        subheadline="Quick application. Fast response. Real results."
        description="Last year, 753 students were accepted and 89% got jobs after graduation. Average time from application to first paycheck: 67 days."
        imageSrc="/hero-images/apply-hero.jpg"
        imageAlt="Apply Now"
        primaryCTA={{ text: "Start Application", href: "#application" }}
        secondaryCTA={{ text: "Questions? Call Us", href: "tel:317-314-3757" }}
        features={[
          "10-minute application with 2-3 day response",
          "100% free training through WIOA and state grants",
          "Job placement support and career counseling included"
        ]}
        imageOnRight={true}
      />
      
      <section id="application" className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Start Your Application
        </h1>
        <p className="text-gray-600 mb-8">
          10–15 minutes. Response within 2–3 business days.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">{error}</p>
              <p className="text-red-700 text-sm mt-1">
                Need help? Call us at{' '}
                <a href="tel:317-314-3757" className="underline font-medium">
                  317-314-3757
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-semibold">
                Application submitted successfully!
              </p>
              <p className="text-green-700 text-sm mt-1">
                Redirecting to confirmation page...
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your.email@example.com"
              className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              required
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(317) 555-1234"
              className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          {/* Program */}
          <div>
            <label
              htmlFor="program"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Program <span className="text-red-600">*</span>
            </label>
            <select
              required
              id="program"
              name="program"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              <option value="">Select a program...</option>
              <optgroup label="Healthcare">
                <option value="CNA (Certified Nursing Assistant)">CNA (Certified Nursing Assistant)</option>
                <option value="Medical Assistant">Medical Assistant</option>
                <option value="Home Health Aide">Home Health Aide</option>
                <option value="Phlebotomy">Phlebotomy</option>
              </optgroup>
              <optgroup label="Skilled Trades">
                <option value="HVAC Technician">HVAC Technician</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Building Maintenance">Building Maintenance</option>
                <option value="Construction">Construction</option>
              </optgroup>
              <optgroup label="Barber & Beauty">
                <option value="Barber Apprenticeship">Barber Apprenticeship</option>
                <option value="Cosmetology">Cosmetology</option>
                <option value="Esthetics">Esthetics</option>
              </optgroup>
              <optgroup label="Technology">
                <option value="IT Support">IT Support</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Web Development">Web Development</option>
              </optgroup>
              <optgroup label="Business">
                <option value="Accounting">Accounting</option>
                <option value="Business Management">Business Management</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
              </optgroup>
              <optgroup label="Transportation">
                <option value="CDL (Commercial Driver License)">CDL (Commercial Driver License)</option>
              </optgroup>
              <option value="Not Sure - Help Me Choose">Not Sure - Help Me Choose</option>
            </select>
          </div>

          {/* Funding */}
          <div>
            <label
              htmlFor="funding"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              How do you plan to pay? <span className="text-red-600">*</span>
            </label>
            <select
              required
              id="funding"
              name="funding"
              className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              <option value="">Select funding option...</option>
              <option value="WIOA">WIOA / Next Level Jobs (Free if eligible)</option>
              <option value="Employer Sponsored">Employer Sponsored</option>
              <option value="Self Pay">Self Pay</option>
              <option value="Not Sure">Not Sure - Help Me Find Options</option>
            </select>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I consent to be contacted by Elevate for Humanity via phone, email, or text
              regarding my application and training opportunities.{' '}
              <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full min-h-[52px] bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Submitted!
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Having trouble with the application? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 317-314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
