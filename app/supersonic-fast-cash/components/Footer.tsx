import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Scale, FileText } from 'lucide-react';

export function SupersonicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Professional tax preparation and financial services. Licensed Enrolled Agent with full IRS representation rights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">YouTube</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tax-preparation" className="text-gray-400 hover:text-white">
                  Tax Preparation
                </Link>
              </li>
              <li>
                <Link href="/refund-advance" className="text-gray-400 hover:text-white">
                  Refund Advance
                </Link>
              </li>
              <li>
                <Link href="/tax-faq" className="text-gray-400 hover:text-white">
                  Tax FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h3 className="text-xl font-bold mb-4">Governance</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/governance" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Governance Hub
                </Link>
              </li>
              <li>
                <Link href="/governance/security" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security & Data Protection
                </Link>
              </li>
              <li>
                <Link href="/governance/compliance" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Compliance & Disclosures
                </Link>
              </li>
              <li>
                <Link href="/governance/authoritative-docs" className="text-gray-400 hover:text-white">
                  Authoritative Documents
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+13173143757" className="text-gray-400 hover:text-white">
                    (317) 314-3757
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:supersonicfastcashllc@gmail.com" className="text-gray-400 hover:text-white">
                  supersonicfastcashllc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  Indianapolis, IN
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Supersonic Fast Cash LLC. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Governed by{' '}
              <a 
                href="https://www.elevateforhumanity.org/governance" 
                className="text-emerald-400 hover:text-emerald-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elevate for Humanity
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
