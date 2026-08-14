"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bannermain from "../component/global/Banner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
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
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(
        err.name === "TimeoutError" || err.name === "AbortError"
          ? "The server took too long to respond."
          : err.message || "Couldn't load blog posts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Blog" />

      <section className="relative py-14 lg:py-20 px-5 lg:px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* ---------------- LOADING ---------------- */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#f8f6f1] rounded-2xl overflow-hidden">
                  <div className="w-full h-[180px] lg:h-[220px] bg-gray-200" />
                  <div className="p-4 lg:p-6 space-y-2">
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------------- ERROR ---------------- */}
          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium mb-2">Couldn't load the blog</p>
              <p className="text-gray-500 text-sm mb-6">{error}</p>
              <button
                onClick={fetchBlogs}
                className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ---------------- EMPTY ---------------- */}
          {!loading && !error && blogs.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              No blog posts have been published yet.
            </p>
          )}

          {/* ---------------- GRID ---------------- */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => {
                // Some articles have an empty slug from the backend —
                // fall back to id so the link always resolves.
                const linkTarget =
                  blog.slug && blog.slug.trim() ? blog.slug : blog.id;

                const formattedDate = blog.published_date
                  ? new Date(blog.published_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "";

                return (
                  <Link
                    key={linkTarget}
                    href={`/blog/${linkTarget}`}
                    className="group block bg-[#f8f6f1] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full h-[180px] lg:h-[220px] overflow-hidden bg-gray-200">
                      {blog.image && (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      )}
                    </div>

                    <div className="p-4 lg:p-6">
                      {formattedDate && (
                        <p className="text-gray-400 text-xs mb-2">{formattedDate}</p>
                      )}

                      <h3 className="font-bold text-[#1a1a1a] text-base lg:text-lg leading-snug mb-2 group-hover:text-[#2f5f73] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {blog.short_description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {blog.short_description}
                        </p>
                      )}

                      <span className="inline-block mt-3 text-[#2f5f73] text-sm font-semibold group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}