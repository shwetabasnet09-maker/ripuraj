"use client";

// ---------------- CONFIG ----------------
// Replace with your real WhatsApp number, country code first, no
// spaces/dashes/plus sign (e.g. 91XXXXXXXXXX for India).
const WHATSAPP_NUMBER = "+919905555666";
const DEFAULT_MESSAGE = "Hi! I'd like to know more about Ripuraj products.";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center"
    >
      {/* Pulsing ring, draws the eye without being obnoxious */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping [animation-duration:2.5s]" />

      <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-105 active:scale-95">
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.696 4.607 1.897 6.48L4 29l7.72-1.86A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.362l-.357-.212-4.583 1.104 1.13-4.47-.233-.367A9.78 9.78 0 0 1 5.818 15c0-5.618 4.568-10.182 10.186-10.182 5.618 0 10.182 4.564 10.182 10.182 0 5.618-4.564 10.182-10.182 10.182Zm5.6-7.63c-.307-.154-1.816-.897-2.098-1-.281-.103-.487-.154-.692.154-.205.307-.794 1-.973 1.205-.179.205-.358.23-.665.077-.307-.154-1.297-.478-2.47-1.524-.913-.814-1.53-1.82-1.709-2.127-.179-.307-.02-.473.135-.627.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.103-.205.051-.384-.026-.538-.077-.154-.692-1.668-.949-2.284-.25-.6-.504-.518-.692-.527l-.59-.01c-.205 0-.538.077-.82.384-.281.307-1.075 1.05-1.075 2.563 0 1.512 1.1 2.974 1.253 3.18.154.205 2.166 3.307 5.248 4.637.733.316 1.305.505 1.751.647.735.234 1.404.2 1.933.121.59-.088 1.816-.742 2.072-1.46.256-.717.256-1.332.18-1.46-.077-.128-.282-.205-.59-.358Z" />
        </svg>
      </span>

      {/* Tooltip label — appears to the left on hover, desktop only */}
      <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap bg-[#14232a] text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat with us
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#14232a] rotate-45" />
      </span>
    </a>
  );
}
