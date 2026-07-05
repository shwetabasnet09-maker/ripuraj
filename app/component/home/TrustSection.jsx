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
    <div className="py-14 bg-white px-4 relative overflow-hidden">
      {/* Top Left Icon */}
      <Image
        src="/leftpea.png"
        alt="left design"
        width={149.61}
        height={149.61}
        className="absolute top-0 left-0 opacity-80"
      />

      {/* Top Right Icon */}
      <Image
        src="/rightpea.png"
        alt="right design"
        width={149.61}
        height={149.61}
        className="absolute top-0 right-0 opacity-80"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[35px] md:text-4xl font-bold text-black mb-3">
            Trusted by Millions,{" "}
            <span className="text-[#2B6B7E]">Perfected Over Decades</span>
          </h2>

          <p className="text-[#000000] max-w-4xl mx-auto text-[15px] leading-relaxed">
            Ripuraj, a trusted name for over 46 years. With lakhs of happy
            customers, our commitment to quality shines in every grain. We
            pride ourselves on delivering a product that stands out in both
            flavor and texture.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden "
            >
              {/* Top div */}
              <div className="h-48.75 flex items-center justify-center bg-[#FAF7F7]">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>

              {/* Bottom div */}
              <div className="bg-gradient-to-b from-[#0F4C5C] to-[#0A3C4A] min-h-[75px] flex items-center justify-center px-4 py-3">
                <h3 className="text-[#FFF2D9] text-center font-bold text-[15px] leading-snug">
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