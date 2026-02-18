import React from 'react';

const CSRSection = () => {
  // Dynamic Data Object
  const content = {
    sectionTag: "CORPORATE SOCIAL RESPONSIBILITY",
    mainTitle: "Ripuraj Agro’s Commitment to Community Upliftment",
    introText: "At Ripuraj, we believe a brand is more than just a product it’s a part of the community. Our journey isn’t just about delivering quality rice, it’s about building heartfelt connections and giving back to the people who make us who we are. Through our CSR efforts, we aim to spread kindness, respect, and care because every little act of love counts..",
    
    card: {
      title: "Sharing with Dignity",
      description: "We recently had the honour of visiting Mehar Mamta Niwas, a home for elderly women filled with love, wisdom, and quiet strength. The Ripuraj team carried along more than just rice — we brought warmth, conversations, and the feeling of being seen. It wasn't a big event. No stage, no spotlight. Just real people sitting together, listening, smiling, and sharing.",
      cta: "VIEW GALLERY",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop", // Replace with your actual image
      overlayBadge: {
        script: "Together",
        bold: "WE BUILD",
        sub: "A KINDER WORLD"
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 bg-white font-sans text-[#2D4356]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <span className="text-[20px] font-medium  text-black uppercase mb-3">
            {content.sectionTag}
          </span>
          <h2 className="text-4xl md:text-[35px] font-bold text-[#315A6F] leading-[1.1]">
            {content.mainTitle}
          </h2>
        </div>
        <div className="md:w-1/2 ">
          <p className="text-[14px] leading-relaxed text-black mb-4 text-right">
            {content.introText}
          </p>
          
        </div>
      </div>

      {/* Main Feature Card */}
      <div className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-2xl min-h-[500px]">
        {/* Left Content Column */}
        <div className="bg-[#315A6F] text-white p-10 md:p-16 flex-1 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            {content.card.title}
          </h3>
          <p className="text-blue-50/80 text-sm leading-relaxed mb-10 max-w-md">
            {content.card.description}
          </p>
          <button className="w-fit bg-white text-[#315A6F] px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-gray-100 transition-all active:scale-95">
            {content.card.cta}
          </button>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 relative min-h-[400px]">
          <img 
            src={content.card.image}
            alt="CSR Activity"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle dark gradient overlay for text readability */}
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
  );
};

export default CSRSection;