// 'use client';

// import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// export default function Faq() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const divs = [
//     { title: "We share goodness", content: "Our commitment to sharing goodness..." },
//     { title: "We deliver each grain of rice", content: "Quality control is at the heart..." },
//     { title: "We try to foster a culture of transparency", content: "Transparency isn't just a buzzword..." },
//     { title: "Hygienically processed and packed", content: "Our state-of-the-art facilities..." },
//     { title: "Our focus is also on spreading awareness", content: "Education is key..." },
//     { title: "We are determined", content: "Our determination drives us..." }
//   ];

//   const togglediv = (index) => {
//     // This logic strictly allows only one index at a time
//     setOpenIndex(prev => (prev === index ? null : index));
//   };

//   return (
//     <div className="bg-[#306177] py-20 px-4">
//       <div className="wrapper max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-[25px] font-bold text-white mb-6">Why are we different?</h2>
//           <p className="text-white text-[17px] max-w-4xl mx-auto leading-relaxed">
//             We are determined to bring you the finest quality rice...
//           </p>
//         </div>

//         {/* Added items-start to prevent the 'neighbor' div from stretching */}
//         <div className="grid md:grid-cols-2 gap-4 items-start">
//           {divs.map((div, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl overflow-hidden shadow-lg h-fit"
//             >
//               <button
//                 onClick={() => togglediv(index)}
//                 className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
//               >
//                 <span className="text-[#306177] font-medium text-[20px] pr-4">
//                   {div.title}
//                 </span>
//                 <ChevronDown
//                   className={`text-[#306177] transition-transform duration-300 ${
//                     openIndex === index ? 'rotate-180' : ''
//                   }`}
//                   size={24}
//                 />
//               </button>

//               {/* Refined Transition Logic */}
//               <div 
//                 className={`grid transition-all duration-300 ease-in-out ${
//                   openIndex === index 
//                   ? 'grid-rows-[1fr] opacity-100' 
//                   : 'grid-rows-[0fr] opacity-0'
//                 }`}
//               >
//                 <div className="overflow-hidden">
//                   <div className="px-6 pb-5 text-[#306177] leading-relaxed">
//                     {div.content}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const divs = [
    {
      title: "How does Ripuraj ensure consistent quality?",
      content:
        "Every batch of Ripuraj rice undergoes careful selection, advanced processing, and multiple quality checks to ensure consistency in taste, texture, and purity.",
    },
    {
      title: "Where is Ripuraj rice sourced from?",
      content:
        "We work closely with trusted farming communities and carefully source premium-quality paddy to maintain the standards our customers expect.",
    },
    {
      title: "What makes Ripuraj different from other rice brands?",
      content:
        "Our focus on quality, modern milling technology, hygienic processing, and decades of expertise allows us to deliver rice that's trusted by families and businesses alike.",
    },
    {
      title: "Is Ripuraj rice hygienically processed?",
      content:
        "Yes. Our rice is processed and packed in modern facilities that follow strict hygiene and quality standards to preserve freshness and purity.",
    },
    {
      title: "Which varieties of rice does Ripuraj offer?",
      content:
        "Ripuraj offers a carefully curated range of rice to suit everyday meals, traditional recipes, and special occasions, catering to the diverse preferences of Indian kitchens.",
    },
    {
      title: "Who is Ripuraj rice ideal for?",
      content:
        "Whether you're cooking at home, managing a restaurant, or serving large gatherings, Ripuraj offers dependable quality and consistency for every requirement.",
    },
  ];

  const togglediv = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/faqbg.png')", // put your image inside public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1d3440]/65"></div>

      <div className="wrapper max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-[25px] md:text-[38px] font-bold text-[#F5E6D3] mb-2">
          Why Do Families Choose Ripuraj?
          </h2>

          <p className="text-white text-[15px]  max-w-5xl mx-auto leading-relaxed ">
          Quality isn't a promise we make—it's the standard we follow every single day. Every grain is selected with care, processed with precision, and delivered with the trust that has defined Ripuraj for generations.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {divs.map((div, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Button */}
              <button
                onClick={() => togglediv(index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <span className="text-[#1F1F1F] font-medium text-[15px] pr-4">
                  {div.title}
                </span>

                <ChevronDown
                  className={`text-[#1F1F1F] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              {/* Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed text-[15px]">
                    {div.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}