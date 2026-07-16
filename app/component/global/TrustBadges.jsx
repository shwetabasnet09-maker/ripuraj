import Image from "next/image";

export default function TrustBadges() {
  const brands = [
    { name: "Blinkit", src: "/blinkit.svg" },
    { name: "Smart Bazaar", src: "/smartbazaar.svg" },
    { name: "JioMart", src: "/jiomart.svg" },
    { name: "Swiggy Instamart", src: "/SwiggyLogo.png" },
    { name: "BigBasket", src: "/bigbasket.svg" },
  ];

  return (
    <div className="relative pt-10 lg:pt-16 pb-14 lg:pb-24 px-5 lg:px-6 text-center">
      <h2 className="text-[24px] leading-snug lg:text-[35px] lg:leading-normal font-bold text-black">
      Available Across India's {" "}
        <span className="text-[#2d5a6b]">Trusted Retail Network</span>
      </h2>

      <p className="text-gray-800 max-w-4xl mx-auto mt-3 lg:mt-4 text-sm lg:text-[17px] leading-relaxed">
      Whether you shop online or visit your neighbourhood store, your favourite Ripuraj products are always within reach through India's leading retail and grocery partners. 

      </p>

      <div className="mt-6 lg:mt-8 flex justify-center">
        <span className="bg-[#2d5a6b] text-white text-xs lg:text-sm font-medium px-4 lg:px-5 py-1.5 lg:py-2 rounded-full">
          Available At
        </span>
      </div>

      <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-14 gap-y-5 lg:gap-y-6">
        {brands.map((brand) => (
          <div key={brand.name} className="h-6 lg:h-10 flex items-center">
            <Image
              src={brand.src}
              alt={brand.name}
              width={140}
              height={40}
              className="object-contain h-full w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}