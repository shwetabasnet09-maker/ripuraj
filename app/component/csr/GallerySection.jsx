import React from 'react';

const GallerySection = () => {
  // Dynamic Data Array - Add or remove objects to update the gallery
  const moments = [
    {
      id: 1,
      title: "The Power",
      subtitle: "OF PRESENCE",
      img: "Post1.jpg", // Replace with your actual image
      isLarge: true,
    },
    {
      id: 2,
      title: "Empathy",
      subtitle: "At The Core",
      img: "Post1@2x.jpg",
      isLarge: true,
    },
    {
      id: 3,
      title: "Creative",
      subtitle: "Engagement",
      img: "Post2_.jpg",
      isLarge: true,
    },
    {
      id: 4,
      title: "Community Support",
      img: "Post3.jpg",
      isLarge: false,
    },
    {
      id: 5,
      title: "Sharing Smiles",
      img: "Post3.jpg",
      isLarge: false,
    },
    {
      id: 6,
      title: "Positive Impact",
      img: "Post4.jpg",
      isLarge: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-white font-sans">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D5A71] text-center mb-3">
        Moments of Kindness
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moments.map((item) => (
          <div
            key={item.id}
            className={`relative group overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.02] ${
              item.isLarge ? "h-[500px]" : "h-[483px]"
            }`}
          >
            {/* Main Image */}
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          

          
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;