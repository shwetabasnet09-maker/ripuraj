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
  HeartPulse,
  Wheat,
  Droplets,
  Soup,
  ChevronRight,
  Wallet,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ProductDetail({ params }) {
  const { slug } = React.use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setProduct("not-found");
          return;
        }

        const data = await res.json();

        setProduct(data);

        const galleryImages = [
          data.main_image,
          ...(data.images?.map((img) => img.image) || []),
        ].filter(Boolean);

        setImages(galleryImages);

        if (data.weights && data.weights.length > 0) {
          setSelectedWeight(data.weights[0]);
        }

        setQuantity(1);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error(error);
        setProduct("not-found");
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
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

      const res = await fetch(`${API_BASE_URL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        alert("Added to cart ✅");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-[#2e6378] animate-spin"></div>
      </div>
    );
  }

  if (product === "not-found" || !product) return notFound();

  const currentUnitPrice = Number(selectedWeight?.price || product.price || 0);

  const totalPrice = currentUnitPrice * quantity;

  const benefits = [
    {
      title: "Nutrient-Rich",
      desc: "Contains essential vitamins, iron, and magnesium.",
      img: "/benefits/nutrient-rich.png",
    },
    {
      title: "Energy Source",
      desc: "High in complex carbohydrates for sustained energy.",
      icon: <Wheat size={30} strokeWidth={1.6} />,
    },
    {
      title: "Digestive Health",
      desc: "Easy to digest, aiding a healthy digestive system.",
      icon: <Droplets size={30} strokeWidth={1.6} />,
    },
    {
      title: "Heart Health",
      desc: "Naturally low in fat supporting cardiovascular wellness.",
      icon: <HeartPulse size={30} strokeWidth={1.6} />,
    },
  ];

  return (
    <div className="w-full bg-white pt-24 md:pt-28">
      {/* ================= BREADCRUMB ================= */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
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
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= LEFT IMAGE ================= */}
          <div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative bg-[#f5f5f5] rounded-sm border border-gray-200 aspect-square flex items-center justify-center cursor-zoom-in overflow-hidden"
            >
              {images[selectedImageIndex] && (
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain p-10 hover:scale-105 transition duration-300"
                />
              )}
            </div>

            <div className="flex gap-4 mt-5 overflow-x-auto scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative min-w-[110px] h-[110px] rounded-2xl overflow-hidden border-2 bg-[#f7edd6] transition-all ${
                    selectedImageIndex === i
                      ? "border-[#2e6378]"
                      : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="thumb" fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT INFO ================= */}
          <div className="pt-1">
            <h1 className="text-[30px] md:text-[30px] font-bold text-[#1c2b22] leading-snug">
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
              <h2 className="text-[22px] font-bold text-[#1b1b1b]">
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
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        selectedWeight?.weight === w.weight
                          ? "bg-[#2e6378] text-white"
                          : "bg-[#e7e7e7] text-[#47606d]"
                      }`}
                    >
                      {w.weight}
                    </button>
                  ))}

                  <button className="text-red-400 font-semibold text-sm">Clear</button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                >
                  <Minus size={14} />
                </button>

                <span className="w-9 text-center font-bold text-sm">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
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
                className="h-[42px] rounded-md bg-[#2e6378] hover:bg-[#234d5d] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                AddTo Cart
              </button>

              <button
                onClick={() => handleAction("buy")}
                disabled={buttonLoading}
                className="h-[42px] rounded-md bg-[#f3e7c9] hover:bg-[#e8d7ab] text-[#8d7a42] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <CreditCard size={16} />
                Buy Now
              </button>
            </div>

            <div className="border border-gray-300 mt-5 p-4 rounded-sm max-w-md">
              <div className="flex items-center gap-4">
                <img
                  src="/Google Pay.png"
                  alt="Google Pay"
                  className="w-11 h-11 object-contain"
                />

                <div className="w-px h-8 bg-gray-200" />

                <img
                  src="/Phone Pay.png"
                  alt="PhonePe"
                  className="w-11 h-11 object-contain"
                />

                <div className="w-px h-8 bg-gray-200" />

                <img
                  src="/CRED.png"
                  alt="CRED"
                  className="w-11 h-11 object-contain"
                />

                <div className="w-px h-8 bg-gray-200" />

                <img
                  src="/amazon-pay.png"
                  alt="Amazon Pay"
                  className="w-11 h-11 object-contain"
                />

                <div className="w-px h-8 bg-gray-200" />

                <img
                  src="/PTM.png"
                  alt="Paytm UPI"
                  className="h-11 w-auto object-contain"
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
                className="bg-[#d9eadf] text-[#2c5c43] px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-[#c8ddd0] transition-colors"
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
                className="bg-[#e9e8f7] text-[#5a5782] px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-[#dcdaf2] transition-colors cursor-pointer"
              >
                Share Link
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM TABS SECTION ================= */}
      <div className="w-full bg-[#2e6378] mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-6 border-b border-white/20 pb-2">
            {["details", "nutritional", "ingredients", "quality report", "how to cook", "faq"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize text-sm font-medium transition-all ${
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

          <div className="mt-5">
            {activeTab === "details" && (
              <div className="space-y-3 text-white/85 text-sm leading-6">
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
            )}

            {activeTab !== "details" && (
              <div className="text-white/85 text-sm pt-2">Content coming soon...</div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-white font-bold text-lg mb-4">Benefits</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 text-center flex flex-col items-center justify-start"
                >
                  <div className="flex justify-center text-[#2e6378] mb-2">
                    {item.icon}
                  </div>

                  <h3 className="text-[13px] leading-tight font-bold text-[#1e1e1e] mt-1">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1.5 text-[11px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-5"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-5xl w-full h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-10 bg-white rounded-full p-2 shadow"
            >
              <X size={28} />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
