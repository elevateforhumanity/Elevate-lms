import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function SupersonicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
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
                <Link href="/supersonic-fast-cash" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/supersonic-fast-cash/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/supersonic-fast-cash/tax-information" className="text-gray-400 hover:text-white">
                  Tax Information
                </Link>
              </li>
              <li>
                <Link href="/supersonic-fast-cash/tax-tools" className="text-gray-400 hover:text-white">
                  Tax Tools
                </Link>
              </li>
              <li>
                <Link href="/supersonic-fast-cash/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+13173143757" className="text-gray-400 hover:text-white">
                    (317) 314-3757
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:Supersonicfadtcashllc@gmail.com" className="text-gray-400 hover:text-white">
                  Supersonicfadtcashllc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  Indianapolis, IN
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Supersonic Fast Cash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
