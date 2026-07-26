import Image from "next/image";

const features = [
  {
    title: "Biodynamic Food",
    image: "/Biodynamic Food.svg",
  },
  {
    title: "Organic Gardening",
    image: "/Organic Gardening.svg",
  },
  {
    title: "Organic Food Certification",
    image: "/Organic Food Certification.svg",
  },
];

const WhatWeDo = () => {
  return (
    <section className="w-full bg-[#fafafa] py-14 overflow-hidden relative">
      {/* Side Decorations */}
      {/* <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 opacity-80">
        <Image
          src="/Left Pic.svg"
          alt="Decoration"
          width={90}
          height={180}
        />
      </div>

      <div className="hidden lg:block absolute right-0 top-16 opacity-80">
        <Image
          src="/Right Pic.svg"
          alt="Decoration"
          width={90}
          height={180}
        />
      </div> */}

      <div className="wrapper px-4">
        {/* Heading */}
        <h2
          className="font-bold text-center text-[#2d5f73] mb-4"
          style={{ fontSize: "35px" }}
        >
          What Defines Ripuraj 
        </h2>

        {/* Description */}
        <p className="max-w-full mx-auto text-center text-gray-700 leading-relaxed mb-10 text-sm md:text-[15px]">
        At Ripuraj Agro, we transform carefully selected paddy into rice that's trusted for its purity, consistency, and exceptional taste. From sourcing and advanced milling to quality assurance and packaging, every step is guided by one commitment—to deliver rice that families enjoy and businesses rely on.
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
              src="/About Us section.webp"
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