// "use client";

// import React, { useState, use } from "react";
// import Image from "next/image";
// import { products } from "@/app/data/page";
// import { notFound } from "next/navigation";
// // Import Lucide icons
// import { Star, Minus, Plus, RotateCcw } from "lucide-react";

// export default function ProductDetail({ params }) {
//   // Unwrapping params for Next.js 15
//   const { slug } = use(params);
//   const product = products.find((p) => p.slug === slug);

//   if (!product) return notFound();

//   const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="wrapper mx-auto py-40 px-4 font-sans">
//       {/* Breadcrumbs */}
//       <nav className="text-sm text-gray-500 mb-6">
//         Home / Rice / <span className="text-gray-800 font-medium">{product.name}</span>
//       </nav>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
//         {/* Left: Image Section */}
//         <div className="space-y-4">
//           <div className="border border-blue-100 bg-[#f9fafc] rounded-sm p-12 flex justify-center items-center relative min-h-[500px]">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={350}
//               height={500}
//               className="object-contain"
//               priority
//             />
//           </div>
          
//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto">
//              {[...Array(5)].map((_, i) => (
//                <div key={i} className="min-w-[110px] aspect-square bg-[#fdf6e9] rounded-2xl border border-orange-50 flex items-center justify-center p-3 cursor-pointer hover:border-orange-200 transition-all">
//                   <Image src={product.image} alt="thumbnail" width={60} height={80} className="object-contain" />
//                </div>
//              ))}
//           </div>
//         </div>

//         {/* Right: Info Section */}
//         <div className="flex flex-col">
//           <h1 className="text-4xl font-bold text-slate-800 leading-tight">
//             {product.name}
//           </h1>

//           <p className="mt-4 text-gray-600 text-[15px] leading-relaxed">
//             {product.description}
//           </p>

//           {/* Rating using Lucide */}
//           <div className="flex gap-1 mt-4">
//             {[...Array(5)].map((_, i) => (
//               <Star 
//                 key={i} 
//                 size={20} 
//                 fill={i < product.rating ? "#fbbf24" : "none"} 
//                 className={i < product.rating ? "text-yellow-400" : "text-gray-300"} 
//               />
//             ))}
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-bold mt-4 text-slate-900">
//             ₹{product.price.toLocaleString("en-IN")}.00
//           </p>

//           {/* Weight Selection */}
//           <div className="mt-6">
//             <p className="text-xl font-semibold mb-3">Weight</p>
//             <div className="flex items-center gap-3">
//               {product.weights.map((w) => (
//                 <button
//                   key={w}
//                   onClick={() => setSelectedWeight(w)}
//                   className={`px-6 py-2 rounded text-sm font-semibold transition-all ${
//                     selectedWeight === w 
//                     ? "bg-[#426a7a] text-white" 
//                     : "bg-[#d1dce0] text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   {w}
//                 </button>
//               ))}
//               <button 
//                 onClick={() => setSelectedWeight("")}
//                 className="text-red-500 text-sm ml-2 flex items-center gap-1 hover:underline"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           {/* Quantity Selector using Lucide */}
//           <div className="mt-8 flex items-center gap-4">
//             <span className="text-lg font-medium">Quantity:</span>
//             <div className="flex items-center border border-gray-200 rounded">
//               <button 
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="p-3 hover:bg-gray-50 border-r border-gray-200"
//               >
//                 <Minus size={16} />
//               </button>
//               <span className="px-6 font-bold text-lg">{quantity}</span>
//               <button 
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="p-3 hover:bg-gray-50 border-l border-gray-200"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>

//           <p className="mt-6 text-md font-medium">
//             Availability <span className="text-red-400 ml-2">In Stock</span>
//           </p>

//           {/* Action Buttons */}
//           <div className="mt-8 flex gap-4">
//             <button className="bg-[#426a7a] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#355663] transition-colors flex-1">
//               AddTo Cart
//             </button>
//             <button className="bg-[#fff3db] text-slate-800 px-10 py-4 rounded font-bold text-lg hover:bg-[#ffe8bc] transition-colors flex-1">
//               Buy it now
//             </button>
//           </div>

//           {/* Payment Trust Section */}
//           <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
//              <div className="flex items-center justify-center gap-8 mb-8 opacity-70">
//                 {/* Simplified labels as seen in image */}
//                 <div className="text-center font-bold text-blue-600">G Pay</div>
//                 <div className="text-center font-bold text-purple-700">PhonePe</div>
//                 <div className="text-center font-bold text-black">CRED</div>
//                 <div className="text-center font-bold text-blue-400">Paytm</div>
//              </div>

