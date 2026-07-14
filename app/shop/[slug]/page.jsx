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
} from "lucide-react";
import { authFetch } from "../../utils/authFetch";
import { cachedFetchJson } from "../../utils/cachedFetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Lightweight scroll-reveal wrapper — fades + slides content up as it
// enters the viewport. No extra dependencies needed.
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

// Skeleton shown while the product loads — same rough layout/height as
// the real page, so there's no jarring flash once data arrives.
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

  // Auto-play the image gallery — advances to the next image every 3.5s.
  // Pauses automatically while the zoom modal is open.
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

  // Always land at the top of the page when opening a product detail
  // page — prevents landing scrolled down at a lower section (e.g. the
  // recommended products carousel) when navigating here from another page.
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

        // Cached data shown instantly — stop the loading state now.
        if (fromCache) setLoading(false);

        if (refresh) {
          refresh
            .then((freshData) => {
              if (!cancelled) applyProductData(freshData);
            })
            .catch(() => {
              // keep showing cached data if the background refresh fails
            });
        }

        // Recommended products — same caching treatment.
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

      setImages(
        secondaryImages.length > 0
          ? secondaryImages
          : [data.main_image].filter(Boolean)
      );
      setSelectedImageIndex(0);

      if (data.weights && data.weights.length > 0) {
        setSelectedWeight((prev) => prev || data.weights[0]);
      }
    }

    if (slug) {
      setQuantity(1);
      fetchProduct();
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

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

  const currentUnitPrice = Number(selectedWeight?.price || product.price || 0);
  const totalPrice = currentUnitPrice * quantity;

  const benefits = [
    {
      title: "Nutrient-Rich",
      desc: "Contains essential vitamins, iron, and magnesium.",
      icon: "/Rich.svg",
    },
    {
      title: "Energy Source",
      desc: "High in complex carbohydrates for sustained energy.",
      icon: "/Energy.svg",
    },
    {
      title: "Digestive Health",
      desc: "Easy to digest, aiding a healthy digestive system.",
      icon: "/Health.svg",
    },
    {
      title: "Heart Health",
      desc: "Naturally low in fat supporting cardiovascular wellness.",
      icon: "/Heart.svg",
    },
  ];

  const micronutrients = [
    { label: "Iron", value: "0.8mg", percent: 26, color: "bg-[#6d28d9]" },
    { label: "Magnesium", value: "12mg", percent: 40, color: "bg-[#6d28d9]" },
    { label: "Zinc", value: "0.6mg", percent: 16, color: "bg-[#6d28d9]" },
    { label: "Thiamine B1", value: "0.18", percent: 57, color: "bg-[#2e6378]" },
    { label: "Niacin B3", value: "1.9mg", percent: 21, color: "bg-[#6d28d9]" },
    { label: "Phosphorus", value: "68mg", percent: 41, color: "bg-[#6d28d9]" },
  ];

  return (
    <div className="w-full bg-white pt-24 md:pt-28">
      <style jsx global>{`
        @keyframes fadeInImage {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-image {
          animation: fadeInImage 0.4s ease-out;
        }
      `}</style>

      {/* ================= BREADCRUMB ================= */}
      <Reveal className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#2e6378] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-[#2e6378] transition-colors">
            {product.category || "Rice"}
          </Link>
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
                    selectedImageIndex === i
                      ? "border-[#2e6378] scale-105"
                      : "border-transparent"
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
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#facc15" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm">{product.rating || 4.9} · 100 reviews</p>
            </div>

            <div className="mt-3">
              <h2 className="text-xl sm:text-[22px] font-bold text-[#1b1b1b]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </h2>
            </div>

            {product.weights?.length > 0 && (
              <div className="mt-5">
                <p className="text-[15px] font-bold text-[#24342c] mb-2.5">Weight</p>

                <div className="flex flex-wrap items-center gap-2.5">
                  {product.weights.map((w, idx) => (
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

                  <button
                    onClick={() => setSelectedWeight(product.weights[0])}
                    className="text-red-400 hover:text-red-500 font-semibold text-sm transition-colors"
                  >
                    Clear
                  </button>
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
                  justAdded
                    ? "bg-green-500 text-white"
                    : "bg-[#2e6378] hover:bg-[#234d5d] text-white"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    Added
                  </>
                ) : buttonLoading ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    AddTo Cart
                  </>
                )}
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
                <img
                  src="/Google Pay.png"
                  alt="Google Pay"
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110"
                />

                <div className="w-px h-8 bg-gray-200 hidden sm:block" />

                <img
                  src="/Phone Pay.png"
                  alt="PhonePe"
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110"
                />

                <div className="w-px h-8 bg-gray-200 hidden sm:block" />

                <img
                  src="/CRED.png"
                  alt="CRED"
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110"
                />

                <div className="w-px h-8 bg-gray-200 hidden sm:block" />

                <img
                  src="/amazon-pay.png"
                  alt="Amazon Pay"
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform hover:scale-110"
                />

                <div className="w-px h-8 bg-gray-200 hidden sm:block" />

                <img
                  src="/PTM.png"
                  alt="Paytm UPI"
                  className="h-9 sm:h-11 w-auto object-contain transition-transform hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-8 text-sm">
              <span className="text-gray-500 font-medium">Share:</span>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out ${product.name} - ${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`
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
            {["details", "nutritional", "ingredients", "quality report", "how to cook", "faq"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? "text-white border-b-2 border-white pb-2"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="mt-5" key={activeTab} style={{ animation: "fadeInImage 0.35s ease-out" }}>
            {activeTab === "details" && (
              <div>
                <div className="space-y-3 font-regular text-white/85 text-[15px] leading-6">
                  <p>
                    {product.description ||
                      "Ripuraj Rice brings you carefully selected premium-quality grains that stand out for their taste, texture, and consistency. Every grain is handpicked with attention to detail ensuring quality in every meal."}
                  </p>

                  <p>
                    With a strong focus on sustainable farming and strict quality checks at every
                    stage, this rice ensures purity you can trust. The natural aroma, rich flavor,
                    and perfect texture make it an ideal choice for everyday meals and special
                    occasions.
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="text-white font-bold text-lg mb-4">Benefits</h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {benefits.map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 text-center flex flex-col items-center justify-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="flex justify-center mb-2">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-[86px] h-[86px] object-contain"
                          />
                        </div>

                        <h3 className="text-[20px] leading-tight font-semibold text-[#070707] mt-1">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 mt-1.5 text-[14px]  font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "nutritional" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">
                  Nutritional facts
                </h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <h3 className="font-bold text-[#1e1e1e] text-base mb-4">
                    Per 100g cooked serving
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left font-bold text-[#1e1e1e] pb-2">
                            Nutrient
                          </th>
                          <th className="text-left font-normal text-gray-600 pb-2">
                            Per 100g
                          </th>
                          <th className="text-left font-normal text-gray-600 pb-2">
                            Per 200g
                          </th>
                          <th className="text-left font-normal text-gray-600 pb-2">
                            % DV
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 font-bold text-[#1e1e1e]">
                            Energy
                          </td>
                          <td className="py-3 text-gray-700">130 kcal</td>
                          <td className="py-3 text-gray-700">260 kcal</td>
                          <td className="py-3 text-gray-700">13%</td>
                        </tr>

                        <tr className="border-b border-gray-100">
                          <td className="py-3 font-bold text-[#1e1e1e]">
                            Carbohydrates
                          </td>
                          <td className="py-3 text-gray-700">Per 100g</td>
                          <td className="py-3 text-gray-700">Per 200g</td>
                          <td className="py-3 text-gray-700">9%</td>
                        </tr>

                        <tr>
                          <td className="py-1.5 pl-4 text-gray-500">
                            of which sugars
                          </td>
                          <td className="py-1.5 text-gray-700">0.1g</td>
                          <td className="py-1.5 text-gray-700">Per 200g</td>
                          <td className="py-1.5 text-gray-700">—</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-1.5 pl-4 text-gray-500">
                            Dietary fibre
                          </td>
                          <td className="py-1.5 text-gray-700">1.8g</td>
                          <td className="py-1.5 text-gray-700">3.6g</td>
                          <td className="py-1.5 text-gray-700">6%</td>
                        </tr>

                        <tr className="border-b border-gray-100">
                          <td className="py-3 font-bold text-[#1e1e1e]">
                            Protein
                          </td>
                          <td className="py-3 text-gray-700">2.7g</td>
                          <td className="py-3 text-gray-700">5.4g</td>
                          <td className="py-3 text-gray-700">5%</td>
                        </tr>

                        <tr>
                          <td className="py-3 font-bold text-[#1e1e1e]">
                            Total fat
                          </td>
                          <td className="py-3 text-gray-700">0.3g</td>
                          <td className="py-3 text-gray-700">0.6g</td>
                          <td className="py-3 text-gray-700">0%</td>
                        </tr>

                        <tr>
                          <td className="py-1.5 pl-4 text-gray-500">
                            Saturated fat
                          </td>
                          <td className="py-1.5 text-gray-700">0.1g</td>
                          <td className="py-1.5 text-gray-700">0.2g</td>
                          <td className="py-1.5 text-gray-700">0%</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-1.5 pl-4 text-gray-500">
                            Trans fat
                          </td>
                          <td className="py-1.5 text-gray-700">0g</td>
                          <td className="py-1.5 text-gray-700">0g</td>
                          <td className="py-1.5 text-gray-700">—</td>
                        </tr>

                        <tr>
                          <td className="py-3 font-bold text-[#1e1e1e]">
                            Sodium
                          </td>
                          <td className="py-3 text-gray-700">1mg</td>
                          <td className="py-3 text-gray-700">2mg</td>
                          <td className="py-3 text-gray-700">0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-500 text-xs mt-5">
                    % Daily Values (DV) based on 2000 kcal diet. Values are
                    approximate and may vary by batch.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 mt-6">
                  <h3 className="font-bold text-[#1e1e1e] text-base mb-5">
                    Micronutrients (per 100g cooked)
                  </h3>

                  <div className="space-y-4">
                    {micronutrients.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 text-sm"
                      >
                        <span className="w-28 flex-shrink-0 text-[#1e1e1e] font-medium">
                          {item.label}
                        </span>

                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>

                        <span className="w-16 flex-shrink-0 text-right text-gray-700 font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">
                  Sourcing &amp; origin
                </h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <h3 className="font-bold text-[#1e1e1e] text-lg text-center">
                    Complete ingredient list
                  </h3>

                  <p className="text-gray-600 text-sm text-center mt-2 max-w-3xl mx-auto">
                    100% Jeera Parboiled Rice (Oryza sativa L.) — Single
                    ingredient. No additives, no preservatives, no flavour
                    enhancers, no fortification agents.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Origin</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">
                        Champaran, Bihar
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Single-district origin. Full traceability.
                      </p>
                    </div>

                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Farming method</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">
                        Traditional, non GMO
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Natural irrigation, minimal inputs
                      </p>
                    </div>

                    <div className="lg:border-r border-gray-200 lg:pr-6">
                      <p className="text-gray-500 text-sm">Processing unit</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">
                        Ripuraj Agro, Bihar
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        ISO 22000 certified facility
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Harvest season</p>
                      <p className="font-bold text-[#1e1e1e] mt-1">
                        Kharif (Oct–Nov)
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        Current stock: 2025 harvest
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-white font-bold text-2xl mt-10 mb-5">
                  Parboiling process
                </h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        step: "1",
                        title: "Soaking",
                        desc: "Paddy soaked in water to initiate gelatinisation",
                      },
                      {
                        step: "2",
                        title: "Steaming",
                        desc: "Steam treatment locks vitamins into the grain core",
                      },
                      {
                        step: "3",
                        title: "Drying",
                        desc: "Solar-assisted drying to reduce moisture uniformly",
                      },
                      {
                        step: "4",
                        title: "Milling",
                        desc: "Gentle milling removes husk while preserving bran nutrients",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-[#2e6378] flex items-center justify-center mb-4">
                          <span className="text-white text-3xl font-bold">
                            {item.step}
                          </span>
                        </div>

                        <h4 className="font-bold text-[#1e1e1e] text-base">
                          {item.title}
                        </h4>

                        <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quality report" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">
                  Quality report
                </h2>

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
                      <div
                        key={i}
                        className="border border-gray-200 rounded-xl p-5"
                      >
                        <div className="text-3xl mb-4">{item.emoji}</div>

                        <h4 className="font-bold text-[#1e1e1e] text-base">
                          {item.title}
                        </h4>

                        <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div>
                <h2 className="text-white font-bold text-2xl mb-5">FAQ</h2>

                <div className="bg-white rounded-2xl p-6 sm:p-8">
                  <div className="space-y-4">
                    {[
                      {
                        q: "What is parboiled rice and how is it different from regular white rice?",
                        a: "Parboiled rice is partially boiled in the husk before milling. This forces nutrients from the bran into the grain, making it more nutritious than regular white rice while still having the appearance of white rice. It also has a firmer texture and lower glycaemic index.",
                      },
                      {
                        q: "Is this rice suitable for diabetics?",
                        a: "Yes. Parboiled rice has a significantly lower glycaemic index (around 38–55 vs 70+ for white rice) because of resistant starch formed during parboiling. It causes a slower blood sugar rise, making it a better option for diabetics. Always consult your doctor for personalised dietary advice.",
                      },
                      {
                        q: "How should I store the rice after opening the pack?",
                        a: "Transfer to an airtight container and store in a cool, dry place away from direct sunlight. Properly stored, it stays fresh for up to 12 months after opening. Avoid storing near strong-smelling spices as rice can absorb odours.",
                      },
                      {
                        q: "Can I use this rice for biryani and pulao?",
                        a: "Yes — the Jeera variety is specifically chosen for its long, slender grains that stay separate after cooking. It is excellent for biryani, pulao, fried rice, and khichdi. Reduce the water ratio slightly (1:1.5) when cooking with a lot of liquid-rich ingredients.",
                      },
                      {
                        q: "Is this rice fortified with vitamins or minerals?",
                        a: "No. Ripuraj rice contains no added fortification agents or synthetic vitamins. The nutrients present are entirely natural — retained through the parboiling process. We believe in clean-label food with no unnecessary additives.",
                      },
                      {
                        q: "What is the difference between the 5kg, 10kg, and 20kg packs?",
                        a: "All three packs contain identical rice from the same batch. The difference is only in pack size and price per kg. The 20kg pack offers the best value at roughly ₹58/kg vs ₹68/kg for the 5kg pack. Larger packs are heat-sealed with a reinforced woven bag for longer freshness.",
                      },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="border border-gray-200 rounded-lg px-5 py-3 focus-within:border-blue-400 hover:border-blue-300 transition-colors">
                          <h4 className="font-bold text-[#1e1e1e] text-[15px]">
                            {item.q}
                          </h4>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed px-5 mt-2">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "details" &&
              activeTab !== "nutritional" &&
              activeTab !== "ingredients" &&
              activeTab !== "quality report" &&
              activeTab !== "faq" && (
                <div className="text-white/85 text-sm pt-2">Content coming soon...</div>
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
                {Math.round(product.rating || 5)}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#facc15" className="text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-1">100 reviews</p>
          </div>

          <div className="flex items-center gap-2">
            {["All", "5★", "4★"].map((filter) => (
              <button
                key={filter}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className={`bg-gray-50 rounded-lg p-5 transition-shadow hover:shadow-md ${
                  i === 1 ? "border-2 border-blue-400" : ""
                }`}
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={13} fill="#facc15" className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mt-1">
                      <span className="text-gray-700">9***7</span>{" "}
                      <span className="text-[#2c5c43] font-medium">
                        Verified Purchase
                      </span>
                    </p>
                  </div>

                  <span className="text-gray-400 text-xs">4 weeks ago</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever.Lorem Ipsum is simply dummy text of
                  the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever.Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className="w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 hover:scale-110 active:scale-95 text-gray-700 text-xs font-semibold transition-all"
            >
              {page}
            </button>
          ))}
        </div>
      </Reveal>

      {/* ================= MORE RECOMMENDED PRODUCTS ================= */}
      {recommended.length > 0 && (
        <Reveal className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1e1e1e] mb-8">
            More Recommended Products
          </h2>

          <div
            ref={scrollRef}
            onScroll={handleRecommendedScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          >
            {recommended.slice(0, 8).map((item) => (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                className="group flex-shrink-0 w-[220px] sm:w-[240px] snap-start"
              >
                <div className="relative w-full h-[220px] bg-[#EDEEF0] rounded-lg overflow-hidden">
                  <Image
                    src={item.main_image}
                    alt={item.name}
                    fill
                    unoptimized
                    sizes="240px"
                    className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-3 text-[#2f5f73] font-semibold text-sm leading-snug line-clamp-2 min-h-[38px] group-hover:underline">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.weights?.length > 0
                    ? item.weights.length === 1
                      ? `${parseFloat(item.weights[0].weight)}Kg`
                      : `${parseFloat(
                          item.weights[0].weight
                        )}Kg - ${parseFloat(
                          item.weights[item.weights.length - 1].weight
                        )}Kg`
                    : "5Kg - 20Kg"}
                </p>
              </Link>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div className="h-1.5 bg-gray-200 rounded-full mt-6 max-w-md mx-auto overflow-hidden">
            <div
              className="h-full bg-[#2e6378] rounded-full transition-all duration-150"
              style={{
                width: `${Math.max(15, scrollProgress)}%`,
              }}
            />
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
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-10 bg-white rounded-full p-2 shadow hover:scale-110 active:scale-95 transition-transform"
            >
              <X size={28} />
            </button>

            <div className="relative w-full h-full">
              {images[selectedImageIndex] && (
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-8"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}