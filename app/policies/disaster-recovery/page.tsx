import { Metadata } from 'next';
import Link from 'next/link';
import { Database, Clock, Shield, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery Plan | Elevate for Humanity',
  description: 'Backup strategies, recovery objectives, and business continuity procedures.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/policies/disaster-recovery',
  },
};

export default function DisasterRecoveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">Disaster Recovery Plan</h1>
            <p className="text-sm text-gray-600">Effective Date: January 24, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-black mb-8">
              This document outlines our disaster recovery strategy to ensure business continuity 
              and data protection in the event of a major incident.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Recovery Objectives</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-blue-900 m-0">RTO: 24 Hours</h3>
                </div>
                <p className="text-blue-800 m-0">
                  <strong>Recovery Time Objective:</strong> Maximum time to restore services 
                  after a major outage.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold text-green-900 m-0">RPO: 24 Hours</h3>
                </div>
                <p className="text-green-800 m-0">
                  <strong>Recovery Point Objective:</strong> Maximum acceptable data loss 
                  measured in time.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Backup Strategy</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Database className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">Database Backups</h3>
                  <ul className="text-gray-700 m-0 pl-4 list-disc">
                    <li>Provider-managed automatic daily backups</li>
                    <li>Point-in-time recovery capability</li>
                    <li>Encrypted at rest and in transit</li>
                    <li>Geographically redundant storage</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">File Storage</h3>
                  <ul className="text-gray-700 m-0 pl-4 list-disc">
                    <li>Provider-managed redundant storage</li>
                    <li>Multiple availability zones</li>
                    <li>Automatic replication</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <RefreshCw className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">Application Code</h3>
                  <ul className="text-gray-700 m-0 pl-4 list-disc">
                    <li>Version-controlled source code</li>
                    <li>Automated deployment pipelines</li>
                    <li>Rollback capability</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Recovery Procedures</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-black mb-4">In the event of a major outage:</h3>
              <ol className="list-decimal pl-6 text-black space-y-3 m-0">
                <li>
                  <strong>Assessment:</strong> Determine scope and impact of the incident
                </li>
                <li>
                  <strong>Communication:</strong> Update status page and notify stakeholders
                </li>
                <li>
                  <strong>Recovery:</strong> Restore services from most recent backup
                </li>
                <li>
                  <strong>Verification:</strong> Confirm data integrity and system functionality
                </li>
                <li>
                  <strong>Documentation:</strong> Record incident details and lessons learned
                </li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Infrastructure</h2>
            <p className="text-black mb-4">
              Our platform is built on enterprise-grade cloud infrastructure:
            </p>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li>Managed database with automatic failover</li>
              <li>Content delivery network (CDN) for global availability</li>
              <li>Load balancing across multiple servers</li>
              <li>Automated health checks and self-healing</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Testing & Review</h2>
            <p className="text-black mb-6">
              Recovery procedures are periodically reviewed and tested to ensure effectiveness. 
              This plan is updated as our infrastructure evolves.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-green-900 m-0">Latest DR Test: PASSED</h3>
              </div>
              <p className="text-green-800 mb-3">
                Our most recent disaster recovery drill was completed successfully on January 24, 2026.
                All RTO/RPO targets were met.
              </p>
              <Link 
                href="/policies/dr-test-report" 
                className="inline-flex items-center text-green-700 font-medium hover:text-green-800"
              >
                View Full Test Report →
              </Link>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-yellow-900 mb-2">Data Protection</h3>
              <p className="text-yellow-800 m-0">
                All backups are encrypted and access is restricted to authorized personnel only. 
                See our <Link href="/privacy-policy" className="text-yellow-700 underline">Privacy Policy</Link> for 
                information on how we protect your data.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Related Policies</h2>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li><Link href="/policies/sla" className="text-blue-600 hover:underline">Service Level Agreement</Link></li>
              <li><Link href="/policies/incident-response" className="text-blue-600 hover:underline">Incident Response Policy</Link></li>
              <li><Link href="/policies/data-retention" className="text-blue-600 hover:underline">Data Retention Policy</Link></li>
              <li><Link href="/governance/security" className="text-blue-600 hover:underline">Security Policy</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