//              {/* Bottom Links */}
//             <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">
//                 <span className="cursor-pointer">Nutritional Facts</span>
//                 <span className="text-gray-300">|</span>
//                 <span className="cursor-pointer">Allergen Info</span>
//                 <span className="text-gray-300">|</span>
//                 <span className="cursor-pointer">Ingredients</span>
//                 <span className="text-gray-300">|</span>
//                 <span className="cursor-pointer">Quality Report</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { products } from "@/app/data/date";
import { notFound } from "next/navigation";
// Import Lucide icons
import { Star, Minus, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetail({ params }) {
  // Unwrapping params for Next.js 15
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Create array of images (in this case, same image repeated 5 times)
  const images = Array(5).fill(product.image);

  return (
    <div className="wrapper mx-auto py-40 px-4 font-sans">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        Home / Rice / <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Image Section */}
        <div className="space-y-4">
          {/* Main Product Image - with blue border like in the image */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white rounded p-8 flex justify-center items-center relative min-h-[500px] cursor-pointer hover:border-blue-400 transition-colors"
          >
            <Image
              src={images[selectedImageIndex]}
              alt={product.name}
              width={350}
              height={500}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Thumbnails - cream/yellow background like in image */}
          <div className="flex gap-3 overflow-x-auto">
             {images.map((img, i) => (
               <div 
                 key={i} 
                 onClick={() => {
                   setSelectedImageIndex(i);
                   setIsModalOpen(true);
                 }}
                 className={`min-w-[110px] aspect-square bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-lg border-2 flex items-center justify-center p-4 cursor-pointer hover:border-yellow-400 transition-all shadow-sm ${
                   selectedImageIndex === i ? 'border-yellow-500 ring-2 ring-yellow-300' : 'border-yellow-200'
                 }`}
               >
                  <Image 
                    src={img} 
                    alt={`thumbnail ${i + 1}`} 
                    width={60} 
                    height={80} 
                    className="object-contain" 
                  />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-gray-600 text-[15px] leading-relaxed">
            {product.description}
          </p>

          {/* Rating using Lucide - Yellow stars */}
          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                fill={i < product.rating ? "#fbbf24" : "none"} 
                className={i < product.rating ? "text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>

          {/* Price */}
          <p className="text-3xl font-bold mt-4 text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}.00
          </p>

          {/* Weight Selection */}
          <div className="mt-6">
            <p className="text-xl font-semibold mb-3 text-gray-900">Weight</p>
            <div className="flex items-center gap-3">
              {product.weights.map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeight(w)}
                  className={`px-6 py-2.5 rounded font-semibold transition-all ${
                    selectedWeight === w 
                    ? "bg-[#3d5a68] text-white shadow-md" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {w}
                </button>
              ))}
              <button 
                onClick={() => setSelectedWeight("")}
                className="text-red-500 text-sm font-medium ml-2 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-lg font-medium text-gray-900">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-50 border-r border-gray-300 transition-colors"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="px-6 font-bold text-lg text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-50 border-l border-gray-300 transition-colors"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Availability */}
          <p className="mt-6 text-md font-medium text-gray-900">
            Availability <span className="text-orange-500 ml-2">In Stock</span>
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-[#3d5a68] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#2d4550] transition-colors flex-1 shadow-md">
              AddTo Cart
            </button>
            <button className="bg-[#fef3c7] text-gray-900 px-10 py-4 rounded font-bold text-lg hover:bg-[#fde68a] transition-colors flex-1 shadow-md border border-yellow-200">
              Buy it now
            </button>
          </div>

          {/* Payment Methods Section - Using circular icons */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col items-center">
             <div className="flex items-center justify-center gap-6 mb-8">
                {/* Payment Icons - Circular style similar to the image */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">GPay</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">PhonePe</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">CRED</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">Pay</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center shadow-md">
                  <span className="text-blue-600 font-bold text-xs">Paytm</span>
                </div>
             </div>

             {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                <span className="cursor-pointer hover:text-gray-900">NUTRITIONAL FACTS</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer hover:text-gray-900">ALLERGEN INFO</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer hover:text-gray-900">INGREDIENTS</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer hover:text-gray-900">QUALITY REPORT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal/Popup */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* Main Modal Image */}
            <div className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-white rounded-lg p-8 min-h-[600px] relative">
              {/* Previous Button */}
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <ChevronLeft size={28} className="text-gray-700" />
              </button>

              {/* Image */}
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                width={500}
                height={700}
                className="object-contain max-h-[600px]"
              />

              {/* Next Button */}
              <button
                onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <ChevronRight size={28} className="text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Navigation in Modal */}
            <div className="flex gap-3 mt-6 overflow-x-auto justify-center">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`min-w-[80px] aspect-square bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-lg border-2 flex items-center justify-center p-2 cursor-pointer hover:border-yellow-400 transition-all ${
                    selectedImageIndex === i ? 'border-yellow-500 ring-2 ring-yellow-300' : 'border-yellow-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`thumbnail ${i + 1}`}
                    width={50}
                    height={70}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Image Counter */}
            <div className="text-center mt-4 text-gray-600 font-medium">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}