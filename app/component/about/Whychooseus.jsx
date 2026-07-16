const WhyChooseUs = () => {
  return (
    <div className="relative w-full h-105 md:h-120 lg:h-130 overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/quality-rice-bg.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-lg text-white">
          
          <p className="uppercase tracking-widest text-1xs mb-3 opacity-90">
            Why Choose Us
          </p>

          <h2 className="text-[35px]  font-bold leading-tight mb-3">
          Excellence, Refined Through Every Step.

          </h2>

          <p className="text-sm md:text-[15px] text-gray-200 leading-relaxed mb-8">
          From sourcing to processing and packaging, every step is carefully monitored to preserve the purity, freshness, and natural goodness of our rice. It's this attention to detail that allows us to deliver a product our customers trust, time and time again.
          </p>

          <button className="bg-white text-[#0b2d3a] font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition">
            SHOP NOW
          </button>
        </div>
      </div>

    </div>
  );
};

export default WhyChooseUs;
