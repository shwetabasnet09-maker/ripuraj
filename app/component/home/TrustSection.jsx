


// import Image from "next/image";

// export default function Trustdiv() {
//   const features = [
//     {
//       id: 1,
//       title: "Premium Grain Choice",
//       icon: "/premium.svg",
//     },
//     {
//       id: 2,
//       title: "Best Parboiled Rice",
//       icon: "/rice.svg",
//     },
//     {
//       id: 3,
//       title: "India’s No. 1 Rice in Non-Basmati Segment",
//       icon: "/start_person.svg",
//     },
//     {
//       id: 4,
//       title: "Lakhs of Happy Customers",
//       icon: "/number_1.svg",
//     },
//   ];

//   return (
//     <div className="py-20 bg-white px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-teal-900 mb-4">
//             Trusted by Millions, Perfected Over Decades
//           </h2>
//           <p className="text-[#000000] max-w-4xl mx-auto text-lg">
//             Ripuraj, a trusted name for over 46 years. With lakhs of happy customers,
//             our commitment to quality shines in every grain.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((item) => (
//             <div
//               key={item.id}
//               className="h-[250px] bg-white rounded-xl overflow-hidden shadow-sm border"
//             >
//               {/* Top div */}
//               <div className="h-[60%] flex items-center justify-center">
//                 <Image
//                   src={item.icon}
//                   alt={item.title}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                 />
//               </div>

//               {/* Bottom div */}
//               <div className="h-[30%] bg-gradient-to-b from-[#0F4C5C] to-[#0A3C4A] flex items-center justify-center px-6 mt-10">
//                 <h3 className=" text-[#FFF2D9] text-center font-bold text-[16px] leading-snug  px-3 rounded-[10px] ">
//                   {item.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

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
      title: "India’s No. 1 Rice in Non-Basmati Segment",
      icon: "/start_person.svg",
    },
    {
      id: 4,
      title: "Lakhs of Happy Customers",
      icon: "/number_1.svg",
    },
  ];

  return (
    <div className="py-14 bg-white px-4 relative overflow-hidden">
      
      {/* Top Left Icon */}
      <Image
        src="/leftpea.png"
        alt="left design"
        width={130}
        height={130}
        className="absolute top-0 left-0 opacity-80"
      />

      {/* Top Right Icon */}
      <Image
        src="/rightpea.png"
        alt="right design"
        width={130}
        height={130}
        className="absolute top-0 right-0 opacity-80"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3">
            Trusted by Millions,{" "}
            <span className="text-[#2B6B7E]">
              Perfected Over Decades
            </span>
          </h2>

          <p className="text-[#000000] max-w-3xl mx-auto text-[15px] leading-relaxed border border-[#6FA3FF] px-4 py-2">
            Ripuraj, a trusted name for over 46 years. With lakhs of happy
            customers, our commitment to quality shines in every grain.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[16px] overflow-hidden border shadow-sm"
            >
              {/* Top div */}
              <div className="h-[180px] flex items-center justify-center bg-[#FAF7F7]">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={75}
                  height={75}
                  className="object-contain"
                />
              </div>

              {/* Bottom div */}
              <div className="bg-gradient-to-b from-[#0F4C5C] to-[#0A3C4A] min-h-[80px] flex items-center justify-center px-4 py-4">
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