'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Consent {
  id: string;
  consent_type: string;
  granted: boolean;
  granted_at: string | null;
  withdrawn_at: string | null;
  third_party_name: string | null;
}

export default function StudentPrivacyPage() {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    try {
      const response = await fetch('/api/consent');
      const data = await response.json();
      setConsents(data.consents || []);
    } catch { /* Error handled silently */ } finally {
      setLoading(false);
    }
  };

  const updateConsent = async (consentType: string, granted: boolean, thirdPartyName?: string) => {
    setUpdating(consentType);
    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentType, granted, thirdPartyName }),
      });

      if (response.ok) {
        await fetchConsents();
      }
    } catch { /* Error handled silently */ } finally {
      setUpdating(null);
    }
  };

  const getConsentStatus = (type: string) => {
    const consent = consents.find(c => c.consent_type === type && !c.withdrawn_at);
    return consent?.granted || false;
  };

  const consentTypes = [
    {
      type: 'ferpa_directory',
      title: 'FERPA Directory Information',
      description: 'Allow disclosure of directory information (name, program, dates, awards)',
      required: false,
    },
    {
      type: 'marketing_communications',
      title: 'Marketing Communications',
      description: 'Receive promotional emails and newsletters about programs and services',
      required: false,
    },
    {
      type: 'cookies_analytics',
      title: 'Cookies & Analytics',
      description: 'Allow cookies for analytics and site improvement',
      required: false,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-black">Loading privacy settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-black">Privacy & Consent Settings</h1>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
            <p className="text-sm text-black">
              Manage your privacy preferences and data sharing consents. You can update these settings at any time.
            </p>
          </div>

          <div className="space-y-6">
            {consentTypes.map((item) => {
              const isGranted = getConsentStatus(item.type);
              const isUpdating = updating === item.type;

              return (
                <div key={item.type} className="border rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                        {item.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                        )}
                      </div>
                      <p className="text-black mb-4">{item.description}</p>
                      
                      <div className="flex items-center gap-2">
                        {isGranted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-black" />
                        )}
                        <span className="text-sm font-medium text-black">
                          {isGranted ? 'Granted' : 'Not granted'}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() => updateConsent(item.type, !isGranted)}
                        disabled={isUpdating || item.required}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                          isGranted
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''} ${
                          item.required ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isUpdating ? 'Updating...' : isGranted ? 'Revoke' : 'Grant'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-black mb-1">Your Rights Under FERPA</h4>
                <p className="text-sm text-black mb-2">
                  You have the right to inspect your education records, request amendments, and control disclosure 
                  of your information. For more information, see our{' '}
                  <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">
                    Privacy Policy
                  </a>.
                </p>
                <p className="text-sm text-black">
                  To request access to your records or file a complaint, contact:{' '}
                  <a href="mailto:ferpa@elevateforhumanity.institute" className="text-blue-600 hover:underline">
                    ferpa@elevateforhumanity.institute
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-black mb-4">Data Deletion Request</h3>
            <p className="text-black mb-4">
              You have the right to request deletion of your personal data, subject to legal retention requirements.
            </p>
            <a
              href="mailto:privacy@elevateforhumanity.institute?subject=Data%20Deletion%20Request"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Request Data Deletion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
