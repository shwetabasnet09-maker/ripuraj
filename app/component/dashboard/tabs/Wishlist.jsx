"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { authFetch } from "../../../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_BASE_URL}${image}`;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/wishlist/`, {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("Wishlist response:", data);
      setWishlist(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError("Couldn't reach the server. Check your connection.");
      } else {
        setError(err.message || "Failed to load your wishlist.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (itemId) => {
    setRemovingId(itemId);

    // Optimistically remove from the UI first for a snappy feel.
    const previous = wishlist;
    setWishlist((prev) => prev.filter((item) => item.id !== itemId));

    try {
      const res = await authFetch(`${API_BASE_URL}/api/wishlist/${itemId}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
      // Revert on failure.
      setWishlist(previous);
      alert("Couldn't remove this item. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await authFetch(`${API_BASE_URL}/api/cart/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Couldn't add this item to your cart. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">My Wishlist</h2>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse"
            >
              <div className="w-full h-32 bg-slate-100 rounded-xl mb-3" />
              <div className="h-4 w-3/4 bg-slate-100 rounded mb-2" />
              <div className="h-3 w-1/2 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-red-600 font-medium mb-2">
            Couldn't load your wishlist
          </p>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={fetchWishlist}
            className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && wishlist.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}

      {/* Wishlist grid */}
      {!loading && !error && wishlist.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => {
            const productImage = resolveImageUrl(
              item.product_image || item.image
            );
            const productName =
              item.product_name || item.name || "Product";
            const productSlug = item.product_slug || item.slug;
            const price = item.product_price || item.price;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <Link
                  href={productSlug ? `/shop/${productSlug}` : "#"}
                  className="block relative w-full h-32 bg-slate-50 rounded-xl overflow-hidden mb-3"
                >
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={productName}
                      fill
                      unoptimized
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      No image
                    </div>
                  )}
                </Link>

                <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[36px]">
                  {productName}
                </h3>

                {price && (
                  <p className="text-slate-900 font-bold text-sm mt-1">
                    ₹{Number(price).toLocaleString("en-IN")}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(item.product || item.product_id)}
                    className="flex-1 bg-[#2f5f73] hover:bg-[#244a5a] text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={removingId === item.id}
                    aria-label="Remove from wishlist"
                    className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}