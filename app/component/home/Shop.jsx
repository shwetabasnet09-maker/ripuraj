"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Ripuraj Sonashakti Premium Jeera Parboiled Rice",
    weight: "5Kg - 20Kg",
    image: "/mahashakti.jpg", 
  },
  {
    id: 2,
    name: "Ripuraj Mahashakti Jeera Rice",
    weight: "5Kg - 20Kg",
    image: "/mahashakti.jpg",
  },
  {
    id: 3,
    name: "Ripuraj Shaktijeera Premium Parboiled Rice",
    weight: "5Kg - 20Kg",
    image: "/mahashakti.jpg",
  },
  {
    id: 4,
    name: "Ripuraj Zayka Long Grain Basmati Rice",
    weight: "5Kg - 20Kg",
    image: "/mahashakti.jpg",
  },
  {
    id: 5,
    name: "Ripuraj Zayka Long Grain Basmati Rice",
    weight: "5Kg - 20Kg",
    image: "/mahashakti.jpg",
  },
];

const Shop = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full  mx-auto px-4 py-20">
      {/* Header div */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-10 wrapper">
        <div>
          <p className="text-sm font-bold text-gray-800 uppercase tracking-tighter mb-1">
            SHOP
          </p>
          <h2 className="text-4xl sm:text-5xl text-[#2D5B70] font-bold tracking-tight">
            High Quality Products
          </h2>
        </div>

        <div className="flex items-center gap-4 mt-6 sm:mt-0">
          <button className="bg-[#3A6B7E] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95">
            SHOP NOW
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#F6F5F2] rounded-[32px] p-2 flex flex-col overflow-hidden">
      
      <div className="relative w-full h-[280px] rounded-[24px] overflow-hidden mb-4">
        
        <div className="absolute inset-0  flex items-center justify-center">
             <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover p-4 rounded-[30px] w-[271px] h-[280px]" 
              />
        </div>
      </div>

      {/* Content div */}
      <div className="px-3 pb-4">
        <h3 className="text-[#3A6B7E] font-medium text-[15px] leading-tight mb-3 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-gray-900 font-semibold text-sm">
            {product.weight}
          </span>
          <button className="bg-[#3A6B7E] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-[#2D5B70]">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop