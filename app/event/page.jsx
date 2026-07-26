"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bannermain from "../component/global/Banner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
}

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/events/`, {
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("Events response:", data);
      setEvents(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError("Couldn't reach the server. Check your connection.");
      } else {
        setError(err.message || "Failed to load events.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Events" />

      <section className="relative py-14 md:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-pulse">
                  <div className="w-full h-[210px] rounded-2xl bg-gray-200" />
                  <div className="mt-5 h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="mt-5 h-10 w-28 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium mb-2">
                Couldn't load events
              </p>
              <p className="text-gray-500 text-sm mb-6">{error}</p>
              <button
                onClick={fetchEvents}
                className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && events.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No events to show right now.</p>
            </div>
          )}

          {/* Events grid */}
          {!loading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {events.map((event) => {
                const cover = resolveImageUrl(
                  event.cover_image || event.coverImage || event.image
                );
                const title = event.title || event.name;
                const slug = event.slug || event.id;

                return (
                  <div
                    key={slug}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="relative w-full h-[210px] rounded-2xl overflow-hidden shadow-md">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>

                    <h3 className="mt-5 text-[20px] font-objective font-semibold text-[#1a2b33]">
                      {title}
                    </h3>

                    <Link
                      href={`/event/${slug}`}
                      className="mt-5 bg-[#2f5f73] hover:bg-[#244a5a] text-[#F6C453] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                    >
                      See More
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}