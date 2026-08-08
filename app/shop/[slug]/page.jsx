"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  X,
  ShoppingCart,
  CreditCard,
  ChevronRight,
  Check,
  Download,
  Trash2,
} from "lucide-react";
import { authFetch } from "../../utils/authFetch";
import { cachedFetchJson } from "../../utils/cachedFetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Decode a JWT's payload without any extra dependency, just so we can
// tell which review (if any) in the list belongs to the logged-in user.
// Returns null if there's no token or it can't be parsed.
function decodeJwtPayload(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="w-full bg-white pt-24 md:pt-28 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="aspect-square bg-gray-100 rounded-sm" />
          <div className="space-y-4 pt-1">
            <div className="h-8 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-1/3 bg-gray-100 rounded" />
            <div className="h-6 w-1/4 bg-gray-100 rounded" />
            <div className="h-10 w-full bg-gray-100 rounded" />
            <div className="h-12 w-full bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- NUTRITIONAL TEXT PARSER ----------------
// The backend stores `nutritional` as a free-typed, tab-separated blob
// (rows separated by \r\n or \n, columns by \t). The shape isn't
// consistent between products:
//   - Some are just "Label\tValue" pairs, e.g. "Energy\t355.8 kcal"
//   - Some have a proper header row starting with "Nutrient", e.g.
//     "Nutrient\tPer 100g\tPer 200g\t% DV\nEnergy\t130 kcal\t260 kcal\t13%"
//   - Some products have no nutritional data at all (empty string)
// This parses whatever is there into a simple { header, rows } shape,
// or returns null when there's nothing usable to show.
function parseNutritionalText(raw) {
  if (!raw || typeof raw !== "string" || !raw.trim()) return null;

  const lines = raw
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const rows = lines.map((line) => line.split("\t").map((cell) => cell.trim()));

  const looksLikeHeader = rows[0][0]?.toLowerCase() === "nutrient";

  return {
    header: looksLikeHeader ? rows[0] : null,
    rows: looksLikeHeader ? rows.slice(1) : rows,
  };
}

// ---------------- FAQ TEXT PARSER ----------------
// The backend stores `faq` as a single free-typed text field. It's
// entered as:
//   Q: What type of rice is this?
//   Premium Jeera Rice — a single variety, unlike the Mahashakti pack...
//   Q: Is this rice polished or specially processed?
//   The pack states it's milled and cleaned using advanced technology...
// i.e. a line starting with "Q:" opens a new question, and every line
// after it (up to the next "Q:" line) is that question's answer.
// A "Question|Answer" single-line format is also supported as a fallback
// for anyone who prefers entering it that way.
// Returns an array of { q, a } items, or null when there's nothing to show.
function parseFaqText(raw) {
  if (!raw || typeof raw !== "string" || !raw.trim()) return null;

  const lines = raw
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const hasQMarkers = lines.some((line) => /^q\s*:/i.test(line));

  let items;

  if (hasQMarkers) {
    items = [];
    let current = null;

    for (const line of lines) {
      const qMatch = line.match(/^q\s*:\s*(.*)$/i);
      if (qMatch) {
        if (current) items.push(current);
        current = { q: qMatch[1].trim(), a: "" };
      } else if (current) {
        // Answer line(s) — an "A:" prefix is optional, strip it if present.
        const cleaned = line.replace(/^a\s*:\s*/i, "");
        current.a = current.a ? `${current.a} ${cleaned}` : cleaned;
      }
    }
    if (current) items.push(current);
  } else {
    // Fallback: "Question|Answer" per line.
    items = lines.map((line) => {
      const sepIndex = line.indexOf("|");
      if (sepIndex === -1) return { q: line, a: "" };
      return {
        q: line.slice(0, sepIndex).trim(),
        a: line.slice(sepIndex + 1).trim(),
      };
    });
  }

  items = items.filter((item) => item.q);

  return items.length > 0 ? items : null;
}

// ---------------- REVIEW HELPERS ----------------
// We don't yet know the exact serializer shape your /api/reviews/
// endpoint returns, so these helpers are written defensively: they try
// several plausible field names rather than assuming one. Once you
// confirm the real shape, this can be trimmed down.

// Confirmed from the live API response: `product` is a flat integer id.
function reviewBelongsToProduct(review, product) {
  if (!review || !product) return false;
  return Number(review.product) === Number(product.id);
}

// Confirmed: `user` is a flat integer id.
function reviewBelongsToUser(review, userId) {
  if (!review || userId == null) return false;
  return Number(review.user) === Number(userId);
}

function StarRatingDisplay({ value, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          fill={n <= Math.round(value || 0) ? "#facc15" : "none"}
          className={n <= Math.round(value || 0) ? "text-yellow-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

function StarRatingInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="cursor-pointer"
        >
          <Star
            size={26}
            fill={n <= value ? "#facc15" : "none"}
            className={n <= value ? "text-yellow-400" : "text-gray-200"}
          />
        </button>
      ))}
    </div>
  );
}

