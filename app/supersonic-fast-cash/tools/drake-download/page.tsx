'use client';

import { useState } from 'react';
import {
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Key,
} from 'lucide-react';
import Link from 'next/link';

export default function DrakeDownloadPage() {
  const [showCredentials, setShowCredentials] = useState(false);

  // Your actual Drake credentials from .env.local
  const drakeCredentials = {
    accountNumber: '211607',
    serialNumber: 'B7ED-0119-0036-E407',
    efilePassword: 'Lizzy6262*',
  };

  const drakeProducts = [
    {
      name: 'Drake Tax',
      version: '2024',
      description: 'Professional tax preparation software',
      size: '2.5 GB',
      downloadUrl:
        'https://www.drakesoftware.com/downloads/tax/2024/DrakeSetup.exe',
      requirements: 'Windows 10/11, 8GB RAM, 10GB disk space',
      features: [
        'All IRS forms and schedules',
        'E-file federal and state returns',
        'Automatic calculations',
        'Error checking and diagnostics',
        'Client portal integration',
        'Bank products integration',
      ],
    },
    {
      name: 'Drake Cloud',
      version: '2024',
      description: 'Cloud-based document management',
      size: 'Web-based',
      downloadUrl: 'https://cloud.drakesoftware.com',
      requirements: 'Any modern web browser',
      features: [
        'Secure document storage',
        'Client file sharing',
        'E-signature collection',
        'Mobile access',
        'Automatic backups',
      ],
    },
    {
      name: 'Drake Gruntworks',
      version: '2024',
      description: 'Document scanning and OCR',
      size: '150 MB',
      downloadUrl:
        'https://www.drakesoftware.com/downloads/gruntworks/GruntworksSetup.exe',
      requirements: 'Windows 10/11, Scanner compatible',
      features: [
        'W-2 scanning and OCR',
        '1099 form recognition',
        'Receipt scanning',
        'Automatic data extraction',
        'Integration with Drake Tax',
      ],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Download className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Drake Software Downloads
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Drake Tax Software
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download professional tax preparation software. Your account is
            already configured.
          </p>
        </div>

        {/* Credentials Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Drake Account</h2>
              <p className="text-green-100">
                Your credentials are pre-configured and ready to use
              </p>
            </div>
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition"
            >
              {showCredentials ? 'Hide' : 'Show'} Credentials
            </button>
          </div>

          {showCredentials && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  Account Number
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white/20 px-4 py-3 rounded-lg font-mono">
                    {drakeCredentials.accountNumber}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(drakeCredentials.accountNumber)
                    }
                    className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  Serial Number
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white/20 px-4 py-3 rounded-lg font-mono">
                    {drakeCredentials.serialNumber}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(drakeCredentials.serialNumber)
                    }
                    className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-100 mb-2">
                  E-File Password
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white/20 px-4 py-3 rounded-lg font-mono">
                    {drakeCredentials.efilePassword}
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(drakeCredentials.efilePassword)
                    }
                    className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mt-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <p className="text-sm text-yellow-100">
                    Keep these credentials secure. Do not share with
                    unauthorized users.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Download Products */}
        <div className="space-y-6 mb-12">
          {drakeProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:border-green-500 transition"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Version: {product.version}</span>
                    <span>•</span>
                    <span>Size: {product.size}</span>
                  </div>
                </div>
                <a
                  href={product.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">System Requirements:</h4>
                  <p className="text-sm text-gray-600">
                    {product.requirements}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Installation Instructions</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Download Drake Tax</h3>
                <p className="text-sm text-gray-600">
                  Click the download button above to get the latest version of
                  Drake Tax software.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Run the Installer</h3>
                <p className="text-sm text-gray-600">
                  Double-click DrakeSetup.exe and follow the installation
                  wizard.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enter Your Credentials</h3>
                <p className="text-sm text-gray-600">
                  When prompted, enter your Account Number and Serial Number
                  from above.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Configure E-File</h3>
                <p className="text-sm text-gray-600">
                  Go to Setup → E-File Setup and enter your E-File Password.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">Start Preparing Returns</h3>
                <p className="text-sm text-gray-600">
                  You're ready to prepare and e-file tax returns!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Resources */}
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="https://www.drakesoftware.com/support"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">
              User guides, tutorials, and help articles
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-1">
              View Docs <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <a
            href="https://www.drakesoftware.com/training"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <Key className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Training Videos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn how to use Drake Tax effectively
            </p>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              Watch Videos <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <Link
            href="/supersonic-fast-cash/training"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <CheckCircle className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Our Training</h3>
            <p className="text-sm text-gray-600 mb-4">
              SupersonicFastCash tax preparation courses
            </p>
            <span className="text-purple-600 font-semibold flex items-center gap-1">
              Start Learning →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
