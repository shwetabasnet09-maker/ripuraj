"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const videos = [
  { id: 1, title: "Ripuraj Rice Processing", youtubeId: "BOKQClMzRM0" },
  { id: 2, title: "Premium Quality Rice", youtubeId: "dQw4w9WgXcQ" },
  { id: 3, title: "From Farm to Home", youtubeId: "3tmd-ClpJxA" },
  { id: 4, title: "Why Choose Ripuraj", youtubeId: "l482T0yNkeo" },
];

export default function Testimonial() {
  return (
    <div className="wrapper mx-auto py-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h3 className="text-[20px] text-gray-500">TESTIMONIAL</h3>
          <h2 className="text-4xl sm:text-5xl text-[#2D5B70] font-bold">
            Watch Our Videos
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button className="prev-btn w-10 h-10 border rounded-full">
            ←
          </button>
          <button className="next-btn w-10 h-10 border rounded-full">
            →
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
          1024: { slidesPerView: 3 }, // ✅ EXACTLY 3
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <VideoCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const VideoCard = ({ video }) => {
  return (
    <div className="w-full">
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title={video.title}
        className="w-full h-[280px] rounded-xl"
        allowFullScreen
      />
      
    </div>
  );
};
