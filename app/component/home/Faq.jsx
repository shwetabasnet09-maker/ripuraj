

// "use client";

// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// export default function Faq() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const divs = [
//     {
//       title: "We share goodness",
//       content:
//         "Our commitment to sharing goodness reflects in every grain we deliver with care and quality.",
//     },
//     {
//       title: "We deliver each grain of rice",
//       content:
//         "Every grain is carefully selected, processed, and delivered to maintain premium quality.",
//     },
//     {
//       title: "We try to foster a culture of transparency",
//       content:
//         "We believe in honest processes, open communication, and complete trust with our customers.",
//     },
//     {
//       title: "Hygienically processed and packed",
//       content:
//         "Our rice is processed and packed in hygienic facilities using modern technology standards.",
//     },
//     {
//       title: "Our focus is also on spreading awareness",
//       content:
//         "We actively spread awareness about healthy food choices and nutritional living.",
//     },
//     {
//       title: "We are determined",
//       content:
//         "Our determination drives us to consistently provide the finest quality products.",
//     },
//   ];

//   const togglediv = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section
//       className="relative py-20 px-4 overflow-hidden"
//       style={{
//         backgroundImage: "url('/faqbg.png')", // put your image inside public folder
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-[#1d3440]/65"></div>

//       <div className="wrapper max-w-7xl mx-auto relative z-10">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-[34px] md:text-[38px] font-bold text-[#F5E6D3] mb-4">
//             Why are we different ?
//           </h2>

//           <p className="text-white text-[15px]  max-w-5xl mx-auto leading-relaxed">
//             We are determined to bring you the finest quality rice, ensuring
//             purity, nutrition, and trust in every grain. Our commitment goes
//             beyond just delivering rice we focus on transparency, hygiene, and
//             spreading awareness for a healthier, better future.
//           </p>
//         </div>

//         {/* FAQ Grid */}
//         <div className="grid md:grid-cols-2 gap-5 items-start">
//           {divs.map((div, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl overflow-hidden shadow-xl"
//             >
//               {/* Button */}
//               <button
//                 onClick={() => togglediv(index)}
//                 className="w-full px-4 py-3 flex items-center justify-between text-left"
//               >
//                 <span className="text-[#1F1F1F] font-medium text-[15px] pr-4">
//                   {div.title}
//                 </span>

//                 <ChevronDown
//                   className={`text-[#1F1F1F] transition-transform duration-300 flex-shrink-0 ${
//                     openIndex === index ? "rotate-180" : ""
//                   }`}
//                   size={24}
//                 />
//               </button>

//               {/* Content */}
//               <div
//                 className={`grid transition-all duration-300 ease-in-out ${
//                   openIndex === index
//                     ? "grid-rows-[1fr] opacity-100"
//                     : "grid-rows-[0fr] opacity-0"
//                 }`}
//               >
//                 <div className="overflow-hidden">
//                   <div className="px-6 pb-5 text-gray-600 leading-relaxed text-[15px]">
//                     {div.content}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const [faqData, setFaqData] = useState({
    title: "",
    description: "",
    faqs: [],
  });

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/homepage/faq-section/`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await res.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };

    fetchFaq();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/faqbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#1d3440]/65"></div>

      <div className="wrapper max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[34px] md:text-[38px] font-bold text-[#F5E6D3] mb-4">
            {faqData.title}
          </h2>

          <p className="text-white text-[15px] max-w-5xl mx-auto leading-relaxed">
            {faqData.description}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {faqData.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <span className="text-[#1F1F1F] font-medium text-[15px] pr-4">
                  {faq.title}
                </span>

                <ChevronDown
                  className={`text-[#1F1F1F] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed text-[15px]">
                    {faq.content}
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