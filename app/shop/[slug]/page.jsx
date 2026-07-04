"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/api/products/${slug}/`,
          {
            cache: "no-store",
          }
        );

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

  // ================= ACTION =================
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

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-[#2e6378] animate-spin"></div>
      </div>
    );
  }

  if (product === "not-found" || !product) return notFound();

  const currentUnitPrice = Number(
    selectedWeight?.price || product.price || 0
  );

  const totalPrice = currentUnitPrice * quantity;

  const benefits = [
    {
      title: "Nutrient-Rich",
      desc: "Contains essential vitamins, iron, and magnesium.",
      icon: <Soup size={52} strokeWidth={1.8} />,
    },
    {
      title: "Energy Source",
      desc: "High in complex carbohydrates for sustained energy.",
      icon: <Wheat size={52} strokeWidth={1.8} />,
    },
    {
      title: "Digestive Health",
      desc: "Easy to digest, aiding a healthy digestive system.",
      icon: <Droplets size={52} strokeWidth={1.8} />,
    },
    {
      title: "Heart Health",
      desc: "Naturally low in fat supporting cardiovascular wellness.",
      icon: <HeartPulse size={52} strokeWidth={1.8} />,
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ================= LEFT IMAGE ================= */}
          <div>
            {/* MAIN IMAGE */}
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

            {/* THUMBNAILS */}
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
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT INFO ================= */}
          <div className="pt-2">
            {/* TITLE */}
            <h1
              className="font-black text-[#1c2b22] leading-tight"
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#facc15"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-lg">
                {product.rating || 4.9} · 100 reviews
              </p>
            </div>

            {/* PRICE */}
            <div className="mt-5">
              <h2 className="text-[42px] font-black text-[#1b1b1b]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </h2>
            </div>

            {/* WEIGHT */}
            {product.weights?.length > 0 && (
              <div className="mt-10">
                <p className="text-[28px] font-bold text-[#24342c] mb-5">
                  Weight
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {product.weights.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-8 py-4 rounded-xl text-xl font-bold transition-all ${
                        selectedWeight?.weight === w.weight
                          ? "bg-[#2e6378] text-white"
                          : "bg-[#e7e7e7] text-[#47606d]"
                      }`}
                    >
                      {w.weight}
                    </button>
                  ))}

                  <button className="text-red-400 font-semibold text-lg">
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex items-center gap-5 mt-10">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>

                <span className="w-14 text-center font-bold text-2xl">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>

              <p className="text-xl">
                Availability{" "}
                <span className="text-[#e85d5d] font-semibold">
                  In Stock
                </span>
              </p>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => handleAction("cart")}
                disabled={buttonLoading}
                className="h-[64px] rounded-lg bg-[#2e6378] hover:bg-[#234d5d] text-white text-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={22} />
                AddTo Cart
              </button>

              <button
                onClick={() => handleAction("buy")}
                disabled={buttonLoading}
                className="h-[64px] rounded-lg bg-[#f3e7c9] hover:bg-[#e8d7ab] text-[#8d7a42] text-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <CreditCard size={22} />
                Buy Now
              </button>
            </div>

            {/* PAYMENT */}
            <div className="border border-gray-300 mt-8 p-6 rounded-sm">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="bg-white rounded-full px-4 py-2 shadow text-sm font-bold">
                  GPay
                </div>

                <div className="bg-white rounded-full px-4 py-2 shadow text-sm font-bold">
                  PhonePe
                </div>

                <div className="bg-white rounded-full px-4 py-2 shadow text-sm font-bold">
                  CRED
                </div>

                <div className="bg-white rounded-full px-4 py-2 shadow text-sm font-bold">
                  Amazon Pay
                </div>

                <div className="bg-white rounded-full px-4 py-2 shadow text-sm font-bold">
                  Paytm UPI
                </div>
              </div>
            </div>

            {/* SHARE */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="text-gray-500 font-medium">Share:</span>

              <button className="bg-[#d9eadf] text-[#2c5c43] px-6 py-2 rounded-full font-semibold">
                WhatsApp
              </button>

              <button className="bg-[#e9e8f7] text-[#5a5782] px-6 py-2 rounded-full font-semibold">
                Share Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM TABS SECTION ================= */}
      <div className="w-full bg-[#2e6378] mt-10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* TABS */}
          <div className="flex flex-wrap gap-10 border-b border-white/30 pb-4">
            {[
              "details",
              "nutritional",
              "ingredients",
              "quality report",
              "how to cook",
              "faq",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize text-[18px] font-medium transition-all ${
                  activeTab === tab
                    ? "text-white border-b-2 border-white pb-3"
                    : "text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-8">
            {activeTab === "details" && (
              <div className="space-y-8 text-white/90 text-[20px] leading-[42px]">
                <p>
                  {product.description ||
                    "Ripuraj Rice brings you carefully selected premium-quality grains that stand out for their taste, texture, and consistency. Every grain is handpicked with attention to detail ensuring quality in every meal."}
                </p>

                <p>
                  With a strong focus on sustainable farming and strict quality
                  checks at every stage, this rice ensures purity you can trust.
                  The natural aroma, rich flavor, and perfect texture make it an
                  ideal choice for everyday meals and special occasions.
                </p>
              </div>
            )}

            {activeTab !== "details" && (
              <div className="text-white text-lg pt-6">
                Content coming soon...
              </div>
            )}
          </div>

          {/* BENEFITS */}
          <div className="mt-20">
            <h2 className="text-white font-black text-[42px] mb-10">
              Benefits
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 text-center min-h-[320px] flex flex-col justify-center"
                >
                  <div className="flex justify-center text-black mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-[34px] leading-tight font-bold text-[#1e1e1e]">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-4 text-lg leading-8">
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