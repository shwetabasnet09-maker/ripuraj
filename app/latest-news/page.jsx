"use client";

import { useEffect, useState } from "react";
import Bannermain from "../component/global/Banner";
import NewsCard from "../component/latestnew.jsx/NewsCard";
import NewsMediaSection from "../component/latestnew.jsx/NewsMediaSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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