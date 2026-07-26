import Image from "next/image";

const MissionVision = () => {
  return (
    <div
      className="py-16 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/ProductSectionBG.png')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[white] mb-3">
          Our Mission & Vision
        </h2>

        <p className="text-center max-w-3xl mx-auto text-white text-sm md:text-base mb-16">
        Our vision defines where we aspire to be, while our mission guides every decision we make along the way
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Vision */}
          <div className="relative bg-[white] text-[#2f5f73] rounded-2xl px-8 pt-16 pb-10 shadow-lg">
            
            {/* Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md">
              <Image
                src="/target.svg"
                alt="Vision icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <h3 className="text-center text-2xl font-semibold mb-4">
              Vision
            </h3>

            <p className="text-sm leading-relaxed text-black text-center">
            We envision Ripuraj as a brand that becomes a trusted part of every Indian kitchen and earns recognition across global markets for its quality and integrity. By embracing innovation, sustainable practices, and continuous improvement, we aim to redefine the rice experience while staying rooted in the values that have guided us for decades. Our vision is to create a future where every meal served with Ripuraj reflects excellence, trust, and a commitment to nourishing lives.

            </p>
          </div>

          {/* Mission */}
          <div className="relative bg-[white] text-[#2f5f73] rounded-2xl px-8 pt-16 pb-10 shadow-lg">
            
            {/* Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md">
              <Image
                src="/Binocular.svg"
                alt="Mission icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <h3 className="text-center text-2xl font-semibold mb-4">
              Mission
            </h3>

            <p className="text-sm leading-relaxed text-black text-center">
            Our mission is to deliver premium-quality rice through responsible sourcing, advanced processing, and uncompromising quality standards. We are committed to supporting farming communities, investing in modern technology, and maintaining the highest levels of food safety and consistency. Every grain we produce reflects our dedication to creating value for our customers, partners, and communities while preserving the trust that has been the foundation of Ripuraj for over four decades.

            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MissionVision;