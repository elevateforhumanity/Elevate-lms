import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/privacy-policy',
  },
  title: 'Privacy Policy | Elevate For Humanity',
  description:
    'Privacy Policy for Elevate for Humanity. Learn how we collect, use, and protect your personal information.',
};

export default async function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Privacy Policy"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm text-gray-200">Last Updated: January 1, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-4 sm:p-6 md:p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>

                <p className="text-black mb-8">
                  <strong>Effective Date:</strong> January 1, 2026
                  <br />
                  <strong>Last Updated:</strong> January 1, 2026
                </p>

                <p className="mb-6">
                  Elevate for Humanity ("we," "us," or "our") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website www.elevateforhumanity.org and use our
                  services.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  1. Information We Collect
                </h3>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Personal Information
                </h4>
                <p className="mb-4">
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Register for an account</li>
                  <li>Apply for training programs</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="mb-6">This information may include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Mailing address</li>
                  <li>Date of birth</li>
                  <li>Employment history and education background</li>
                  <li>
                    Social Security Number (for WIOA eligibility verification)
                  </li>
                  <li>
                    Payment information (processed securely through third-party
                    providers)
                  </li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Automatically Collected Information
                </h4>
                <p className="mb-4">
                  When you visit our website, we automatically collect certain
                  information about your device, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Device identifiers</li>
                </ul>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  2. How We Use Your Information
                </h3>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Process your applications and enrollments</li>
                  <li>Provide training and educational services</li>
                  <li>
                    Communicate with you about programs, events, and updates
                  </li>
                  <li>Verify WIOA eligibility and process funding</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  3. Information Sharing and Disclosure
                </h3>
                <p className="mb-4">We may share your information with:</p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Service Providers
                </h4>
                <p className="mb-6">
                  Third-party vendors who perform services on our behalf,
                  including payment processing, data analysis, email delivery,
                  hosting services, and customer service.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Government Agencies
                </h4>
                <p className="mb-6">
                  WIOA administrators, WorkOne Indiana, and other government
                  entities as required for program eligibility verification and
                  compliance.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Employer Partners
                </h4>
                <p className="mb-6">
                  With your consent, we may share your information with employer
                  partners for job placement and apprenticeship opportunities.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Legal Requirements
                </h4>
                <p className="mb-6">
                  When required by law, court order, or government regulation,
                  or to protect our rights, property, or safety.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  4. Cookies and Tracking Technologies
                </h3>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve website performance</li>
                  <li>Deliver targeted advertising</li>
                </ul>
                <p className="mb-6">
                  You can control cookies through your browser settings.
                  However, disabling cookies may limit your ability to use
                  certain features of our website.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Third-Party Analytics
                </h4>
                <p className="mb-6">
                  We use Google Analytics and Facebook Pixel to analyze website
                  traffic and user behavior. These services may collect
                  information about your online activities over time and across
                  different websites.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  5. Data Security
                </h3>
                <p className="mb-6">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  6. Your Rights and Choices
                </h3>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal
                    information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information (subject to legal obligations)
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> Unsubscribe from marketing
                    communications at any time
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request a copy of your
                    data in a machine-readable format
                  </li>
                </ul>
                <p className="mb-6">
                  To exercise these rights, contact us at
                  elevate4humanityedu@gmail.com
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  7. FERPA Compliance (Student Education Records)
                </h3>
                <p className="mb-4">
                  Elevate for Humanity complies with the Family Educational Rights and Privacy Act (FERPA), 
                  20 U.S.C. § 1232g, which protects the privacy of student education records.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Student Rights Under FERPA
                </h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    <strong>Right to Inspect:</strong> Students have the right to inspect and review their 
                    education records within 45 days of request
                  </li>
                  <li>
                    <strong>Right to Request Amendment:</strong> Students may request correction of records 
                    believed to be inaccurate or misleading
                  </li>
                  <li>
                    <strong>Right to Consent:</strong> Students must provide written consent before we disclose 
                    personally identifiable information from education records, except as permitted by FERPA
                  </li>
                  <li>
                    <strong>Right to File Complaint:</strong> Students may file complaints with the U.S. Department 
                    of Education concerning alleged failures to comply with FERPA
                  </li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Education Records We Maintain
                </h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Enrollment and registration information</li>
                  <li>Academic transcripts and grades</li>
                  <li>Attendance records</li>
                  <li>Course completion certificates</li>
                  <li>Financial aid and funding documentation</li>
                  <li>Disciplinary records</li>
                  <li>Accommodation and support service records</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Disclosure Without Consent
                </h4>
                <p className="mb-4">
                  We may disclose education records without student consent to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>School officials with legitimate educational interest</li>
                  <li>Other schools to which a student is transferring</li>
                  <li>Authorized representatives for audit or evaluation purposes</li>
                  <li>Financial aid organizations</li>
                  <li>Organizations conducting studies for or on behalf of the school</li>
                  <li>Accrediting organizations</li>
                  <li>Comply with judicial orders or lawfully issued subpoenas</li>
                  <li>Appropriate officials in health or safety emergencies</li>
                  <li>State and local authorities within the juvenile justice system</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Directory Information
                </h4>
                <p className="mb-4">
                  We may disclose the following "directory information" without consent unless you opt out:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Student name</li>
                  <li>Program of study</li>
                  <li>Dates of attendance</li>
                  <li>Degrees, certificates, and awards received</li>
                  <li>Participation in officially recognized activities</li>
                </ul>
                <p className="mb-6">
                  To opt out of directory information disclosure, submit a written request to: 
                  elevate4humanityedu@gmail.com
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Data Retention
                </h4>
                <p className="mb-6">
                  Student education records are retained for a minimum of 5 years after program completion 
                  or last date of attendance, in compliance with federal and state requirements. Transcripts 
                  are maintained permanently.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  Annual Notification
                </h4>
                <p className="mb-6">
                  We provide annual notification to students of their FERPA rights through email, student 
                  portal announcements, and this privacy policy. Students are notified of their right to 
                  inspect records, request amendments, consent to disclosures, and file complaints.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">
                  FERPA Complaints
                </h4>
                <p className="mb-6">
                  File complaints concerning alleged FERPA violations with:<br />
                  Family Policy Compliance Office<br />
                  U.S. Department of Education<br />
                  400 Maryland Avenue, SW<br />
                  Washington, DC 20202-8520
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  8. Children's Privacy (COPPA)
                </h3>
                <p className="mb-6">
                  Our services are not directed to individuals under 16 years of
                  age. We do not knowingly collect personal information from
                  children under 16. If you believe we have collected
                  information from a child under 16, please contact us
                  immediately. For students under 18, we obtain parental consent 
                  as required by applicable law.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  9. California Privacy Rights
                </h3>
                <p className="mb-6">
                  California residents have additional rights under the
                  California Consumer Privacy Act (CCPA), including the right to
                  know what personal information is collected, the right to
                  delete personal information, and the right to opt-out of the
                  sale of personal information. We do not sell personal
                  information.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">
                  9. Changes to This Privacy Policy
                </h3>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>

                <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4">10. Contact Us</h3>
                <p className="mb-4">
                  If you have questions or concerns about this Privacy Policy,
                  please contact us:
                </p>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
                  <p className="mb-2">
                    <strong>Elevate for Humanity</strong>
                  </p>
                  <p className="mb-2">Indianapolis, IN</p>
                  <p className="mb-2">Email: elevate4humanityedu@gmail.com</p>
                  <p className="mb-2">Phone: (317) 314-3757</p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-black">
                    By using our website and services, you acknowledge that you
                    have read and understood this Privacy Policy and agree to
                    its terms.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Questions About Your Privacy?
              </h3>
              <p className="text-black mb-6">
                We're here to help. Contact us anytime with privacy-related
                questions or concerns.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-4 sm:px-6 md:px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
