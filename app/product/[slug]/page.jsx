"use client";

import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "../../data/date";
import Link from "next/link";
import Bannermain from "../../component/global/Banner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ProductHighlight() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const product = products.find((p) => p.slug === slug);

  // Some products in the static list don't actually have a matching
  // entry in the real backend (so /shop/{slug} would 404 for them).
  // Check the real product list once, and only link to the specific
  // shop page if the slug is genuinely there — otherwise fall back to
  // the general /shop listing.
  const [hasShopPage, setHasShopPage] = useState(true);

  useEffect(() => {
    if (!product) return;
    let cancelled = false;

    async function checkShopPage() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/`, {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        const exists = list.some((p) => p.slug === product.slug);

        if (!cancelled) setHasShopPage(exists);
      } catch (err) {
        console.error("Failed to verify shop page:", err);
        // On failure, assume it exists rather than silently breaking
        // the button — worst case the user hits a 404 and can go back.
      }
    }

    checkShopPage();
    return () => {
      cancelled = true;
    };
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-14 text-xl">
        Product not found
      </div>
    );
  }

  const shopHref = hasShopPage ? `/shop/${product.slug}` : "/shop";

  return (
    <>
      {/* Breadcrumb */}
      <Bannermain backgroundImg="/About%20Banner.webp" title={product.name} />

      {/* Main Section */}
      <section className="w-full  bg-[#f5f5f5] py-14 px-4 md:px-14 font-sans relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT IMAGE */}
          <div className="relative bg-[#EDEDED] rounded-[40px] h-[564px] sm:h-[580px] lg:h-[580px] flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={564}
              height={580}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-[35px] lg:text-[35px] font-bold items-start text-[#3a6372]  leading-tight max-w-xl">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-1 text-lg max-w-xl leading-relaxed">
              {product.description}
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#3a6372]">
              Packaging Size Available Online
            </h3>

            {/* FEATURES */}
            <div className="mt-2 space-y-2 ">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <Check
                    className="text-[#3a6372] mt-1 flex-shrink-0"
                    size={26}
                    strokeWidth={3}
                  />

                  <div>
                    <h4 className="text-lg font-bold text-[#3a6372]">
                      {feature.title}
                    </h4>

                    <p className="text-gray-500">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WEIGHT OPTIONS */}
            {product.weights?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-8">
                {[...product.weights]
                  .sort((a, b) => {
                    // Convert each weight to grams for accurate sorting,
                    // regardless of whether it's written as KG or GM
                    // (e.g. "500GM" must sort below "1KG", not above it).
                    const toGrams = (w) => {
                      const num = parseFloat(w);
                      return /gm/i.test(w) ? num : num * 1000;
                    };
                    return toGrams(b) - toGrams(a);
                  })
                  .map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Image
                        src="/Weight.png"
                        alt="Weight"
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] object-contain"
                      />
                      <span className="text-[#1a1a1a] font-semibold text-base">
                        {w}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {/* BUTTON */}
            <Link
              href={shopHref}
              className="mt-5 inline-block bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold text-lg transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}