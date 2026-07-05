import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import TrustBadges from "./TrustBadges";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Full-bleed background image behind trust badges + footer */}
      <div className="absolute inset-0">
        <Image src="/footer Bg.webp" alt="" fill className="object-cover object-bottom" />
      </div>

      <div className="relative z-10">
        <TrustBadges />

        {/* Floating white card */}
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="bg-white rounded-3xl shadow-xl px-8 py-10 md:px-12 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Company Info */}
              <div>
                <Image src="/logo.png" alt="Logo" width={150} height={50} />

                <p className="text-gray-700 text-sm leading-relaxed mt-5">
                  With 1200 MT/day production and 200000 MT of storage
                  capacity, Ripuraj Agro's mission is to produce nutritious
                  and affordable rice that will also appeal to the taste
                  buds.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <a
                    href="https://www.facebook.com/RipurajRice/"
                    className="w-9 h-9 bg-[#2d5a6b] rounded-full flex items-center justify-center hover:bg-[#1f4150] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/ripurajagro/"
                    className="w-9 h-9 bg-[#2d5a6b] rounded-full flex items-center justify-center hover:bg-[#1f4150] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/ripuraj-agro-pvt-ltd/?originalSubdomain=in"
                    className="w-9 h-9 bg-[#2d5a6b] rounded-full flex items-center justify-center hover:bg-[#1f4150] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.youtube.com/@RipurajAgro"
                    className="w-9 h-9 bg-[#2d5a6b] rounded-full flex items-center justify-center hover:bg-[#1f4150] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a2.99 2.99 0 0 0-2.103-2.113C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.395.573a2.99 2.99 0 0 0-2.103 2.113A31.52 31.52 0 0 0 0 12a31.52 31.52 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.103 2.113C4.46 20.5 12 20.5 12 20.5s7.54 0 9.395-.573a2.99 2.99 0 0 0 2.103-2.113A31.52 31.52 0 0 0 24 12a31.52 31.52 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Information Links */}
              <div>
                <h4 className="text-lg font-bold text-[#2d5a6b] mb-5">
                  Information
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about-us" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/shop" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="/product" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Product
                    </a>
                  </li>
                  <li>
                    <a href="/event" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Event
                    </a>
                  </li>
                  <li>
                    <a href="/winner-list" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      CashBack Info
                    </a>
                  </li>
                </ul>
              </div>

              {/* Customer Service Links */}
              <div>
                <h4 className="text-lg font-bold text-[#2d5a6b] mb-5">
                  Customer Service
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Refund and Returns Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-[#2d5a6b] transition-colors">
                      Shipping Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-bold text-[#2d5a6b] mb-5">
                  Contact Us
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-[#2d5a6b]" />
                    <div>
                      <p className="font-semibold text-[#2d5a6b] mb-1">Phone</p>
                      <a
                        href="tel:+919905555666"
                        className="text-gray-700 hover:text-[#2d5a6b] transition-colors"
                      >
                        +91 9905555666
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-[#2d5a6b]" />
                    <div>
                      <p className="font-semibold text-[#2d5a6b] mb-1">Email</p>
                      <a
                        href="mailto:sales@ripurajagro.com"
                        className="text-gray-700 hover:text-[#2d5a6b] transition-colors"
                      >
                        sales@ripurajagro.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#2d5a6b]" />
                    <div>
                      <p className="font-semibold text-[#2d5a6b] mb-1">Head Office</p>
                      <p className="text-gray-700">
                        RIPURAJ AGRO PVT LTD NH-527D,
                        <br />
                        Village Amodei Anchal, Ramgarhwa,
                        <br />
                        District East Champaran Bihar – 845433
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar (inside the card) */}
            <div className="border-t border-gray-200 mt-10 pt-6 text-center">
              <p className="text-gray-600 text-sm">
                Copyright © 2025 Ripuraj Agro Private Limited
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
