'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "We share goodness",
      content: "Our commitment to sharing goodness extends beyond our products. We believe in giving back to the community, supporting local farmers, and ensuring that every grain of rice contributes to a better tomorrow for everyone involved in our supply chain."
    },
    {
      title: "We deliver each grain of rice",
      content: "Quality control is at the heart of everything we do. Each grain undergoes rigorous inspection to ensure it meets our high standards. From farm to table, we track every step of the journey to guarantee freshness, nutrition, and exceptional taste."
    },
    {
      title: "We try to foster a culture of transparency",
      content: "Transparency isn't just a buzzword for us—it's a way of doing business. We openly share our sourcing practices, processing methods, and quality standards. You have the right to know exactly where your rice comes from and how it's prepared."
    },
    {
      title: "Hygienically processed and packed",
      content: "Our state-of-the-art facilities maintain the highest hygiene standards throughout the processing and packaging process. Every batch is handled with care in sanitized environments, ensuring that the rice you receive is as pure and safe as nature intended."
    },
    {
      title: "Our focus is also on spreading awareness",
      content: "Education is key to building a healthier future. We actively work to spread awareness about nutrition, sustainable farming practices, and the importance of quality ingredients. Through workshops, content, and community engagement, we empower people to make informed choices."
    },
    {
      title: "We are determined",
      content: "Our determination drives us to continuously improve and innovate. We're not satisfied with good enough—we strive for excellence in every aspect of our business. This unwavering commitment ensures that we consistently deliver the finest quality rice to your table."
    }
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-[#306177] py-20 px-4">
      <div className="wrapper">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[25px] font-bold text-white mb-6">
            Why are we different?
          </h2>
          <p className="text-white text-[17px] max-w-4xl mx-auto leading-relaxed">
            We are determined to bring you the finest quality rice, ensuring purity, nutrition, and trust in every grain. Our commitment goes beyond just delivering rice we focus on transparency, hygiene, and spreading awareness for a healthier, better future.
          </p>
        </div>

        {/* Accordion Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#306177] font-medium text-[20px] pr-4">
                  {section.title}
                </span>
                <ChevronDown
                  className={`text-[#306177] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-[#306177] leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}