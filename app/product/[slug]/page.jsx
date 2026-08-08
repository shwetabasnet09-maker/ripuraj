
"use client";

import Image from "next/image";
import { Check } from "lucide-react";
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
      <div className="py-20 text-center text-xl">
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

          {/* Product Image */}
          <div className="bg-[#EDEDED] rounded-[40px] h-[560px] flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={550}
              height={550}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-[#3a6372]">
              {product.name}
            </h1>

            <p className="mt-5 text-gray-600 leading-8">
              {product.description}
            </p>

            {/* Product Weights */}
            {/* Product Weights */}
{weights.length > 0 && (
  <>
    <h3 className="mt-8 text-2xl font-bold text-[#3a6372]">
      Available Sizes
    </h3>

    <div className="mt-5 space-y-4">
      {[...weights]
        .sort((a, b) => Number(a.weight) - Number(b.weight))
        .map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/Weight.png"
                alt="Weight"
                width={22}
                height={22}
              />

              <span className="font-semibold text-lg">
                {item.weight} KG
              </span>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-[#3a6372]">
                ₹ {item.retail_price || item.wholesale_price}
              </p>

              {item.wholesale_min_quantity && (
                <p className="text-sm text-gray-500">
                  Min Qty: {item.wholesale_min_quantity}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  </>
)}

            {/* Nutritional */}
            {product.nutritional && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Nutritional Information
                </h3>

                <p className="text-gray-600">
                  {product.nutritional}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Ingredients
                </h3>

                <p className="text-gray-600">
                  {product.ingredients}
                </p>
              </div>
            )}

            {/* How to Cook */}
            {product.how_to_cook && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  How To Cook
                </h3>

                <p className="text-gray-600">
                  {product.how_to_cook}
                </p>
              </div>
            )}

            {/* Quality Report */}
            {product.quality_report && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Quality Report
                </h3>

                <p className="text-gray-600">
                  {product.quality_report}
                </p>
              </div>
            )}

            {/* FAQ */}
            {product.faq && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  FAQ
                </h3>

                <p className="text-gray-600">
                  {product.faq}
                </p>
              </div>
            )}

            <Link
              href={shopHref}
              className="mt-5 inline-block bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold text-lg transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Gallery */}
        {product.images?.length > 0 && (
          <div className="max-w-7xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-[#3a6372] mb-8">
              Product Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-xl overflow-hidden bg-white shadow"
                >
                  <Image
                    src={img.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}