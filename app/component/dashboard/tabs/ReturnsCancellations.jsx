"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PackageX, RotateCcw } from "lucide-react";
import { authFetch } from "../../../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
}

const statusStyles = {
  requested: "bg-orange-100 text-orange-700",
  approved: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function ReturnsCancellations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReturns = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/orders/returns/`, {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("Returns/cancellations response:", data);
      setItems(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Failed to fetch returns:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError("Couldn't reach the server. Check your connection.");
      } else if (err.message.includes("404")) {
        setError(
          "Returns endpoint not found (404). The API path may be different than expected."
        );
      } else {
        setError(err.message || "Failed to load your returns.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        My Return &amp; Cancellations
      </h2>

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
            Couldn't load your returns
          </p>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={fetchReturns}
            className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && items.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <PackageX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">
            You have no returns or cancellations.
          </p>
          <Link
            href="/orders"
            className="inline-block bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            View My Orders
          </Link>
        </div>
      )}

      {/* Returns list */}
      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => {
            const productImage = resolveImageUrl(
              item.product_image || item.image
            );
            const productName =
              item.product_name || item.product || "Product";
            const orderId = item.order || item.order_id;
            const type = item.type || (item.reason ? "Return" : "Cancellation");

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={productName}
                        fill
                        unoptimized
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <RotateCcw size={20} className="text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {productName}
                        </h3>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {type}
                          {orderId ? ` · Order #${orderId}` : ""}
                        </p>
                      </div>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                          statusStyles[item.status?.toLowerCase()] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </div>

                    {item.reason && (
                      <p className="text-gray-600 text-sm mt-2">
                        Reason: {item.reason}
                      </p>
                    )}

                    {item.created_at && (
                      <p className="text-gray-400 text-xs mt-2">
                        Requested on{" "}
                        {new Date(item.created_at).toLocaleDateString()}
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
