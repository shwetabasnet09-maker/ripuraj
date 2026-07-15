

// "use client";

// import { useState, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function Faq() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const [faqData, setFaqData] = useState({
//     title: "",
//     description: "",
//     faqs: [],
//   });

//   useEffect(() => {
//     const fetchFaq = async () => {
//       try {
//         const res = await fetch(
//           `${API_BASE_URL}/api/homepage/faq-section/`
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch FAQ data");
//         }

//         const data = await res.json();
//         setFaqData(data);
//       } catch (error) {
//         console.error("Error fetching FAQ:", error);
//       }
//     };

//     fetchFaq();
//   }, []);

//   const toggleFaq = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section
//       className="relative py-20 px-4 overflow-hidden"
//       style={{
//         backgroundImage: "url('/faqbg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-[#1d3440]/65"></div>

//       <div className="wrapper max-w-7xl mx-auto relative z-10">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-[34px] md:text-[38px] font-bold text-[#F5E6D3] mb-4">
//             {faqData.title}
//           </h2>

//           <p className="text-white text-[15px] max-w-5xl mx-auto leading-relaxed">
//             {faqData.description}
//           </p>
//         </div>

//         {/* FAQ Grid */}
//         <div className="grid md:grid-cols-2 gap-5 items-start">
//           {faqData.faqs.map((faq, index) => (
//             <div
//               key={faq.id}
//               className="bg-white rounded-2xl overflow-hidden shadow-xl"
//             >
//               <button
//                 onClick={() => toggleFaq(index)}
//                 className="w-full px-4 py-3 flex items-center justify-between text-left"
//               >
//                 <span className="text-[#1F1F1F] font-medium text-[15px] pr-4">
//                   {faq.title}
//                 </span>

//                 <ChevronDown
//                   className={`text-[#1F1F1F] transition-transform duration-300 flex-shrink-0 ${
//                     openIndex === index ? "rotate-180" : ""
//                   }`}
//                   size={24}
//                 />
//               </button>

//               <div
//                 className={`grid transition-all duration-300 ease-in-out ${
//                   openIndex === index
//                     ? "grid-rows-[1fr] opacity-100"
//                     : "grid-rows-[0fr] opacity-0"
//                 }`}
//               >
//                 <div className="overflow-hidden">
//                   <div className="px-6 pb-5 text-gray-600 leading-relaxed text-[15px]">
//                     {faq.content}
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [faqData, setFaqData] = useState({
    title: "",
    description: "",
    faqs: [],
  });

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/homepage/faq-section/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("API Error:", response.status, text);
          throw new Error(`Failed to fetch FAQ (${response.status})`);
        }

        const data = await response.json();

        setFaqData({
          title: data.title || "",
          description: data.description || "",
          faqs: data.faqs || [],
        });
      } catch (err) {
        console.error("Error fetching FAQ:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-lg">Loading FAQs...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

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
          {faqData.faqs.length > 0 ? (
            faqData.faqs.map((faq, index) => (
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
                    size={24}
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
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
            ))
          ) : (
            <p className="text-white text-center col-span-2">
              No FAQs available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}