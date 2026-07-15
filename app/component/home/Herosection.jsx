"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Herodiv = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/homepage/hero/`);
        const data = await res.json();
        setHero(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    }

    fetchHero();
  }, []);

  if (!hero) {
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

  return (
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
  );
};

export default Herodiv;