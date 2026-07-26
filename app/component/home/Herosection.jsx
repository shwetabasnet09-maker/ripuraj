"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Herodiv = () => {
  const [slides, setSlides] = useState(null); // null = loading
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

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
      <div className="h-[560px] md:h-[786px] bg-neutral-900 animate-pulse" />
    );
  }

  // ---------------- NO DATA ----------------
  if (slides.length === 0) {
    return <div className="h-[560px] md:h-[786px] bg-neutral-900" />;
  }

  const hasMultiple = slides.length > 1;

  return (
    <div className="relative group h-[560px] md:h-[786px] overflow-hidden bg-neutral-900">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={
          hasMultiple
            ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        loop={hasMultiple}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((hero, index) => (
          <SwiperSlide key={hero.id || index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${API_BASE_URL}${hero.image})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <>
          {/* Custom nav arrows — fade in on hover, sit above the image */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95"
          >
            <ChevronRight size={22} />
          </button>

          {/* Progress-bar style pagination — modern alternative to dots */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute bottom-6 md:bottom-10 right-4 md:right-8 z-20 text-white/80 text-xs md:text-sm font-medium tracking-wide">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </>
      )}
    </div>
  );
};

export default Herodiv;