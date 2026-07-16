"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const Herodiv = () => {
  const [slides, setSlides] = useState(null); // null = loading

  useEffect(() => {
    let cancelled = false;

    async function fetchHero() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/homepage/hero/`);
        const data = await res.json();

        if (cancelled) return;

        // Handles BOTH cases: backend returns a single hero object today,
        // or an array of multiple hero banners once that's added later.
        const normalized = Array.isArray(data) ? data : [data];
        setSlides(normalized.filter(Boolean));
      } catch (error) {
        console.error("Error fetching hero:", error);
        if (!cancelled) setSlides([]);
      }
    }

    fetchHero();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---------------- LOADING SKELETON ----------------
  if (slides === null) {
    return (
      <div className="h-[560px] md:h-[786px] bg-neutral-900 flex items-center">
        <div className="wrapper px-5 md:px-0 text-white flex justify-between pt-14 md:pt-[120px]">
          <div className="w-full md:w-[48%] space-y-3 md:space-y-4">
            <div className="h-9 md:h-12 w-3/4 bg-white/10 rounded-md animate-pulse" />
            <div className="h-4 md:h-5 w-full bg-white/10 rounded-md animate-pulse" />
            <div className="h-4 md:h-5 w-4/5 bg-white/10 rounded-md animate-pulse" />
            <div className="h-10 md:h-12 w-32 md:w-40 bg-white/10 rounded-md mt-5 md:mt-6 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- NO DATA ----------------
  if (slides.length === 0) {
    return <div className="h-[560px] md:h-[786px] bg-neutral-900" />;
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={slides.length > 1}
        pagination={slides.length > 1 ? { clickable: true } : false}
        autoplay={
          slides.length > 1
            ? { delay: 5000, disableOnInteraction: false }
            : false
        }
        loop={slides.length > 1}
        className="hero-swiper"
      >
        {slides.map((hero, index) => (
          <SwiperSlide key={hero.id || index}>
            <div
              className="h-[560px] md:h-[786px] bg-cover bg-center bg-neutral-900 flex items-center"
              style={{
                backgroundImage: `url(${API_BASE_URL}${hero.image})`,
              }}
            >
              <div className="wrapper px-5 md:px-0 text-white flex justify-between pt-14 md:pt-[120px]">
                <div className="w-full md:w-[48%]">
                  <h1 className="text-[28px] leading-[1.25] md:text-[45px] md:leading-tight font-bold">
                    {hero.title}
                  </h1>

                  <p className="mt-3 md:mt-4 text-sm md:text-[20px]">
                    {hero.description}
                  </p>

                  {hero.button_link && (
                    <Link
                      href={hero.button_link}
                      className="mt-5 md:mt-6 inline-block bg-[#3b6b7a] px-5 md:px-6 py-2.5 md:py-3 rounded-md text-sm md:text-[19px] font-medium text-white hover:bg-[#335b6e] transition-colors"
                    >
                      {hero.button_text || "Shop Now"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styling for Swiper's default nav arrows + pagination dots
          so they match the site's look instead of Swiper's plain defaults. */}
      <style jsx global>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          backdrop-filter: blur(4px);
          transition: background 0.3s ease;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b6b7a;
        }
      `}</style>
    </div>
  );
};

export default Herodiv;