// Confirmed: the API already gives us a plain `username` string per review.
function displayName(review) {
  return review.username || "Anonymous";
}

export default function ProductDetail({ params }) {
  const { slug } = React.use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------------- REVIEWS STATE ----------------
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("All");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ rating: 5, comment: "" });
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    const payload = decodeJwtPayload(token);
    if (payload) {
      setCurrentUserId(payload.user_id ?? payload.id ?? payload.pk ?? null);
    }
  }, []);

  useEffect(() => {
    if (images.length <= 1 || isModalOpen) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, isModalOpen]);

  const [activeTab, setActiveTab] = useState("details");
  const [recommended, setRecommended] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      try {
        setLoading(true);
        setFetchError(null);

        const { data, fromCache, refresh } = await cachedFetchJson(
          `${API_BASE_URL}/api/products/${slug}/`
        );

        if (cancelled) return;

        applyProductData(data);

        if (fromCache) setLoading(false);

        if (refresh) {
          refresh
            .then((freshData) => {
              if (!cancelled) applyProductData(freshData);
            })
            .catch(() => {});
        }

        try {
          const recResult = await cachedFetchJson(`${API_BASE_URL}/api/products/`);
          const filterOutSelf = (list) =>
            (Array.isArray(list) ? list : []).filter((p) => p.slug !== slug);

          if (!cancelled) setRecommended(filterOutSelf(recResult.data));

          if (recResult.refresh) {
            recResult.refresh
              .then((freshRec) => {
                if (!cancelled) setRecommended(filterOutSelf(freshRec));
              })
              .catch(() => {});
          }
        } catch (recError) {
          console.error("Error fetching recommended products:", recError);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error.message?.includes("404")) {
          setNotFoundState(true);
        } else {
          setFetchError(
            error.name === "TimeoutError" || error.name === "AbortError"
              ? "The server took too long to respond."
              : error.message || "Failed to reach the backend server"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    function applyProductData(data) {
      setProduct(data);

      const secondaryImages = (
        data.images?.map((img) => img.image) || []
      ).filter(Boolean);

      // NOTE: the API returns the cover image on `image`, not `main_image`.
      setImages(
        secondaryImages.length > 0
          ? secondaryImages
          : [data.main_image || data.image].filter(Boolean)
      );
      setSelectedImageIndex(0);

      // NOTE: the API returns pricing tiers on `customer` (and `reseller`),
      // not on a top-level `weights` field.
      const weightsList = data.customer || [];
      setSelectedWeight((prev) => {
        if (prev && weightsList.some((w) => w.weight === prev.weight)) {
          return prev;
        }
        return weightsList.length > 0 ? weightsList[0] : null;
      });
    }

    if (slug) {
      setQuantity(1);
      fetchProduct();
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ---------------- FETCH REVIEWS FOR THIS PRODUCT ----------------
  // Anonymous visitors need to see reviews too, so this uses plain
  // fetch() rather than authFetch() — no auth required just to read.
  // We try filtering server-side via ?product=<id>, and ALSO filter
  // client-side against several possible field names, in case the
  // backend ignores the query param or uses a different key.
  useEffect(() => {
    if (!product?.id) return;
    let cancelled = false;

    async function fetchReviews() {
      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/reviews/?product=${product.id}`,
          { signal: AbortSignal.timeout(10000) }
        );

        if (!res.ok) throw new Error(`Server returned status ${res.status}`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.results || [];
        const filtered = list.filter((r) => reviewBelongsToProduct(r, product));

        if (!cancelled) {
          // If nothing matched our client-side filter but the server
          // did return something, trust the server's filtering instead
          // of assuming our field-name guesses were wrong.
          setReviews(filtered.length > 0 ? filtered : list);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        if (!cancelled) {
          setReviewsError(
            err.name === "TimeoutError" || err.name === "AbortError"
              ? "Reviews took too long to load."
              : "Couldn't load reviews."
          );
        }
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    }

    fetchReviews();
    return () => {
      cancelled = true;
    };
  }, [product?.id]);

  const refetchReviews = async () => {
    if (!product?.id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews/?product=${product.id}`);
      if (!res.ok) return;
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];
      const filtered = list.filter((r) => reviewBelongsToProduct(r, product));
      setReviews(filtered.length > 0 ? filtered : list);
    } catch (err) {
      console.error("Failed to refresh reviews:", err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!reviewFormData.comment.trim()) {
      alert("Please write a few words about the product.");
      return;
    }

    setReviewSubmitting(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: product.id,
          rating: reviewFormData.rating,
          comment: reviewFormData.comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg =
          data.detail ||
          data.error ||
          (typeof data === "object" ? JSON.stringify(data) : "Failed to submit review");
        alert(errorMsg);
        return;
      }

      setShowReviewForm(false);
      setReviewFormData({ rating: 5, comment: "" });
      refetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Couldn't submit your review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Delete your review? This can't be undone.")) return;

    setDeletingReviewId(reviewId);
    const previous = reviews;
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));

    try {
      const res = await authFetch(`${API_BASE_URL}/api/reviews/${reviewId}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete review");
    } catch (err) {
      console.error("Failed to delete review:", err);
      setReviews(previous);
      alert("Couldn't delete this review. Please try again.");
    } finally {
      setDeletingReviewId(null);
    }
  };

  const handleAction = async (type) => {
    try {
      setButtonLoading(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      const res = await authFetch(`${API_BASE_URL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
          weight: selectedWeight?.weight || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.error || "Action failed");
      }

      if (type === "buy") {
        router.push("/cart");
      } else {
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1800);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const visibleReviews =
    ratingFilter === "All"
      ? reviews
      : reviews.filter((r) => Math.round(r.rating) === Number(ratingFilter));

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length
      : Number(product?.rating) || 0;

  const handleRecommendedScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (notFoundState) {
    return notFound();
  }

  if (fetchError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600 mb-3">
            Couldn't load this product
          </h1>
          <p className="text-gray-600 text-sm">
            {fetchError ||
              "The server didn't return any product data. This usually means the backend is temporarily unreachable."}
          </p>
          <p className="text-gray-400 text-xs mt-4">
            API: {API_BASE_URL}/api/products/{slug}/
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#2e6378] hover:bg-[#234d5d] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // NOTE: price lives on each weight entry as `retail_price`, not `price`.
  const currentUnitPrice = Number(selectedWeight?.retail_price || 0);
  const totalPrice = currentUnitPrice * quantity;
  const weights = product.customer || [];

  const nutritionalData = parseNutritionalText(product.nutritional);
  const faqData = parseFaqText(product.faq);

  const benefits = [
    { title: "Nutrient-Rich", desc: "Contains essential vitamins, iron, and magnesium.", icon: "/Rich.svg" },
    { title: "Energy Source", desc: "High in complex carbohydrates for sustained energy.", icon: "/Energy.svg" },
    { title: "Digestive Health", desc: "Easy to digest, aiding a healthy digestive system.", icon: "/Health.svg" },
    { title: "Heart Health", desc: "Naturally low in fat supporting cardiovascular wellness.", icon: "/Heart.svg" },
  ];

  return (
    <div className="w-full bg-white pt-24 md:pt-28">
      <style jsx global>{`
        @keyframes fadeInImage {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-image { animation: fadeInImage 0.4s ease-out; }
      `}</style>

      {/* ================= BREADCRUMB ================= */}
      <Reveal className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#2e6378] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-[#2e6378] transition-colors">{product.category || "Rice"}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">{product.name}</span>
        </div>
        <div className="border-b border-gray-200 mt-4" />
      </Reveal>

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* ================= LEFT IMAGE ================= */}
          <Reveal>
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative bg-[#f5f5f5] rounded-xl sm:rounded-sm border border-gray-200 aspect-square flex items-center justify-center cursor-zoom-in overflow-hidden group"
            >
              {images[selectedImageIndex] && (
                <Image
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain p-0 sm:p-0 animate-fade-image group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              )}

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5 overflow-x-auto scrollbar-hide pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative min-w-[85px] h-[85px] sm:min-w-[110px] sm:h-[110px] rounded-xl sm:rounded-2xl overflow-hidden  bg-[#f7edd6] transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    selectedImageIndex === i ? "border-[#2e6378] scale-105" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="thumb" fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          </Reveal>

          {/* ================= RIGHT INFO ================= */}
          <Reveal delay={100} className="pt-1">
            <h1 className="text-2xl sm:text-[26px] md:text-[30px] font-bold text-[#1c2b22] leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <StarRatingDisplay value={averageRating} size={14} />
              <p className="text-gray-600 text-sm">
                {averageRating ? averageRating.toFixed(1) : "No ratings yet"} · {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="mt-3">
              <h2 className="text-xl sm:text-[22px] font-bold text-[#1b1b1b]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </h2>
            </div>

            {weights.length > 0 && (
              <div className="mt-5">
                <p className="text-[15px] font-bold text-[#24342c] mb-2.5">Weight</p>

                <div className="flex flex-wrap items-center gap-2.5">
                  {weights.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                        selectedWeight?.weight === w.weight
                          ? "bg-[#2e6378] text-white shadow-md"
                          : "bg-[#e7e7e7] text-[#47606d] hover:bg-[#dcdcdc]"
                      }`}
                    >
                      {w.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 transition-all text-sm"
                >
                  <Minus size={14} />
                </button>

                <span className="w-9 text-center font-bold text-sm">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 transition-all text-sm"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="text-sm">
                Availability <span className="text-[#e85d5d] font-semibold">In Stock</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 max-w-sm">
              <button
                onClick={() => handleAction("cart")}
                disabled={buttonLoading}
                className={`h-[44px] rounded-md text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 ${
                  justAdded ? "bg-green-500 text-white" : "bg-[#2e6378] hover:bg-[#234d5d] text-white"
                }`}
              >
                {justAdded ? (<><Check size={16} />Added</>) : buttonLoading ? "Adding..." : (<><ShoppingCart size={16} />AddTo Cart</>)}
              </button>

              <button
                onClick={() => handleAction("buy")}
                disabled={buttonLoading}
                className="h-[44px] rounded-md bg-[#f3e7c9] hover:bg-[#e8d7ab] text-[#8d7a42] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
              >
                <CreditCard size={16} />
                Buy Now
              </button>
            </div>

            <div className="border border-gray-300 mt-5 p-3 sm:p-4 rounded-sm max-w-md">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <img src="/Google Pay.png" alt="Google Pay" className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110" />
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <img src="/Phone Pay.png" alt="PhonePe" className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110" />
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <img src="/CRED.png" alt="CRED" className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110" />
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <img src="/amazon-pay.png" alt="Amazon Pay" className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110" />
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <img src="/PTM.png" alt="Paytm UPI" className="h-9 sm:h-11 w-auto object-contain transition-transform hover:scale-110" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-8 text-sm">
              <span className="text-gray-500 font-medium">Share:</span>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out ${product.name} - ${typeof window !== "undefined" ? window.location.href : ""}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d9eadf] text-[#2c5c43] px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-[#c8ddd0] hover:-translate-y-0.5 transition-all"
              >
                WhatsApp
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="bg-[#e9e8f7] text-[#5a5782] px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-[#dcdaf2] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Share Link
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ================= BOTTOM TABS SECTION ================= */}
      <div className="w-full bg-[#2e6378] mt-10">
        <Reveal className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6 border-b border-white/20 pb-2 overflow-x-auto scrollbar-hide">
            {["details", "nutritional", "ingredients", "quality report", "how to cook", "faq"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab ? "text-white border-b-2 border-white pb-2" : "text-white/60 hover:text-white/90"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5" key={activeTab} style={{ animation: "fadeInImage 0.35s ease-out" }}>
            {activeTab === "details" && (
              <div>
                <div className="space-y-3 font-regular text-white/85 text-[15px] leading-6">
                  <p>
                    {product.description ||
                      "Ripuraj Rice brings you carefully selected premium-quality grains that stand out for their taste, texture, and consistency. Every grain is handpicked with attention to detail ensuring quality in every meal."}
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="text-white font-bold text-lg mb-4">Benefits</h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {benefits.map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 text-center flex flex-col items-center justify-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="flex justify-center mb-2">
                          <img src={item.icon} alt={item.title} className="w-[86px] h-[86px] object-contain" />
                        </div>
                        <h3 className="text-[20px] leading-tight font-semibold text-[#070707] mt-1">{item.title}</h3>
                        <p className="text-gray-500 mt-1.5 text-[14px]  font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---- NUTRITIONAL: now parsed from product.nutritional ---- */}
            {activeTab === "nutritional" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">Nutritional facts</h2>

                {nutritionalData ? (
                  <div className="bg-white rounded-2xl p-6 sm:p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        {nutritionalData.header && (
                          <thead>
                            <tr className="border-b border-gray-200">
                              {nutritionalData.header.map((cell, i) => (
                                <th
                                  key={i}
                                  className={`pb-2 ${
                                    i === 0 ? "text-left font-bold text-[#1e1e1e]" : "text-left font-normal text-gray-600"
                                  }`}
                                >
                                  {cell}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {nutritionalData.rows.map((row, r) => (
                            <tr key={r} className="border-b border-gray-100 last:border-b-0">
                              {row.map((cell, c) => (
                                <td key={c} className={`py-3 ${c === 0 ? "font-bold text-[#1e1e1e]" : "text-gray-700"}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-gray-500 text-xs mt-5">
                      Values as provided by the manufacturer. May vary by batch.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-500 text-sm">
                    Nutritional information isn't available for this product yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">Sourcing &amp; origin</h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <h3 className="font-bold text-[#1e1e1e] text-lg text-center">Complete ingredient list</h3>

                  <p className="text-gray-600 text-sm text-center mt-2 max-w-3xl mx-auto">
                    {product.ingredients ||
                      "100% Jeera Parboiled Rice (Oryza sativa L.) — Single ingredient. No additives, no preservatives, no flavour enhancers, no fortification agents."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Origin</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">Champaran, Bihar</p>
                      <p className="text-gray-600 text-sm mt-1">Single-district origin. Full traceability.</p>
                    </div>

                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Farming method</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">Traditional, non GMO</p>
                      <p className="text-gray-600 text-sm mt-1">Natural irrigation, minimal inputs</p>
                    </div>

                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Processing unit</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">Ripuraj Agro, Bihar</p>
                      <p className="text-gray-600 text-sm mt-1">ISO 22000 certified facility</p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Harvest season</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">Kharif (Oct–Nov)</p>
                      <p className="text-gray-600 text-sm mt-1">Current stock: 2025 harvest</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-white font-bold text-2xl mt-10 mb-5">Parboiling process</h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { step: "1", title: "Soaking", desc: "Paddy soaked in water to initiate gelatinisation" },
                      { step: "2", title: "Steaming", desc: "Steam treatment locks vitamins into the grain core" },
                      { step: "3", title: "Drying", desc: "Solar-assisted drying to reduce moisture uniformly" },
                      { step: "4", title: "Milling", desc: "Gentle milling removes husk while preserving bran nutrients" },
                    ].map((item) => (
                      <div key={item.step} className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-[#2e6378] flex items-center justify-center mb-4">
                          <span className="text-white text-3xl font-bold">{item.step}</span>
                        </div>
                        <h4 className="font-bold text-[#1e1e1e] text-base">{item.title}</h4>
                        <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quality report" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">Quality report</h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {
                        emoji: "🔬",
                        title: "Lab tested",
                        desc: "Every batch tested by NABL accredited lab for pesticide residues, heavy metals, and microbial load",
                      },
                      {
                        emoji: "📦",
                        title: "Moisture controlled",
                        desc: "Moisture content maintained below 14% to prevent mould and extend shelf life",
                      },
                      {
                        emoji: "📏",
                        title: "Grain uniformity",
                        desc: "5%+ grain uniformity — sorted by optical sorters to remove broken, discoloured, or chalky grains",
                      },
                      {
                        emoji: "🚫",
                        title: "Zero adulteration",
                        desc: "No mixing with other varieties, polishing agents, or mineral oils",
                      },
                      {
                        emoji: "📅",
                        title: "Shelf life",
                        desc: "18 months from packaging date in sealed bag. Store in cool, dry place away from direct sunlight",
                      },
                      {
                        emoji: "🏭",
                        title: "ISO 22000",
                        desc: "Processing facility certified for food safety management systems — audited annually",
                      },
                    ].map((item, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-5">
                        <div className="text-3xl mb-4">{item.emoji}</div>
                        <h4 className="font-bold text-[#1e1e1e] text-base">{item.title}</h4>
                        <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {product.quality_report && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-6 pt-6 border-t border-gray-200">
                      {product.quality_report}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "how to cook" && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                  <h2 className="text-white font-bold text-2xl">How to cook</h2>

                  {/* Static file served from /public/cooking-guide.pdf.
                      `download` prompts a save-as instead of opening it
                      inline in the browser. */}
                  <a
                    href="/cooking-guide.pdf"
                    download
                    className="bg-white text-[#2e6378] px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-100 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    <Download size={16} />
                    Download Recipe
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {product.how_to_cook ||
                    "1. Rinse the rice 2-3 times until the water runs clear.\n" +
                      "2. Soak for 20-30 minutes for best texture (optional).\n" +
                      "3. Use a 1:2 rice-to-water ratio for regular cooking, or 1:1.5 for biryani/pulao.\n" +
                      "4. Bring to a boil, then reduce heat, cover, and simmer for 15-18 minutes.\n" +
                      "5. Let it rest covered for 5 minutes, then fluff with a fork before serving."}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">FAQ</h2>

                {faqData ? (
                  <div className="bg-white rounded-2xl p-6 sm:p-8">
                    <div className="space-y-4">
                      {faqData.map((item, i) => (
                        <div key={i}>
                          <div className="border border-gray-200 rounded-lg px-5 py-3 focus-within:border-blue-400 hover:border-blue-300 transition-colors">
                            <h4 className="font-bold text-[#1e1e1e] text-[15px]">{item.q}</h4>
                          </div>
                          {item.a && (
                            <p className="text-gray-600 text-sm leading-relaxed px-5 mt-2">{item.a}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-500 text-sm">
                    No FAQs have been added for this product yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* ================= REVIEWS SECTION ================= */}
      <Reveal className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-black text-[#1e1e1e]">
                {averageRating ? averageRating.toFixed(1) : "—"}
              </span>
              <StarRatingDisplay value={averageRating} size={16} />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["All", "5", "4", "3", "2", "1"].map((filter) => (
              <button
                key={filter}
                onClick={() => setRatingFilter(filter)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                  ratingFilter === filter
                    ? "bg-[#2e6378] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {filter === "All" ? "All" : `${filter}★`}
              </button>
            ))}

            <button
              onClick={() => setShowReviewForm(true)}
              className="ml-2 bg-[#2e6378] hover:bg-[#234d5d] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
            >
              Write a review
            </button>
          </div>
        </div>

        {reviewsLoading && (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-5 animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
                <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {!reviewsLoading && reviewsError && (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-sm text-gray-500">
            {reviewsError}
          </div>
        )}

        {!reviewsLoading && !reviewsError && visibleReviews.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-sm text-gray-500">
            {reviews.length === 0
              ? "No reviews yet — be the first to review this product."
              : "No reviews match this filter."}
          </div>
        )}

        {!reviewsLoading && !reviewsError && visibleReviews.length > 0 && (
          <div className="space-y-4">
            {visibleReviews.map((review, i) => {
              const isMine = reviewBelongsToUser(review, currentUserId);
              return (
                <Reveal key={review.id ?? i} delay={i * 80}>
                  <div
                    className={`bg-gray-50 rounded-lg p-5 transition-shadow hover:shadow-md ${
                      isMine ? "border-2 border-blue-400" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <StarRatingDisplay value={review.rating} />
                        <p className="text-sm mt-1">
                          <span className="text-gray-700">
                            {isMine ? "You" : displayName(review)}
                          </span>{" "}
                          <span className="text-[#2c5c43] font-medium">
                            Verified Purchase
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {review.created_at && (
                          <span className="text-gray-400 text-xs">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        )}
                        {isMine && (
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            disabled={deletingReviewId === review.id}
                            aria-label="Delete review"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mt-3">
                      {review.comment || review.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </Reveal>

      {/* ================= WRITE REVIEW MODAL ================= */}
      {showReviewForm && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReviewForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">
                Write a review for {product.name}
              </h3>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Rating
                </label>
                <StarRatingInput
                  value={reviewFormData.rating}
                  onChange={(val) =>
                    setReviewFormData({ ...reviewFormData, rating: val })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your review
                </label>
                <textarea
                  value={reviewFormData.comment}
                  onChange={(e) =>
                    setReviewFormData({ ...reviewFormData, comment: e.target.value })
                  }
                  rows={4}
                  placeholder="Share your experience with this product..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5f73]/30"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="w-full bg-[#2f5f73] hover:bg-[#244a5a] text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-70"
              >
                {reviewSubmitting ? "Submitting..." : "Submit review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MORE RECOMMENDED PRODUCTS ================= */}
      {recommended.length > 0 && (
        <Reveal className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1e1e1e] mb-8">More Recommended Products</h2>

          <div
            ref={scrollRef}
            onScroll={handleRecommendedScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          >
            {recommended.slice(0, 8).map((item) => {
              const itemImage = item.main_image || item.image;
              const itemWeights = item.customer || [];

              return (
                <Link key={item.slug} href={`/shop/${item.slug}`} className="group flex-shrink-0 w-[220px] sm:w-[240px] snap-start">
                  <div className="relative w-full h-[220px] bg-[#EDEEF0] rounded-lg overflow-hidden">
                    {itemImage && (
                      <Image
                        src={itemImage}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="240px"
                        className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    )}
                  </div>

                  <h3 className="mt-3 text-[#2f5f73] font-semibold text-sm leading-snug line-clamp-2 min-h-[38px] group-hover:underline">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {itemWeights.length > 0
                      ? itemWeights.length === 1
                        ? `${parseFloat(itemWeights[0].weight)}Kg`
                        : `${parseFloat(itemWeights[0].weight)}Kg - ${parseFloat(itemWeights[itemWeights.length - 1].weight)}Kg`
                      : "5Kg - 20Kg"}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="h-1.5 bg-gray-200 rounded-full mt-6 max-w-md mx-auto overflow-hidden">
            <div className="h-full bg-[#2e6378] rounded-full transition-all duration-150" style={{ width: `${Math.max(15, scrollProgress)}%` }} />
          </div>
        </Reveal>
      )}

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-5"
          style={{ animation: "fadeInImage 0.25s ease-out" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative bg-white rounded-3xl max-w-5xl w-full h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-10 bg-white rounded-full p-2 shadow hover:scale-110 active:scale-95 transition-transform"
            >
              <X size={28} />
            </button>

            <div className="relative w-full h-full">
              {images[selectedImageIndex] && (
                <Image src={images[selectedImageIndex]} alt={product.name} fill unoptimized className="object-contain p-8" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}