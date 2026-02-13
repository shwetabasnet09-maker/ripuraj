'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const divs = [
    { title: "We share goodness", content: "Our commitment to sharing goodness..." },
    { title: "We deliver each grain of rice", content: "Quality control is at the heart..." },
    { title: "We try to foster a culture of transparency", content: "Transparency isn't just a buzzword..." },
    { title: "Hygienically processed and packed", content: "Our state-of-the-art facilities..." },
    { title: "Our focus is also on spreading awareness", content: "Education is key..." },
    { title: "We are determined", content: "Our determination drives us..." }
  ];

  const togglediv = (index) => {
    // This logic strictly allows only one index at a time
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#306177] py-20 px-4">
      <div className="wrapper max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[25px] font-bold text-white mb-6">Why are we different?</h2>
          <p className="text-white text-[17px] max-w-4xl mx-auto leading-relaxed">
            We are determined to bring you the finest quality rice...
          </p>
        </div>

        {/* Added items-start to prevent the 'neighbor' div from stretching */}
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {divs.map((div, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg h-fit"
            >
              <button
                onClick={() => togglediv(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#306177] font-medium text-[20px] pr-4">
                  {div.title}
                </span>
                <ChevronDown
                  className={`text-[#306177] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              {/* Refined Transition Logic */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index 
                  ? 'grid-rows-[1fr] opacity-100' 
                  : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-[#306177] leading-relaxed">
                    {div.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}