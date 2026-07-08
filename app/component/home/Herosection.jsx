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

  if (!hero) return <p className="text-center py-20">Loading...</p>;

  return (
    <div
      className="h-[786px] bg-cover bg-center flex items-center "
      style={{
        backgroundImage: `url(${API_BASE_URL}${hero.image})`,
      }}
    >
      <div className="wrapper text-white flex justify-between pt-[120px]">
        <div className="w-[48%]">
          <h1 className="text-[45px] font-bold">{hero.title}</h1>

          <p className="mt-4 text-[20px]">{hero.description}</p>

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