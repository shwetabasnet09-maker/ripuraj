"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
      <div className="h-[786px] bg-neutral-900 flex items-center">
        <div className="wrapper text-white flex justify-between pt-[120px]">
          <div className="w-[48%] space-y-4">
            <div className="h-12 w-3/4 bg-white/10 rounded-md animate-pulse" />
            <div className="h-5 w-full bg-white/10 rounded-md animate-pulse" />
            <div className="h-5 w-4/5 bg-white/10 rounded-md animate-pulse" />
            <div className="h-12 w-40 bg-white/10 rounded-md mt-6 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-[786px] bg-cover bg-center bg-neutral-900 flex items-center"
      style={{
        backgroundImage: `url(${API_BASE_URL}${hero.image})`,
      }}
    >
      <div className="wrapper text-white flex justify-between pt-[120px]">
        <div className="w-[48%]">
          <h1 className="text-[45px] font-bold">{hero.title}</h1>

          <p className="mt-4 text-[20px]">
            {hero.description}
          </p>

          {hero.button_link && (
            <Link
              href={hero.button_link}
              className="mt-6 inline-block bg-[#3b6b7a] px-6 py-3 rounded-md text-[19px] font-medium text-white hover:bg-[#335b6e] transition-colors"
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
