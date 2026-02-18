const WhyChooseUs = () => {
  return (
    <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">
      
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
          
          <p className="uppercase tracking-widest text-xs mb-3 opacity-90">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5">
            Quality You Can Trust
          </h2>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-8">
            Our fully automated plant ensures zero hand-touch production with
            strict hygiene standards. We use pure Gangetic basin water and
            organic paddy to preserve natural taste and quality. With automated
            milling, time-efficient processes, and secure storage, we focus on
            delivering rice with superior sensory quality. Backed by strong
            sales and customer support, our solutions are always within your
            reach.
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
