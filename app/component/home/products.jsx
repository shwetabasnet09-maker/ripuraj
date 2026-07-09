"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    slug: "ripuraj-sonashakti-premium-jeera-parboiled-rice",
    name: "Ripuraj Sonashakti Premium Jeera Parboiled Rice",
    weight: "5Kg - 20Kg",
    image: "/Sonashakti Packet.webp",
  },
  {
    id: 2,
    slug: "ripuraj-mahashakti-jeera-rice",
    name: "Ripuraj Mahashakti Jeera Rice",
    weight: "5Kg - 20Kg",
    image: "/Mahashakti.png",
  },
  {
    id: 3,
    slug: "ripuraj-shaktijeera-premium-parboiled-rice",
    name: "Ripuraj Shaktijeera Premium Parboiled Rice",
    weight: "5Kg - 20Kg",
    image: "/Shaktijeera.png",
  },
  {
    id: 4,
    slug: "ripuraj-zayka-long-grain-basmati-rice",
    name: "Ripuraj Zayka Long Grain Basmati Rice",
    weight: "5Kg - 20Kg",
    image: "/Zayeka1.png",
  },
];

const Shop = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full bg-[url('/ProductSectionBG.png')] bg-cover bg-center bg-no-repeat py-20">
      <div className="wrapper px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <p className="text-white text-sm font-semibold tracking-[3px] uppercase mb-2">
              PRODUCT
            </p>
            <h2 className="text-white text-3xl sm:text-4xl font-bold">
              Ripuraj Finest Products
            </h2>
          </div>

          <div className="flex items-center gap-5 mt-6 sm:mt-0">
            <Link
              href="/products"
              className="bg-white text-[#3A6B7E] px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#2D5B70] hover:text-white transition"
            >
              VIEW ALL PRODUCT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17l10-10M17 17V7H7" />
              </svg>
            </Link>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-8 h-8 flex items-center justify-center text-white text-xl hover:opacity-70 transition"
              >
                ‹
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-8 h-8 flex items-center justify-center text-white text-xl hover:opacity-70 transition"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
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
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="cursor-pointer group">
        {/* Card */}
        <div className="relative h-[300px] bg-[#EDEEF0] rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 mix-blend-multiply"
          />
        </div>

        {/* Text */}
        <div className="mt-4">
          <h3 className="text-white font-bold text-[17px] leading-snug">
            {product.name}
          </h3>
          <p className="text-white/80 text-[15px] font-medium mt-1">
            {product.weight}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Shop;