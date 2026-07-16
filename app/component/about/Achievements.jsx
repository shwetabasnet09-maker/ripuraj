import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const achievements = [
  {
    title: "India's First Steam Jeera Rice",
    description:
      "Ripuraj Agro Pvt Ltd is the first in India to introduce Steam Jeera Rice in convenient 1 kg and 5 kg packages. This innovation underscores our dedication to quality and consumer satisfaction.",
    image: "/India’s First Steam Jeera Rice.webp",
  },
  {
    title: "Redefining Non-Basmati Rice",
    description:
      "We have transformed the non-Basmati rice market by introducing branded products, setting new quality standards and earning consumer trust across India.",
    image: "/Redefining Non-Basmati Rice.webp",
  },
  {
    title: "Committed to Quality, Scaling to 1000 MT",
    description:
      "From an initial production capacity of 120 MT/day, Ripuraj Agro Pvt Ltd now proudly produces 1000 MT/day, reflecting our commitment to meeting the growing demand for our premium rice.",
    image: "/Committed to Quality, Scaling to 1000 MT.webp",
  },
];

const Achievements = () => {
  return (
    <div className="relative py-14 px-4 bg-white overflow-hidden">
      {/* Decorative corner icons */}
      {/* <Image
        src="/leftpea.png"
        alt=""
        width={149.61}
        height={188.34  }
        className="absolute top-0 left-0 opacity-80 pointer-events-none"
      />
      <Image
        src="/rightpea.png"
        alt=""
        width={149.61}
        height={188.34}
        className="absolute top-0 right-0 opacity-80 pointer-events-none"
      /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2f5f73] text-center">
            Achievements
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-[#E3E3E3] rounded-2xl p-3 shadow-sm hover:shadow-md transition"
            >
              <div className="h-66 relative rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="pt-5 pb-2 px-2">
                <h3 className="font-semibold text-[#2f5f73] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;