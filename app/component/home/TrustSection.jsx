import Image from "next/image";

export default function Trustdiv() {
  const features = [
    {
      id: 1,
      title: "Premium Grain Choice",
      icon: "/premium.svg",
    },
    {
      id: 2,
      title: "Best Parboiled Rice",
      icon: "/rice.svg",
    },
    {
      id: 3,
      title: "India's No. 1 Rice in Non-Basmati Segment",
      icon: "/number_1.svg",
    },
    {
      id: 4,
      title: "Lakhs of Happy Customers",
      icon: "/start_person.svg",
    },
  ];

  return (
    <div className="py-10 lg:py-14 bg-white px-5 lg:px-4 relative overflow-hidden">
      {/* Top Left Icon
      <Image
        src="/leftpea.png"
        alt="left design"
        width={149.61}
        height={149.61}
        className="absolute top-0 left-0 opacity-80 w-16 h-16 lg:w-[149.61px] lg:h-[149.61px]"
      /> */}

      {/* Top Right Icon */}
      {/* <Image
        src="/rightpea.png"
        alt="right design"
        width={149.61}
        height={149.61}
        className="absolute top-0 right-0 opacity-80 w-16 h-16 lg:w-[149.61px] lg:h-[149.61px]"
      /> */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-[24px] leading-snug lg:text-[35px] md:text-4xl font-bold text-black mb-3">
          A Legacy That {" "}
            <span className="text-[#2B6B7E]">Continues to Grow</span>
          </h2>

          <p className="text-[#000000] max-w-4xl mx-auto text-sm lg:text-[15px] leading-relaxed">
          For over 46 years, Ripuraj has embraced progress without losing sight of its values. Every milestone reflects our dedication to quality, innovation, and building lasting relationships with families, partners, and communities.

          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden"
            >
              {/* Top div */}
              <div className="h-[130px] lg:h-[195px] flex items-center justify-center bg-[#FAF7F7]">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={90}
                  height={90}
                  className="object-contain w-14 h-14 lg:w-[90px] lg:h-[90px]"
                />
              </div>

              {/* Bottom div */}
              <div className="bg-gradient-to-b from-[#0F4C5C] to-[#0A3C4A] min-h-[60px] lg:min-h-[75px] flex items-center justify-center px-3 lg:px-4 py-2.5 lg:py-3">
                <h3 className="text-[#FFF2D9] text-center font-bold text-xs lg:text-[15px] leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}