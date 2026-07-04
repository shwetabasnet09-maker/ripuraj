"use client";

import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { products } from "@/app/data/date";
import Link from "next/link";
import Bannermain from "@/app/component/gobal/Banner";

export default function ProductHighlight() {
  const params = useParams();
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="text-center py-20 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
        <Bannermain backgroundImg="/aboutbanner.png" title="" />
      

      {/* Main Section */}
      <section className="w-full bg-[#f5f5f5] py-20 px-6 md:px-26 font-sans relative overflow-hidden">

        {/* Left Decorative Icon */}
        <div className="absolute top-0 left-0 w-32 md:w-44 opacity-80">
          <Image
            src="/leftpea.png"
            alt="left design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        {/* Right Decorative Icon */}
        <div className="absolute top-0 right-0 w-32 md:w-44 opacity-80 ">
          <Image
            src="/rightpea.png"
            alt="right design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

          {/* LEFT IMAGE */}
          <div className="rounded-[40px] flex items-center justify-center p-16 relative">
            <Image
              src={product.image}
              alt={product.name}
              width={360}
              height={520}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-[38px] lg:text-[46px] font-bold text-[#3a6372] leading-tight max-w-xl">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-6 text-lg max-w-xl leading-relaxed">
              {product.description}
            </p>

            <h3 className="mt-10 text-xl font-bold text-[#3a6372]">
              Packaging Size Available Online
            </h3>

            {/* FEATURES */}
            <div className="mt-6 space-y-6">
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

            {/* BUTTON */}
            <Link
              href="/shop"
              className="mt-12 inline-block bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold text-lg transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}