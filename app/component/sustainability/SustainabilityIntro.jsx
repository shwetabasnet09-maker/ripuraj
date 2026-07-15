import Image from "next/image";

const stats = [
  {
    value: "1,200",
    unit: "MT",
    desc: "Daily production capacity at Raxaul — one of India's largest",
  },
  {
    value: "2,00,000",
    unit: "MT",
    desc: "Total grain storage capacity at our facility",
  },
  {
    value: "15+",
    unit: "states",
    desc: "Ripuraj rice distributed across India",
  },
  {
    value: "Lakhs",
    unit: "",
    desc: "Of happy customers who trust every grain",
  },
];

const SustainabilityIntro = () => {
  return (
    <section className="relative py-16 md:py-20 px-4 bg-white overflow-hidden">
      {/* Decorative corner icon */}
      <div className="absolute top-0 right-0 w-40 md:w-56 opacity-90 pointer-events-none">
        <Image
          src="/rightpea.png"
          alt=""
          width={220}
          height={220}
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow + Heading */}
        <span className="inline-block bg-[#2f5f73] text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5">
          Sowing Excellence Since 2010
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight mb-10 max-w-2xl">
          <span className="text-[#1a1a1a]">Growing Rice That Is Good</span>
          <br />
          <span className="text-[#1a1a1a]">For </span>
          <span className="text-[#2f5f73]">Bihar And The Planet</span>
        </h2>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Image */}
          <div className="relative w-full h-[300px] sm:h-[452px] lg:h-[452px] rounded-2xl overflow-hidden">
            <Image
              src="/SuntainabilitySection.webp"
              alt="Rice growing sustainably in Bihar"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Text + Stats */}
          <div>
            <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed mb-8">
              Ripuraj Agro Pvt. Ltd. has spent 46+ years dedicated to rice and
              paddy production in East Champaran, Bihar — supporting local
              farmers and pioneering organic agriculture practices with 1,200
              MT/day production capacity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#2f5f73] rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white font-extrabold text-3xl sm:text-4xl">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-white/90 font-semibold text-lg">
                        {stat.unit}
                      </span>
                    )}
                  </div>

                  <p className="text-white/80 text-sm mt-3 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityIntro;
