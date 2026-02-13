import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const achievements = [
    {
        title: "India’s First Steam Jeera Rice",
        description:
            "Ripuraj Agro Pvt Ltd is the first in India to introduce Steam Jeera Rice in convenient 1 kg and 5 kg packages. This innovation underscores our dedication to quality and consumer satisfaction.",
        image: "/achieve-1.jpg",
    },
    {
        title: "Redefining Non-Basmati Rice",
        description:
            "We have transformed the non-Basmati rice market by introducing branded products, setting new quality standards and earning consumer trust across India.",
        image: "/achieve-2.jpg",
    },
    {
        title: "Committed to Quality, Scaling to 1000 MT",
        description:
            "From an initial production capacity of 120 MT/day, Ripuraj Agro Pvt Ltd now proudly produces 1000 MT/day, reflecting our commitment to meeting the growing demand for our premium rice.",
        image: "/achieve-3.jpg",
    },
];

const Achievements = () => {
    return (
        <div className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#2f5f73] text-center">
                        Achievements
                    </h2>

                    {/* Arrows (UI only) */}
                    <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="h-48 relative">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5">
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
