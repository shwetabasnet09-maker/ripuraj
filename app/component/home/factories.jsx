"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Factories = () => {
  return (
    <div className="bg-white py-16 px-4 relative overflow-hidden">
      
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
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-[#F5E6D3] p-8 lg:p-12 flex flex-col justify-center rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            
            <h2 className="text-[35px] font-bold text-black leading-tight">
              From Farm to{" "}
              <span className="text-[#306177]">Factories</span>
            </h2>

            <p className="mt-4 leading-relaxed text-[15px] text-[#444]">
              Transporting grains from the fields to the factories is an
              essential part of our process. Ensuring that the grains remain
              safe and maintain their quality during transport is our top
              priority. Each grain is securely packed in woven bags and covered
              with protective tarps, safeguarding them from weather conditions
              and potential damage.
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-6">
              {[
                "Premium Grain",
                "Streamlined Production",
                "Expert Field",
                "Top-Quality Produce",
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
            <div className="mt-8">
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