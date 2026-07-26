"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bannermain from "../../component/global/Banner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
}

export default function EventDetailPage({ params }) {
  const [slug, setSlug] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFoundState, setNotFoundState] = useState(false);

  // params is a Promise in Next.js 15+ — resolve it once on mount.
  useEffect(() => {
    Promise.resolve(params).then((p) => setSlug(p.slug));
  }, [params]);

  const fetchEvent = async (eventSlug) => {
    setLoading(true);
    setError(null);
    setNotFoundState(false);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/events/${eventSlug}/`,
        { signal: AbortSignal.timeout(10000) }
      );

      if (res.status === 404) {
        setNotFoundState(true);
        return;
      }

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("Event gallery response:", data);
      setEvent(data);
    } catch (err) {
      console.error("Failed to fetch event:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError("Couldn't reach the server. Check your connection.");
      } else {
        setError(err.message || "Failed to load this event.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchEvent(slug);
  }, [slug]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-20 animate-pulse">
        <div className="h-10 w-2/3 bg-gray-200 rounded mx-auto mb-4" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2 max-w-3xl mx-auto" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-12 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[260px] rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  // ---------------- NOT FOUND ----------------
  if (notFoundState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <p className="text-gray-500 text-lg mb-4">Event not found.</p>
        <Link
          href="/event"
          className="text-[#2f5f73] font-semibold hover:underline"
        >
          ← Back to All Events
        </Link>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <p className="text-red-600 font-medium mb-2">
          Couldn't load this event
        </p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button
          onClick={() => fetchEvent(slug)}
          className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const title = event.title || event.name;
  const description = event.description;
  const gallery = event.gallery || event.images || [];

  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title={title} />

      <section className="relative py-14 md:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2f5f73] mb-4 text-center">
            {title}
          </h1>

          {description && (
            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-12">
              {description}
            </p>
          )}

          {gallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((img, i) => {
                const imageUrl = resolveImageUrl(
                  typeof img === "string" ? img : img.image
                );

                return (
                  <div
                    key={i}
                    className="relative h-[200px] rounded-2xl overflow-hidden shadow-md group"
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={`${title} photo ${i + 1}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-14">
            <Link
              href="/event"
              className="inline-block bg-[#2f5f73] hover:bg-[#244a5a] text-[#F6C453] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              ← Back to All Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}