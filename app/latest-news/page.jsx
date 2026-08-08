"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bannermain from "../component/global/Banner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ==================================================================
// NewsCard (inlined from component/latestnew.jsx/NewsCard.jsx)
// ==================================================================
function NewsCard({ id, slug, image, title, short_description }) {
  // Some news items have an empty slug from the backend — fall back to
  // the numeric id so the link always points somewhere valid instead of
  // a broken "/latest-news/" URL.
  const linkTarget = slug && slug.trim() ? slug : id;

  return (
    <Link href={`/latest-news/${linkTarget}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative h-64 bg-[#2f5f73] rounded-[21px] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-center text-[#2f5f73] font-medium text-[20px] mt-4">
          {title}
        </p>

        {/* Short description */}
        {/* {short_description && (
          <p className="text-center text-gray-500 text-sm mt-2 line-clamp-2">
            {short_description}
          </p>
        )} */}
      </div>
    </Link>
  );
}

// ==================================================================
// NewsMediaSection (inlined from component/latestnew.jsx/NewsMediaSection.jsx)
// ==================================================================

// Swap these src paths for your own logo files — drop them in
// /public/press/ and update the paths below. Keeping them as plain
// <img>-style entries (not hardcoded JSX) means adding or removing a
// publication is just editing this array, nothing else.

const LEGACY_MASTHEADS = [
  { name: "हिन्दुस्तान", src: "/hindustan.png" },
  { name: "दैनिक जागरण", src: "/dainik-jagran.png" },
  { name: "प्रभात खबर", src: "/prabhat-khabar.png" },
];

const FEATURED_LOGOS = [
  { name: "ANI", src: "/ani.png" },
  { name: "LatestLY", src: "/latestly.png" },
  { name: "The Print", src: "/theprint.png" },
  { name: "The Tribune", src: "/thetribune.png" },
  { name: "Big News Network", src: "/bignewsnetwork.png" },
  { name: "Dailyhunt", src: "/dailyhunt.png" },
  { name: "Business Standard", src: "/businessstandard.png" },
  { name: "Daily Prabhat", src: "/dailyprabhat.png" },
  { name: "UP18 News", src: "/up18news.png" },
  { name: "JioNews", src: "/jionews.png" },
  { name: "Bihar Times", src: "/bihartimes.png" },
  { name: "Bihar 24x7", src: "/bihar.png" },
];

function LogoTile({ logo, size = "md" }) {
  const height = size === "lg" ? "h-10 sm:h-12" : "h-7 sm:h-8";

  return (
    <div className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8">
      <img
        src={logo.src}
        alt={logo.name}
        className={`${height} w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105`}
      />
    </div>
  );
}

function NewsMediaSection() {
  // Duplicate the featured-logo row so the marquee track can loop
  // seamlessly — translating exactly -50% lands back on an identical
  // frame, so the seam is invisible.
  const marqueeLogos = [...FEATURED_LOGOS, ...FEATURED_LOGOS];

  return (
    <section className="relative py-16 sm:py-20 bg-[#FFF8E2] overflow-hidden">
      <style jsx global>{`
        @keyframes press-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .press-marquee-track {
          animation: press-marquee 32s linear infinite;
        }
        .press-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .press-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="uppercase text-[11px] sm:[12] tracking-[0.25em] text-[#00000]/70 font-medium mb-3">
          Trusted Voice, Trusted Grain
        </p>
        <h2 className="text-3xl sm:text-[35px] font-bold text-[#2f5f73] mb-4">
          News &amp; Media
        </h2>
        <p className="text-[#00000] text-sm sm:text-base max-full mx-auto leading-relaxed">
          Our leadership carries forward the founder's vision with focus and
          responsibility — guided by experience, driven by innovation.
        </p>
      </div>

      {/* ---- LEGACY MASTHEADS ---- */}
      <div className="max-w-4xl mx-auto px-4 mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {LEGACY_MASTHEADS.map((logo) => (
          <LogoTile key={logo.name} logo={logo} size="lg" />
        ))}
      </div>

      {/* ---- DIVIDER ---- */}
      <div className="max-w-3xl mx-auto px-4 mt-14 mb-10 flex items-center gap-4">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#2f5f73]/25" />
        <span className="flex-shrink-0 flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#2f5f73]/60 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F6C453]" />
          As Featured In
        </span>
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2f5f73]/25" />
      </div>

      {/* ---- INFINITE LOGO MARQUEE ---- */}
      <div className="relative">
        {/* Edge fades so the loop reads as infinite, not clipped */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="overflow-hidden">
          <div className="press-marquee-track flex items-center w-max">
            {marqueeLogos.map((logo, i) => (
              <LogoTile key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================================================================
// PAGE
// ==================================================================
export default function LatestNewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/news/`, {
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setNewsItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(
        err.name === "TimeoutError" || err.name === "AbortError"
          ? "The server took too long to respond."
          : err.message || "Couldn't load the latest news."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Latest News" />

      <div className="relative overflow-hidden bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-black mb-6">
            Latest News
          </h1>

          {/* ---------------- LOADING ---------------- */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="h-64 bg-gray-200 rounded-[21px]" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* ---------------- ERROR ---------------- */}
          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium mb-2">
                Couldn't load the latest news
              </p>
              <p className="text-gray-500 text-sm mb-6">{error}</p>
              <button
                onClick={fetchNews}
                className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ---------------- EMPTY ---------------- */}
          {!loading && !error && newsItems.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              No news articles have been posted yet.
            </p>
          )}

          {/* ---------------- NEWS GRID ---------------- */}
          {!loading && !error && newsItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {newsItems.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          )}
        </div>
      </div>

      <NewsMediaSection />
    </main>
  );
}