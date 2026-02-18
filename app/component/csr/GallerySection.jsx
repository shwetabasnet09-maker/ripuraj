import React from 'react';

const GallerySection = () => {
  // Dynamic Data Array - Add or remove objects to update the gallery
  const moments = [
    {
      id: 1,
      title: "The Power",
      subtitle: "OF PRESENCE",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000", // Replace with your actual image
      isLarge: true,
    },
    {
      id: 2,
      title: "Empathy",
      subtitle: "At The Core",
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
      isLarge: true,
    },
    {
      id: 3,
      title: "Creative",
      subtitle: "Engagement",
      img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000",
      isLarge: true,
    },
    {
      id: 4,
      title: "Community Support",
      img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
      isLarge: false,
    },
    {
      id: 5,
      title: "Sharing Smiles",
      img: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=1000",
      isLarge: false,
    },
    {
      id: 6,
      title: "Positive Impact",
      img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000",
      isLarge: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-white font-sans">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D5A71] text-center mb-12">
        Moments of Kindness
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moments.map((item) => (
          <div
            key={item.id}
            className={`relative group overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.02] ${
              item.isLarge ? "h-[500px]" : "h-[250px]"
            }`}
          >
            {/* Main Image */}
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

            {/* Logo Placeholder (Top Left) */}
            <div className="absolute top-4 left-4 bg-[#2D4356] px-2 py-1 flex items-center gap-1 rounded-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-[10px] text-white font-bold tracking-tighter">RIPURAJ</span>
            </div>

            {/* Text Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              {item.subtitle ? (
                <>
                  <h3 className="text-white text-5xl md:text-6xl font-bold leading-none">
                    {item.title.split(' ')[0]} <br />
                    <span className="text-yellow-400 italic font-serif font-normal text-4xl">
                      {item.title.split(' ')[1] || ""}
                    </span>
                  </h3>
                  <p className="text-white text-sm font-bold tracking-[0.2em] mt-2">
                    {item.subtitle}
                  </p>
                </>
              ) : (
                <h3 className="text-yellow-400 text-3xl font-bold px-4">
                  {item.title}
                </h3>
              )}
            </div>

            {/* CSR Badge (Bottom Right) */}
            {item.isLarge && (
              <div className="absolute bottom-4 right-4 text-right">
                <p className="text-yellow-400 font-bold text-lg leading-none">CSR</p>
                <p className="text-white text-[8px] tracking-[0.2em] uppercase">Activities</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;