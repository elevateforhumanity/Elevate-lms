import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  AlertTriangle,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/security',
  },
  title: 'Security & Data Protection | Elevate For Humanity',
  description:
    'Your information is protected. Your trust matters. Learn about our security measures and data protection practices.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-brand-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Security & Data Protection
          </h1>
        </div>

        <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 mb-8">
          <p className="text-xl font-semibold text-gray-900">
            Your information is protected. Your trust matters.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Elevate for Humanity takes data security and privacy seriously. Our
            platform is designed to protect personal, educational, and
            workforce-related information using industry-standard safeguards and
            access controls.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            We collect only the information necessary to support program
            coordination, advising, reporting, and compliance.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Security Measures Include
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Role-based access control (RBAC)
                </h3>
                <p className="text-gray-600">
                  Users only see data they're authorized to access
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Secure authentication and authorization
                </h3>
                <p className="text-gray-600">
                  Multi-factor authentication and session management
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Encrypted data in transit and at rest
                </h3>
                <p className="text-gray-600">
                  TLS 1.3 for transmission, database encryption for storage
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Limited data access based on user role and organization
                </h3>
                <p className="text-gray-600">
                  Multi-tenant isolation prevents cross-organization access
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Audit logs for system activity
                </h3>
                <p className="text-gray-600">
                  All actions tracked with user attribution and timestamps
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Secure document handling and storage
                </h3>
                <p className="text-gray-600">
                  Encrypted uploads with access controls
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Regular system monitoring
                </h3>
                <p className="text-gray-600">
                  Continuous monitoring for security threats and anomalies
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What We Do Not Do
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                We do not sell personal data
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                We do not allow unrestricted access to sensitive records
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                We do not expose internal dashboards publicly
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-brand-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reporting a Security Concern
              </h3>
              <p className="text-gray-700 mb-3">
                If you believe there is a security issue or vulnerability,
                please contact:
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-orange-600" />
                <a
                  href="mailto:security@elevateforhumanity.institute"
                  className="text-brand-orange-600 hover:underline font-semibold"
                >
                  security@elevateforhumanity.institute
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authorization & Access Control
          </h2>

          <p className="text-gray-700 mb-4">
            Elevate for Humanity operates as a multi-tenant workforce platform
            with strict authorization boundaries.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Access Is Based On:
          </h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">User role</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Organizational affiliation</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Program association</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Jurisdictional permissions</span>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Authorization Principles:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                Users only see what they are authorized to see
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                No cross-organization data visibility
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                No role escalation without approval
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                Administrative actions are logged
              </span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/privacy"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200 hover:border-blue-500"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Privacy Policy
            </h3>
            <p className="text-sm text-gray-600">
              Learn how we handle your personal information
            </p>
          </Link>

          <Link
            href="/terms"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-gray-200 hover:border-blue-500"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Terms of Service
            </h3>
            <p className="text-sm text-gray-600">
              Review our terms and conditions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
