"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const Shop = () => {
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // The API doesn't return a top-level "weights" array — pricing tiers
  // live under "customer" (and "reseller"), each entry shaped like
  // { weight: "5Kg", retail_price: 667 }. Use "customer" here since
  // this is the public homepage carousel (retail view).
  const productsWithWeight = products.map((product) => {
    const nums = (product.customer || [])
      .map((w) => parseFloat(w.weight))
      .filter((n) => !isNaN(n));

    let weightDisplay = "";
    if (nums.length === 1) {
      weightDisplay = `${nums[0]}Kg`;
    } else if (nums.length > 1) {
      weightDisplay = `${nums[0]}Kg - ${nums[nums.length - 1]}Kg`;
    }

    return { ...product, weightDisplay };
  });

  return (
    <div className="relative w-full mx-auto px-5 lg:px-4 py-10 lg:py-20 bg-[url('/shopsection.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-10 wrapper">
          <div>
            <p className="text-xs lg:text-sm font-bold text-white uppercase tracking-tighter mb-1">
              SHOP
            </p>
            <h2 className="text-2xl lg:text-[35px] text-white font-semibold tracking-tight">
              High Quality Products
            </h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-4 mt-4 sm:mt-0">
            <Link
              href="/shop"
              className="bg-white text-[#3A6B7E] px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 text-xs lg:text-base whitespace-nowrap"
            >
              SHOP NOW
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lg:w-5 lg:h-5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {productsWithWeight.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="hidden lg:block">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{ 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          >
            {productsWithWeight.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

// Safely checks if an image path is genuinely usable — catches empty
// strings, whitespace-only strings, null, undefined, and known-broken
// characters like pipes, all in one place.
function getSafeImageSrc(rawValue) {
  if (!rawValue) return null;
  if (typeof rawValue !== "string") return null;

  const trimmed = rawValue.trim();
  if (trimmed === "") return null;
  if (trimmed.includes("|")) return null;

  return trimmed;
}

const ProductCard = ({ product }) => {
  // The list endpoint returns the cover image on "image", not
  // "main_image" — fall back to whichever is present.
  const safeSrc = getSafeImageSrc(product.main_image || product.image);

  return (
    <div className="group bg-white rounded-xl lg:rounded-[16px] border border-[#e3ecf0] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/shop/${product.slug}`} className="cursor-pointer block p-3 lg:p-5 pb-0">
        <div className="relative w-full h-[130px] sm:h-[150px] lg:h-[220px] rounded-lg lg:rounded-2xl overflow-hidden border border-[#2f5f73]/20 bg-gray-100">
          {safeSrc ? (
            <Image
              src={safeSrc}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 540px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 lg:p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-[#3A6B7E] font-semibold text-xs lg:text-[16px] leading-tight mb-2 lg:mb-4 line-clamp-2 min-h-[32px] lg:min-h-[44px] hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center flex-wrap gap-1">
          <span className="text-gray-800 font-medium text-[11px] lg:text-sm">
            {product.weightDisplay}
          </span>
          <Link
            href={`/shop/${product.slug}`}
            className="bg-[#2f5f73] text-white px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all duration-300 hover:bg-[#244a5a] hover:shadow-md active:scale-95"
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;