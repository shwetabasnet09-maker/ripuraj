import {
    Factory,
    Cog,
    Warehouse,
    BadgeCheck,
  } from "lucide-react";
  
  const services = [
    {
      icon: Factory,
      title: "Fully automated plant — zero hand-touch",
      description:
        "Our processing facility operates with full automation from paddy intake to packed product. No human hand contacts the rice at any stage, ensuring absolute hygiene and consistency across every batch.",
      badge: "FULLY AUTOMATED",
    },
    {
      icon: Cog,
      title: "Time-efficient production — from paddy to pack",
      description:
        "Our streamlined production process takes paddy from farm intake to finished, hygienically packed rice with no unnecessary delays, ensuring freshness and nutritional integrity.",
      badge: "EFFICIENT PROCESS",
    },
    {
      icon: Warehouse,
      title: "Comfortable storage — 2,00,000 MT capacity",
      description:
        "Our warehousing facility maintains optimal grain conditions including temperature, moisture, and pest control to preserve freshness until delivery.",
      badge: "LARGE STORAGE",
    },
    {
      icon: BadgeCheck,
      title: "Quality inspection at every stage",
      description:
        "Every grain is inspected for purity, moisture, size, and consistency before processing, ensuring premium quality reaches every customer.",
      badge: "QUALITY CHECKED",
    },
  ];
  
  export default function WhatWeDo() {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
  
          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
  
            <div>
              <span className="inline-block bg-[#3F6C84] text-white px-6 py-2 rounded-xl text-sm font-semibold tracking-wide">
                WHAT WE DO
              </span>
  
              <h2 className="mt-5 text-[35px] lg:text-[35px] font-bold leading-tight">
                Specialising In Every Stage
                <br />
                <span className="text-[#3F6C84]">
                  Field to Family
                </span>
              </h2>
            </div>
  
            <p className="text-gray-700 text-[15px] leading-5 mt-2">
              At Ripuraj Agro Pvt. Ltd., we specialise in the production,
              milling, refinement, and delivery of high-quality rice across
              multiple states—basmati and non-basmati varieties with the perfect
              blend of taste, nutrition, and texture.
            </p>
  
          </div>
  
          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {services.map((item, index) => (
              <ServiceCard key={index} {...item} />
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  
  function ServiceCard({
    icon: Icon,
    title,
    description,
    badge,
  }) {
    return (
      <div className="border border-gray-200 rounded-[30px] p-8 hover:shadow-xl transition duration-300">
  
        <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-5">
          <Icon className="w-10 h-10 text-[#3F6C84]" />
        </div>
  
        <h3 className="text-[22px] font-bold text-[#3F6C84] leading-snug">
          {title}
        </h3>
  
        <p className="mt-3 text-gray-700 tect-[14px] leading-5">
          {description}
        </p>
  
        <span className="inline-block mt-4 bg-[#3F6C84] text-[#FFF2D9] px-6 py-2 rounded-full text-[15px] font-medium tracking-wide">
          {badge}
        </span>
  
      </div>
    );
  }