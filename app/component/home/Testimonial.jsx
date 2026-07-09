"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const videos = [
  { id: 1, title: "Ripuraj Rice Processing", youtubeId: "BOKQClMzRM0" },
  { id: 2, title: "Premium Quality Rice", youtubeId: "c2pQPn3V4ww" },
  { id: 3, title: "From Farm to Home", youtubeId: "aBt27fMCTFQ" },
  { id: 4, title: "Why Choose Ripuraj", youtubeId: "J2lBZi-EUNM" },
];

export default function Testimonial() {
  return (
    <section className="relative bg-[#F7F7F7] overflow-hidden py-16">
      {/* LEFT BOTTOM ICON */}
      <div className="absolute bottom-0 left-0 z-10">
        <Image
          src="/leftimg.png"
          alt="left icon"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* RIGHT BOTTOM ICON */}
      <div className="absolute bottom-0 right-0 z-10">
        <Image
          src="/rightimg.png"
          alt="right icon"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div className="wrapper mx-auto relative z-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-5">
          <div>
            <h3 className="text-[16px] uppercase tracking-wide text-[#000000] font-medium">
              Testimonial
            </h3>

            <h2 className="text-[35px] font-bold text-[#2D5B70] leading-tight mt-1 tracking-[-0.05em]">
              Hear from those who trust our brand
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button className="prev-btn w-9 h-9 rounded-full border border-[#2D5B70]/40 flex items-center justify-center text-[#2D5B70] hover:bg-[#2D5B70] hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button className="next-btn w-9 h-9 rounded-full border border-[#2D5B70]/40 flex items-center justify-center text-[#2D5B70] hover:bg-[#2D5B70] hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const VideoCard = ({ video }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#E9E9E9] h-[250px] lg:h-[280px]">
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title={video.title}
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
};