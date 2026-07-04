import React from "react";
import Image from "next/image";

const CSRSection = () => {
  // Dynamic Data Object
  const content = {
    sectionTag: "CORPORATE SOCIAL RESPONSIBILITY",
    mainTitle: "Ripuraj Agro’s Commitment to Community Upliftment",
    introText:
      "At Ripuraj, we believe a brand is more than just a product it’s a part of the community. Our journey isn’t just about delivering quality rice, it’s about building heartfelt connections and giving back to the people who make us who we are. Through our CSR efforts, we aim to spread kindness, respect, and care because every little act of love counts..",

    card: {
      title: "Sharing with Dignity",
      description:
        "We recently had the honour of visiting Mehar Mamta Niwas, a home for elderly women filled with love, wisdom, and quiet strength. The Ripuraj team carried along more than just rice — we brought warmth, conversations, and the feeling of being seen. It wasn't a big event. No stage, no spotlight. Just real people sitting together, listening, smiling, and sharing.",

      cta: "VIEW GALLERY",

      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop",

      overlayBadge: {
        script: "Together",
        bold: "WE BUILD",
        sub: "A KINDER WORLD",
      },
    },
  };

  return (
    <div className="relative overflow-hidden  py-20">

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

      <div className="max-w-7xl mx-auto p-6  font-sans text-[#2D4356] relative z-10">

        {/* Header Section */}
        <div className="gap-8 mb-12 text-center md:text-center">

          <div className="md:w-1/2 mx-auto">

            <span className="text-[20px] font-medium text-black uppercase mb-3 block">
              {content.sectionTag}
            </span>

            <h2 className="text-4xl md:text-[35px] font-bold text-[#315A6F] leading-[1.1]">
              {content.mainTitle}
            </h2>

          </div>
        </div>

        {/* Main Feature Card */}
        <div className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-2xl min-h-[500px]">

          {/* Left Content Column */}
        <div className="col-span-12 lg:col-span-7 bg-[#315A6F] px-8 md:px-14 py-14 text-white relative overflow-hidden">

 
 
  {/* Heading */}
  <h2 className="mt-5 text-[30px] leading-[1.1] font-extrabold">
    {content.card.title}
  </h2>

  {/* Description */}
  <p className="mt-6 max-w-[560px] text-[15px] text-[#E8EEF2]">
    {content.card.description}
  </p>

  {/* Button */}
  <button className="mt-8 w-fit bg-white text-[#315A6F] px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-gray-100 transition-all active:scale-95">
    {content.card.cta}
  </button>

  {/* Bottom Left Illustration */}
 <div className="absolute bottom-0 right-4 opacity-30 text-white">
  <Image
    src="/framer.svg"
    alt="Farmer Illustration"
    width={140}
    height={140}
    className="object-contain fill-white"
  />
</div>

</div>

          {/* Right Image Column */}
          <div className="flex-1 relative min-h-[400px]">

            <img
              src={content.card.image}
              alt="CSR Activity"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Bottom Left Badge Overlay */}
            <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">

              <span className="block text-yellow-400 font-serif italic text-2xl lowercase">
                {content.card.overlayBadge.script}
              </span>

              <span className="block text-4xl font-black tracking-tight leading-none uppercase">
                {content.card.overlayBadge.bold}
              </span>

              <span className="block text-[10px] tracking-[0.3em] font-medium mt-1 uppercase">
                {content.card.overlayBadge.sub}
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRSection;