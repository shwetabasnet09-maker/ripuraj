"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Trash2, Pencil, MessageSquareOff } from "lucide-react";
import { authFetch } from "../../../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
}

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= value ? "text-yellow-400" : "text-gray-200"}
          fill={n <= value ? "#facc15" : "none"}
        />
      ))}
    </div>
  );
}

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/reviews/my/`, {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("My reviews response:", data);
      setReviews(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError("Couldn't reach the server. Check your connection.");
      } else if (err.message.includes("404")) {
        setError(
          "Reviews endpoint not found (404). The API path may be different than expected."
        );
      } else {
        setError(err.message || "Failed to load your reviews.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!confirm("Delete this review? This can't be undone.")) return;

    setDeletingId(reviewId);
    const previous = reviews;
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));

    try {
      const res = await authFetch(`${API_BASE_URL}/api/reviews/${reviewId}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
    } catch (err) {
      console.error("Failed to delete review:", err);
      setReviews(previous);
      alert("Couldn't delete this review. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">My Reviews</h2>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-slate-100 rounded" />
                  <div className="h-3 w-1/4 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-red-600 font-medium mb-2">
            Couldn't load your reviews
          </p>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={fetchReviews}
            className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && reviews.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <MessageSquareOff className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">
            You haven't written any reviews yet.
          </p>
          <Link
            href="/orders"
            className="inline-block bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Review a Past Order
          </Link>
        </div>
      )}

      {/* Reviews list */}
      {!loading && !error && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => {
            const productImage = resolveImageUrl(
              review.product_image || review.image
            );
            const productName =
              review.product_name || review.product || "Product";
            const productSlug = review.product_slug || review.slug;

            return (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >
                <div className="flex gap-4">
                  <Link
                    href={productSlug ? `/shop/${productSlug}` : "#"}
                    className="relative w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={productName}
                        fill
                        unoptimized
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                        No image
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {productName}
                        </h3>
                        <StarRating value={review.rating || 0} />
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          aria-label="Edit review"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#2f5f73] hover:bg-slate-50 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          aria-label="Delete review"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {review.comment}
                      </p>
                    )}

                    {review.created_at && (
                      <p className="text-gray-400 text-xs mt-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
