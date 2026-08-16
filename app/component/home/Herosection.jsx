"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://ripuraj.tech";
const HERO_ENDPOINT = `${API_BASE_URL}/api/homepage/hero/`;

const Herodiv = () => {
  const [slides, setSlides] = useState(null); // null = loading
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchHero() {
      try {
        const res = await fetch(HERO_ENDPOINT);
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
      <div className="w-full min-h-[160px] sm:min-h-0 sm:h-[640px] md:h-[786px] bg-white sm:bg-[#14232a] animate-pulse" />
    );
  }

  // ---------------- NO DATA ----------------
  if (slides.length === 0) {
    return (
      <div className="w-full min-h-[160px] sm:min-h-0 sm:h-[640px] md:h-[786px] bg-white sm:bg-[#14232a]" />
    );
  }

  const hasMultiple = slides.length > 1;

  const resolveImage = (path) =>
    path?.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  return (
    // Mobile (base): autoHeight so the container matches each image's
    // real rendered height — no gap or letterbox strip.
    // sm and up: fixed height, object-cover, dark bg.
    <div className="relative group w-full min-h-[160px] sm:min-h-0 sm:h-[640px] md:h-[786px] overflow-hidden bg-white sm:bg-[#14232a]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoHeight={true}
        breakpoints={{
          640: { autoHeight: false },
        }}
        autoplay={
          hasMultiple
            ? {
                delay: 5500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        loop={hasMultiple}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full sm:h-full"
      >
        {slides.map((hero, index) => (
          <SwiperSlide key={hero.id || index}>
            <img
              src={resolveImage(hero.image)}
              alt={hero.title || "Hero banner"}
              className="block w-full h-auto sm:h-full sm:object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <>
          {/* Nav arrows — dark-on-light for the mobile white letterbox,
              switching to the original light-on-dark styling at sm+. */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/90 sm:bg-white/10 backdrop-blur-md border border-black/10 sm:border-white/20 shadow-md sm:shadow-none flex items-center justify-center text-[#14232a] sm:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white sm:hover:bg-white/25 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={22} className="hidden sm:block" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/90 sm:bg-white/10 backdrop-blur-md border border-black/10 sm:border-white/20 shadow-md sm:shadow-none flex items-center justify-center text-[#14232a] sm:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white sm:hover:bg-white/25 hover:scale-105 active:scale-95"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={22} className="hidden sm:block" />
          </button>

          {/* Harvest-timeline style progress bar */}
          <div className="absolute bottom-3 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 shadow-sm sm:shadow-none ${
                  i === activeIndex
                    ? "w-9 bg-[#F6C453]"
                    : "w-1.5 bg-black/20 sm:bg-white/35 hover:bg-black/35 sm:hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute bottom-3 sm:bottom-6 md:bottom-10 right-4 md:right-8 z-20 text-[#14232a]/60 sm:text-white/70 text-xs md:text-sm font-medium tracking-wide bg-white/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none px-2 py-0.5 sm:px-0 sm:py-0 rounded-full">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </>
      )}
    </div>
  );
};

export default Herodiv;
