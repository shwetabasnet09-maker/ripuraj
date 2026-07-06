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

  return (
    <div className="relative w-full mx-auto px-4 py-20 bg-[url('/shopsection.jpg')] bg-cover bg-center bg-no-repeat">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 wrapper">
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-tighter mb-1">
              SHOP
            </p>
            <h2 className="text-[35px] text-white font-semibold tracking-tight">
              High Quality Products
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-6 sm:mt-0">
            <Link
              href="/shop"
              className="bg-white text-[#3A6B7E] px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95"
            >
              SHOP NOW
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={{
                  ...product,
                  weightDisplay: (() => {
                    const weights = product.weights?.map((w) => w.weight) || [];
                    if (weights.length === 0) return "";
                    if (weights.length === 1) return `${weights[0]}Kg`;
                    return `${weights[0]}Kg - ${weights[weights.length - 1]}Kg`;
                  })(),
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-[16px] border border-[#e3ecf0] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/shop/${product.slug}`} className="cursor-pointer block p-5 pb-0 h-77,5 "> 
        <div className="relative w-77.5 h-70 rounded-2xl item- overflow-hidden border justify border-[#2f5f73]/20">
          <Image
            src={product.main_image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 540px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-[#3A6B7E] font-semibold text-[16px] leading-tight mb-4 line-clamp-2 min-h-[44px] hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium text-sm">
            {product.weightDisplay}
          </span>
          <Link
            href={`/shop/${product.slug}`}
            className="bg-[#2f5f73] text-white px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:bg-[#244a5a] hover:shadow-md active:scale-95"
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shop;