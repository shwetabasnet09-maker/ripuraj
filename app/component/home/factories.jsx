"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const Factories = () => {
  return (
    <div className="bg-[#F5E6D3] py-20 px-4 sm:px-6 lg:px-8">
      <div className="wrapper">
        {/* 30% Image | 70% Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-10 items-center">

          {/* Image div */}
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/Mahashakti.jpg"
              alt="Aerial view of grain processing factory"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content div */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-[35px] font-bold text-[#306177]">
              From Farm to Factories
            </h1>

            <p className="text-base lg:text-[17px] leading-relaxed text-[#4B4B4B]">
              Transporting grains from the fields to the factories is an essential part
              of our process. Ensuring that the grains remain safe and maintain their
              quality during transport is our top priority. Each grain is securely
              packed in woven bags and covered with protective tarps, safeguarding them
              from weather conditions and potential damage.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Premium Grain Choice",
                "Streamlined Production Methods",
                "Expert Field Guidance",
                "Top-Quality Produce Selection",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#306177] mt-1" />
                  <span className="text-[#306177] font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="pt-4">
              <button className="bg-[#306177] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#234A5F] transition-all duration-300 shadow-lg">
                ABOUT US
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Factories;
