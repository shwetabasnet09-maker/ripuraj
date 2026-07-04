"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function ProductHighlight() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <div className="bg-[#efefef] rounded-[40px] flex items-center justify-center p-16 relative">
          <Image
            src="/rice.png"
            alt="Ripuraj Sonashakti Rice"
            width={360}
            height={520}
            className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.25)]"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-[38px] lg:text-[46px] font-bold text-[#3a6372] leading-tight max-w-xl">
            Ripuraj Sonashakti Premium Jeera Parboiled Rice
          </h2>

          <p className="text-gray-600 mt-6 text-lg max-w-xl leading-relaxed">
            Enjoy the unique aroma and rich flavor of Sonashakti Jeera Rice.
            Each grain is selected for its quality, making it ideal for flavorful
            meals. Perfect for traditional dishes or daily dining.
          </p>

          <h3 className="mt-10 text-xl font-bold text-[#3a6372]">
            Packaging Size Available Online
          </h3>

          {/* FEATURES */}
          <div className="mt-6 space-y-6">

            <div className="flex items-start gap-4">
              <Check
                className="text-[#3a6372] mt-1 flex-shrink-0"
                size={26}
                strokeWidth={3}
              />
              <div>
                <h4 className="text-lg font-bold text-[#3a6372]">
                  100% Guaranteed Organic Product
                </h4>
                <p className="text-gray-500">
                  Use of Organic paddy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Check
                className="text-[#3a6372] mt-1 flex-shrink-0"
                size={26}
                strokeWidth={3}
              />
              <div>
                <h4 className="text-lg font-bold text-[#3a6372]">
                  Zero hand touch production
                </h4>
                <p className="text-gray-500">
                  We Use pure gang-tic basin water in production
                </p>
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <button className="mt-10 bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold text-lg transition">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}