

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/homepage/about-section/`)
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);

  if (!about) {
    return (
      <section className="py-12 md:py-20 bg-white overflow-hidden">
        <div className="wrapper">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-10 animate-pulse">
            <div className="lg:w-1/2 space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded-full" />
              <div className="h-10 w-3/4 bg-gray-200 rounded-md" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-2/3 bg-gray-200 rounded-md" />
            </div>
          </div>

          <div className="w-full rounded-3xl min-h-[420px] md:min-h-[500px] bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    // <section className="bg-[#F5EDD8] py-12 md:py-20 px-6 overflow-hidden">
    <section
  className="py-12 md:py-20  overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/background_about.png')" }}
>
  
      <div className="wrapper">

        {/* Top text row */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-10">
          {/* Left: headings */}
          <div className="lg:w-1/2">
            <span className="inline-block bg-[#2D5F6B] text-[#FFF2D9] text-[12px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              {about.label ?? "Welcome to Ripuraj Agro"}
            </span>
            <h2 className="text-[#1a1a1a] text-[35px] font-bold leading-tight">
              {about.title_big}
            </h2>
           
          </div>

          {/* Right: description */}
          <div className="lg:w-1/2 flex items-center">
            <p className="text-gray-700 text-base md:text-[15px] leading-relaxed">
              {about.description}
            </p>
          </div>
        </div>

        {/* Background image card with overlay content */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[420px] md:min-h-[500px]">
          {/* Background image */}
          {about.image ? (
            <Image
              src={about.image}
              alt={about.title_big}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200" />
          )}

          {/* Optional dark overlay for readability */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Product badge / overlay content — bottom right */}
          {about.product_image && (
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
              <div className="relative w-28 h-36 md:w-36 md:h-44 drop-shadow-2xl">
                <Image
                  src={about.product_image}
                  alt="Product"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}