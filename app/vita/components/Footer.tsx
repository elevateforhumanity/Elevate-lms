import Link from 'next/link';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export function VITAFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-green-600">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-green-600" />
              <span className="text-white font-bold text-lg">VITA Tax Prep</span>
            </div>
            <p className="text-sm text-gray-600">
              Free IRS-certified tax preparation for qualifying individuals
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vita/locations" className="hover:text-white transition">Find a Location</Link></li>
              <li><Link href="/vita/schedule" className="hover:text-white transition">Schedule Appointment</Link></li>
              <li><Link href="/vita/eligibility" className="hover:text-white transition">Check Eligibility</Link></li>
              <li><Link href="/vita/what-to-bring" className="hover:text-white transition">What to Bring</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vita/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/vita/volunteer" className="hover:text-white transition">Volunteer</Link></li>
              <li><Link href="/vita/about" className="hover:text-white transition">About VITA</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(317) 555-0200</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>vita@elevateforhumanity.org</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Indianapolis, IN</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-white transition">Accessibility</Link>
            </div>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Elevate For Humanity. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
