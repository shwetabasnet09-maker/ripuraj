import React from "react";
import Image from "next/image";

const CSRSection = () => {
  const content = {
    sectionTag: "CORPORATE SOCIAL RESPONSIBILITY",
    mainTitleLine1: "Ripuraj Agro's Commitment to",
    mainTitleLine2: "Community Upliftment",
    card: {
      title: "Sharing with Dignity",
      description:
        "We recently had the honour of visiting Mehar Mamta Niwas, a home for elderly women filled with love, wisdom, and quiet strength. The Ripuraj team carried along more than just rice — we brought warmth, conversations, and the feeling of being seen. It wasn't a big event. No stage, no spotlight. Just real people sitting together, listening, smiling, and sharing.",
      cta: "VIEW GALLERY",
      image: "/CSR Section.webp",
      overlayBadge: {
        script: "Together",
        bold: "WE BUILD",
        sub: "A KINDER WORLD",
      },
    },
  };

  return (
    <div className="relative overflow-hidden py-14">
      {/* Left Decorative Icon */}
      {/* <div className="absolute top-0 left-0 w-32 md:w-44 opacity-80">
        <Image
          src="/leftpea.png"
          alt="left design"
          width={180}
          height={180}
          className="w-full h-auto"
        />
      </div> */}

      {/* Right Decorative Icon */}
      {/* <div className="absolute top-0 right-0 w-32 md:w-44 opacity-80">
        <Image
          src="/rightpea.png"
          alt="right design"
          width={180}
          height={180}
          className="w-full h-auto"
        />
      </div> */}

      <div className="max-w-7xl mx-auto font-objective text-[#2D4356] relative z-10">
        {/* Header Section */}
        <div className="gap-8 mb-12 text-center">
          <div className="md:w-1/2 mx-auto">
            <span className="text-[16px] md:text-[18px] font-semibold text-black uppercase mb-2 block tracking-wide">
              {content.sectionTag}
            </span>

            <h2 className="text-3xl md:text-[35px] font-bold leading-[1.2]">
              <span className="text-[#1a1a1a]">{content.mainTitleLine1}</span>
              <br />
              <span className="text-[#315A6F]">{content.mainTitleLine2}</span>
            </h2>
          </div>
        </div>

        {/* Main Feature Card */}
        <div className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-2xl min-h-[484px]">
          {/* Left Content Column */}
          <div className="col-span-12 lg:col-span-7 bg-[#315A6F] px-8 md:px-14 py-14 text-white relative overflow-hidden flex-1">
            <h2 className="mt-5 text-[35px] leading-[1.1] font-extrabold">
              {content.card.title}
            </h2>

            <p className="mt-6 max-w-[560px] text-[15px] text-[#E8EEF2]">
              {content.card.description}
            </p>

            <button className="mt-8 w-fit bg-white text-[#315A6F] px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-gray-100 transition-all active:scale-95">
              {content.card.cta}
            </button>

            {/* Bottom Left Illustration */}
            <div className="absolute bottom-0 left-8 opacity-30 text-white">
              <Image
                src="/framer.svg"
                alt="Farmer Illustration"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Image Column */}
          <div className="flex-1 relative min-h-[400px]">
            <Image
              src={content.card.image}
              alt="CSR Activity"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Bottom Left Badge Overlay */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRSection;
