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
    <div className="w-full wrapper px-4 py-20">
      {/* Header div */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
            PRODUCT
          </p>
          <h2 className="text-3xl sm:text-4xl text-[#3A6B7E] font-semibold">
            Ripuraj Finest Products
          </h2>
        </div>

        <div className="flex items-center gap-6 mt-6 sm:mt-0">
          <button className="bg-[#3A6B7E] text-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-[#2D5B70] transition-colors uppercase">
            VIEW ALL PRODUCT
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l10-10M17 17V7H7" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="text-gray-600 hover:text-black transition-colors"
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
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          type: 'progressbar',
          el: '.custom-pagination-scrollbar',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Progress Bar (matching the bottom line in the image) */}
      <div className="relative w-full h-[2px] bg-gray-200 mt-4">
        <div className="custom-pagination-scrollbar absolute top-0 left-0 h-full  transition-all duration-300" ></div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-[#F8F9FA] rounded-sm flex items-center justify-center aspect-[4/5] mb-4 overflow-hidden p-6 transition-secondary">
         <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
           <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain" 
            />
         </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[#3A6B7E] font-bold text-lg leading-snug hover:underline">
          {product.name}
        </h3>
        <p className="text-gray-600 font-medium text-sm">
          {product.weight}
        </p>
      </div>
    </div>
  );
};

export default Shop;