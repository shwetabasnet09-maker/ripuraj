"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Factories = () => {
  return (
    <div className="bg-[white] py-16 px-4 relative overflow-hidden">
      
      {/* RIGHT SIDE ICON ONLY */}
      <div className="absolute bottom-0 right-0 opacity-70 pointer-events-none hidden lg:block">
        <Image
          src="/framer.svg"
          alt="decor"
          width={180}
          height={180}
          className="w-40 h-40"
        />
      </div>

      <div className="wrapper relative z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 rounded-3xl">
          
          {/* LEFT IMAGE */}
          <div className="relative h-[300px] lg:h-auto overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
            <Image
              src="/Farm.png"
              alt="Factory"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-[#FFF8E2] p-8 lg:p-12 flex flex-col justify-center rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            
            <h2 className="text-[35px] font-bold text-black leading-tight">
            Where Every Grain Meets{" "}
              <span className="text-[#306177]">Our Highest Standards</span>
            </h2>

            <p className="mt-1 leading-relaxed text-[15px] text-[#444]">
            Behind every pack of Ripuraj is a state-of-the-art processing facility where technology, expertise, and uncompromising quality come together. Every grain is carefully cleaned, processed, and quality-checked to ensure consistency, purity, and the taste families trust.

            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-3">
              {[
                "Advanced Technology",
                "Multiple Quality Checks",
                "Hygienic Manufacturing",
                "Consistent Grain Selection",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#306177]" />
                  <span className="text-[#070707] font-medium text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-5">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-[#306177] px-6 py-3 rounded-full font-semibold shadow hover:shadow-md transition"
              >
                SHOP NOW →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factories;