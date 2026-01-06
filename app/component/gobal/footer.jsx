import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import TrustBadges from './TrustBadges';

export default function Footer() {
  return (
    <footer className="bg-[#2d5a6b] text-white">
      {/* Main Footer Content */}
      <TrustBadges/>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div>
          <Image 
          src="/logo.png"
          alt="Logo" 
          width={150}  
          height={50}  
        />
            
            <h4 className="text-xl font-bold mb-4">Trusted by Millions</h4>
            <p className="text-gray-200 text-sm leading-relaxed">
              With 1200 MT/day production and 200000 MT of storage capacity, Ripuraj 
              Agro's mission is to produce nutritious and affordable rice that will also appeal 
              to the taste buds.
            </p>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Product</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Event</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">CashBack Info</a></li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Refund and Returns Policy</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <a href="tel:+919905555666" className="text-gray-200 hover:text-white transition-colors">
                    +91 9905555666
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:sales@ripurajagro.com" className="text-gray-200 hover:text-white transition-colors">
                    sales@ripurajagro.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Head Office</p>
                  <p className="text-gray-200 text-sm">
                    RIPURAJ AGRO PVT LTD NH-527D,<br />
                    Village Amodei Anchal, Ramgarhwa,<br />
                    District East Champaran Bihar – 845433
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-300 text-sm">
              Copyright © 2025 Ripuraj Agro Private Limited
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#2d5a6b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#2d5a6b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#2d5a6b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#2d5a6b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <div className="bg-white rounded px-2 py-1">
                <span className="text-blue-800 font-bold text-sm">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 -ml-2"></div>
                </div>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-blue-600 font-bold text-xs">AMERICAN<br/>EXPRESS</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-blue-800 font-bold text-sm">PayPal</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-orange-600 font-bold text-xs">DISCOVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}