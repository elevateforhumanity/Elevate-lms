'use client';

import { useState } from 'react';
import { Shield, Download, FileText, CheckCircle } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

export default function SubOfficeAgreementPage() {
  const [formData, setFormData] = useState({
    subOfficeName: '',
    subOfficeAddress: '',
    subOfficeCity: '',
    subOfficeState: '',
    subOfficeZip: '',
    representativeName: '',
    representativeTitle: '',
    representativeEmail: '',
    representativePhone: '',
    effectiveDate: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [signed, setSigned] = useState(false);
  const subOfficeSignatureRef = useRef<any>(null);
  const mainOfficeSignatureRef = useRef<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert('Please agree to the terms before signing');
      return;
    }

    if (subOfficeSignatureRef.current?.isEmpty()) {
      alert('Please provide your signature');
      return;
    }

    // Get signature data
    const subOfficeSignature = subOfficeSignatureRef.current?.toDataURL();

    // Prepare agreement data
    const agreementData = {
      ...formData,
      subOfficeSignature,
      signedAt: new Date().toISOString(),
      ipAddress: 'captured-on-server',
    };

    // Save to database
    try {
      const response = await fetch(
        '/api/supersonic-fast-cash/sub-office-agreements',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(agreementData),
        }
      );

      if (response.ok) {
        setSigned(true);
        alert(
          'Agreement signed successfully! You will receive a copy via email.'
        );
      } else {
        alert('Error signing agreement. Please try again.');
      }
    } catch (error) {
      alert('Error signing agreement. Please try again.');
    }
  };

  const clearSignature = () => {
    subOfficeSignatureRef.current?.clear();
  };

  if (signed) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Agreement Signed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Your Sub-Office Agreement has been digitally signed and recorded.
              You will receive a copy via email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download PDF
              </button>
              <a
                href="/supersonic-fast-cash"
                className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-blue-900 text-white rounded-t-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-black uppercase">
                Sub-Office Agreement
              </h1>
              <p className="text-blue-200">
                Supersonic Fast Cash Tax Preparation
              </p>
            </div>
          </div>
        </div>

        {/* Agreement Content */}
        <div className="bg-white shadow-xl p-8">
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sub-Office Tax Preparation Memorandum of Understanding
            </h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="font-semibold">
                Important: Read Carefully Before Signing
              </p>
              <p className="text-sm">
                This is a legally binding agreement. By signing digitally, you
                agree to all terms.
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-3">1. Relationship</h3>
            <p>
              This Memorandum of Understanding ("MOU") defines the working
              relationship between
              <strong> Supersonic Fast Cash</strong> ("Main Office") and
              approved Sub-Office operators ("Sub-Office"). This arrangement
              does not create a partnership, joint venture, or ownership
              interest.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">2. Scope of Work</h3>
            <p>
              <strong>Sub-Office Responsibilities:</strong>
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Client intake and document collection</li>
              <li>Accurate data entry and preliminary preparation</li>
              <li>Adherence to Main Office procedures and timelines</li>
            </ul>

            <p>
              <strong>Main Office Responsibilities:</strong>
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Software licensing and systems (Drake)</li>
              <li>Pricing structure and fee determination</li>
              <li>Final review and filing authority</li>
              <li>Compliance oversight, corrections, notices, and audits</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">3. Compensation</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>
                Sub-Office receives{' '}
                <strong>45% of the base preparation fee</strong> per accepted
                return
              </li>
              <li>
                Main Office retains{' '}
                <strong>55% of the base preparation fee</strong>
              </li>
              <li>
                Compensation applies only to returns accepted by taxing
                authorities
              </li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6">
              <p className="font-bold">Important:</p>
              <p>
                All add-on fees, including additional forms, Schedule C,
                multiple W-2s, dependents, complexity charges, and processing
                fees are retained <strong>100% by the Main Office</strong>.
              </p>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-3">4. Exclusions</h3>
            <p>No compensation is paid on:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Rejected or withdrawn returns</li>
              <li>Penalties or interest</li>
              <li>Audit or notice response work</li>
              <li>Refund advances or third-party incentives</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">
              5. Quality & Compliance
            </h3>
            <p>
              Sub-Offices are expected to maintain high accuracy and compliance
              standards. Excessive errors or violations may result in removal
              from bonus eligibility or termination.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-3">6. Termination</h3>
            <p>
              Either party may terminate this agreement with written notice.
              Accepted returns completed prior to termination will be
              compensated according to this MOU.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t-2 border-gray-200 pt-8"
          >
            <h3 className="text-2xl font-bold mb-6">Sub-Office Information</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-bold mb-2">
                  Sub-Office Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subOfficeName}
                  onChange={(e) =>
                    setFormData({ ...formData, subOfficeName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Effective Date *</label>
                <input
                  type="date"
                  required
                  value={formData.effectiveDate}
                  onChange={(e) =>
                    setFormData({ ...formData, effectiveDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold mb-2">Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.subOfficeAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subOfficeAddress: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.subOfficeCity}
                  onChange={(e) =>
                    setFormData({ ...formData, subOfficeCity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={formData.subOfficeState}
                  onChange={(e) =>
                    setFormData({ ...formData, subOfficeState: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={formData.subOfficeZip}
                  onChange={(e) =>
                    setFormData({ ...formData, subOfficeZip: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-8">
              Representative Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.representativeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      representativeName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.representativeTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      representativeTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.representativeEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      representativeEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.representativePhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      representativePhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Digital Signature */}
            <div className="border-t-2 border-gray-200 pt-8 mt-8">
              <h3 className="text-2xl font-bold mb-6">Digital Signature</h3>

              <div className="mb-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    I have read and agree to all terms and conditions outlined
                    in this Sub-Office Agreement. I understand this is a legally
                    binding digital signature.
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block font-bold mb-2">Sign Below *</label>
                <div className="border-2 border-gray-300 rounded-lg bg-white">
                  <SignatureCanvas
                    ref={subOfficeSignatureRef}
                    canvasProps={{
                      className: 'w-full h-40',
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Clear Signature
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Digital Signature Acknowledgment:</strong> By signing
                  above, you acknowledge that:
                </p>
                <ul className="text-sm text-gray-600 list-disc ml-6 mt-2">
                  <li>
                    This digital signature has the same legal effect as a
                    handwritten signature
                  </li>
                  <li>Your IP address and timestamp will be recorded</li>
                  <li>
                    You will receive a copy of this signed agreement via email
                  </li>
                  <li>This agreement is legally binding and enforceable</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={!agreed}
                className="w-full py-4 bg-blue-900 text-white font-black text-lg rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed uppercase"
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Sign Agreement Digitally
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 rounded-b-lg p-6 text-center text-sm text-gray-600">
          <p>
            Supersonic Fast Cash | Licensed Enrolled Agent | IRS-Authorized Tax
            Professional
          </p>
          <p className="mt-2">
            Questions? Call (317) 314-3757 or email Supersonicfadtcashllc@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
