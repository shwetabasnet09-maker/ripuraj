"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Bannermain from "../component/global/Banner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Shop" />

      <div className="py-8 lg:py-16 px-4 bg-[#f5f5f5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <p className="text-center uppercase text-[10px] lg:text-sm tracking-widest text-gray-500 mb-2">
            Explore Our Products Range
          </p>

          <h1 className="text-center text-xl lg:text-4xl font-semibold text-[#2f5f73] mb-6 lg:mb-5">
            High Quality Ripuraj Premium Rice
          </h1>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#f8f6f1] rounded-xl lg:rounded-2xl p-2.5 lg:p-4 shadow-sm animate-pulse"
                >
                  <div className="rounded-lg lg:rounded-xl bg-gray-200 w-full h-[130px] lg:h-[250px]" />
                  <div className="mt-2.5 lg:mt-4 h-3 lg:h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="flex items-center justify-between mt-2.5 lg:mt-4">
                    <div className="h-2.5 lg:h-3 w-12 lg:w-16 bg-gray-200 rounded" />
                    <div className="h-6 lg:h-8 w-14 lg:w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
              {products.map((product) => {
                // NOTE: the /api/products/ list endpoint returns the
                // cover image on `product.image`, not `product.main_image`.
                // (`main_image` only appears on the product-detail endpoint
                // in some setups — fall back to `image` here so the grid
                // works regardless of which field is present.)
                const coverImage = product.main_image || product.image;

                return (
                  <div
                    key={product.slug}
                    className="group bg-[#f8f6f1] rounded-xl lg:rounded-2xl p-2.5 lg:p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <Link
                      href={`/shop/${product.slug}`}
                      className="relative block w-full h-[130px] lg:h-[250px] rounded-lg lg:rounded-xl overflow-hidden bg-gray-100"
                    >
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </Link>

                    <h3 className="mt-2.5 lg:mt-4 font-semibold text-[#2f5f73] text-xs lg:text-sm leading-snug line-clamp-2 min-h-[32px] lg:min-h-[40px]">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-2.5 lg:mt-4 gap-1">
                      <p className="text-[10px] lg:text-xs text-gray-500">
                        5Kg – 20Kg
                      </p>

                      <Link
                        href={`/shop/${product.slug}`}
                        className="bg-[#2f5f73] text-white text-[10px] lg:text-xs px-2.5 lg:px-4 py-1.5 lg:py-2 rounded whitespace-nowrap"
                      >
                        Add To Cart
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}