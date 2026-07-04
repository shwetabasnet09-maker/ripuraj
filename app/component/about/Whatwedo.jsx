import Image from "next/image";

const features = [
  {
    title: "Biodynamic Food",
    image: "/icons/biodynamic.png",
  },
  {
    title: "Organic Gardening",
    image: "/icons/gardening.png",
  },
  {
    title: "Organic Food Certification",
    image: "/icons/certification.png",
  },
];

const WhatWeDo = () => {
  return (
    <section className="w-full bg-[#fafafa] py-14 overflow-hidden relative">
      {/* Side Decorations */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 opacity-60">
        <Image
          src="/paisley-left.png"
          alt="Decoration"
          width={90}
          height={180}
        />
      </div>

      <div className="hidden lg:block absolute right-0 top-16 opacity-60">
        <Image
          src="/paisley-right.png"
          alt="Decoration"
          width={90}
          height={180}
        />
      </div>

      <div className="wrapper px-4">
        {/* Heading */}
        <h2
          className="font-black text-center text-[#2d5f73] mb-4"
          style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}
        >
          What We Do
        </h2>

        {/* Description */}
        <p className="max-w-5xl mx-auto text-center text-gray-700 leading-relaxed mb-10 text-sm md:text-[15px]">
          At Ripuraj Agro Pvt. Ltd., we specialize in the production,
          milling, refinement, and delivery of high-quality rice across
          various segments of society and multiple states. Our premium
          basmati and non-basmati rice varieties offer the perfect blend
          of taste, nutrient content, and texture.
        </p>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-5 items-center">
          
          {/* Left Cards */}
          <div className="flex lg:flex-col gap-3 justify-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 
                p-4 flex flex-col items-center justify-center text-center 
                min-h-[135px] w-full hover:shadow-md transition"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="object-contain mb-3"
                />

                <h3 className="font-bold text-gray-800 text-sm leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="rounded-[24px] overflow-hidden shadow-md">
            <Image
              src="/what-we-do.png"
              alt="Rice processing plant"
              width={1400}
              height={750}
              priority
              className="w-full h-[230px] sm:h-[320px] lg:h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;