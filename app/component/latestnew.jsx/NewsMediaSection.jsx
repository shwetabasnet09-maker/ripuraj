"use client";

import Image from "next/image";

// ---------------- CONTENT ----------------
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

export default function NewsMediaSection() {
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
