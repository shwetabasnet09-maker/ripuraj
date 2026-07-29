// "use client";

// import Image from "next/image";
// import { Check, ChevronRight } from "lucide-react";
// import { useParams } from "next/navigation";
// import { products } from "../../data/date";
// import Link from "next/link";
// import Bannermain from "../../component/global/Banner";

// export default function ProductHighlight() {
//   const params = useParams();
//   const slug = Array.isArray(params.slug)
//     ? params.slug[0]
//     : params.slug;

//   const product = products.find((p) => p.slug === slug);

//   if (!product) {
//     return (
//       <div className="text-center py-14 text-xl">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Breadcrumb */}
//       <Bannermain backgroundImg="/About%20Banner.webp" title={product.name} />
      

//       {/* Main Section */}
//       <section className="w-400 bg-[#f5f5f5] py-14 px-4 md:px-14 font-sans relative overflow-hidden">

//         {/* Left Decorative Icon */}
//         {/* <div className="absolute top-0 left-0 w-32 md:w-44 opacity-80">
//           <Image
//             src="/leftpea.png"
//             alt="left design"
//             width={180}
//             height={180}
//             className="w-full h-auto"
//           />
//         </div>

//         {/* Right Decorative Icon */}
//         {/* <div className="absolute top-0 right-0 w-32 md:w-44 opacity-80 ">
//           <Image
//             src="/rightpea.png"
//             alt="right design"
//             width={180}
//             height={180}
//             className="w-full h-auto"
//           />
//         </div> */} 

//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

//           {/* LEFT IMAGE */}
//           <div className="relative bg-[#EDEDED] rounded-[40px] h-[564px] sm:h-[580px] lg:h-[580px] flex items-center justify-center overflow-hidden">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={564}
//               height={580}
//               className="w-full h-auto object-contain"
//               priority
//             />
//           </div>

//           {/* RIGHT CONTENT */}
//           <div>
//             <h2 className="text-[35px] lg:text-[35px] font-bold items-start text-[#3a6372]  leading-tight max-w-xl">
//               {product.name}
//             </h2>

//             <p className="text-gray-600 mt-1 text-lg max-w-xl leading-relaxed">
//               {product.description}
//             </p>

//             <h3 className="mt-2 text-xl font-bold text-[#3a6372]">
//               Packaging Size Available Online
//             </h3>

//             {/* FEATURES */}
//             <div className="mt-2 space-y-2 ">
//               {product.features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-4"
//                 >
//                   <Check
//                     className="text-[#3a6372] mt-1 flex-shrink-0"
//                     size={26}
//                     strokeWidth={3}
//                   />

//                   <div>
//                     <h4 className="text-lg font-bold text-[#3a6372]">
//                       {feature.title}
//                     </h4>

//                     <p className="text-gray-500">
//                       {feature.text}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* WEIGHT OPTIONS */}
//             {product.weights?.length > 0 && (
//               <div className="mt-6 flex flex-wrap items-center gap-8">
//                 {[...product.weights]
//                   .sort((a, b) => {
//                     // Convert each weight to grams for accurate sorting,
//                     // regardless of whether it's written as KG or GM
//                     // (e.g. "500GM" must sort below "1KG", not above it).
//                     const toGrams = (w) => {
//                       const num = parseFloat(w);
//                       return /gm/i.test(w) ? num : num * 1000;
//                     };
//                     return toGrams(b) - toGrams(a);
//                   })
//                   .map((w, i) => (
//                     <div key={i} className="flex items-center gap-2">
//                       <Image
//                         src="/Weight.png"
//                         alt="Weight"
//                         width={22}
//                         height={22}
//                         className="w-[22px] h-[22px] object-contain"
//                       />
//                       <span className="text-[#1a1a1a] font-semibold text-base">
//                         {w}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             )}

//             {/* BUTTON */}
//             <Link
//               href="/shop"
//               className="mt-5 inline-block bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold text-lg transition"
//             >
//               SHOP NOW
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Bannermain from "../../component/global/Banner";
import { useEffect, useState } from "react";

export default function ProductHighlight() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const weights = product?.customer || product?.reseller || [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${slug}/`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center text-xl">
        Product not found
      </div>
    );
  }

  return (
    <>
      <Bannermain
        backgroundImg="/About Banner.webp"
        title={product.name}
      />

      <section className="bg-[#f5f5f5] py-14 px-4 md:px-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Product Image */}
          <div className="bg-[#EDEDED] rounded-[40px] h-[560px] flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={550}
              height={550}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-[#3a6372]">
              {product.name}
            </h1>

            <p className="mt-5 text-gray-600 leading-8">
              {product.description}
            </p>

            {/* Product Weights */}
            {/* Product Weights */}
{weights.length > 0 && (
  <>
    <h3 className="mt-8 text-2xl font-bold text-[#3a6372]">
      Available Sizes
    </h3>

    <div className="mt-5 space-y-4">
      {[...weights]
        .sort((a, b) => Number(a.weight) - Number(b.weight))
        .map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/Weight.png"
                alt="Weight"
                width={22}
                height={22}
              />

              <span className="font-semibold text-lg">
                {item.weight} KG
              </span>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-[#3a6372]">
                ₹ {item.retail_price || item.wholesale_price}
              </p>

              {item.wholesale_min_quantity && (
                <p className="text-sm text-gray-500">
                  Min Qty: {item.wholesale_min_quantity}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  </>
)}

            {/* Nutritional */}
            {product.nutritional && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Nutritional Information
                </h3>

                <p className="text-gray-600">
                  {product.nutritional}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Ingredients
                </h3>

                <p className="text-gray-600">
                  {product.ingredients}
                </p>
              </div>
            )}

            {/* How to Cook */}
            {product.how_to_cook && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  How To Cook
                </h3>

                <p className="text-gray-600">
                  {product.how_to_cook}
                </p>
              </div>
            )}

            {/* Quality Report */}
            {product.quality_report && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  Quality Report
                </h3>

                <p className="text-gray-600">
                  {product.quality_report}
                </p>
              </div>
            )}

            {/* FAQ */}
            {product.faq && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#3a6372] mb-2">
                  FAQ
                </h3>

                <p className="text-gray-600">
                  {product.faq}
                </p>
              </div>
            )}

            <Link
              href="/shop"
              className="inline-block mt-10 bg-[#3a6372] hover:bg-[#2f515d] text-white px-10 py-4 rounded-md font-semibold transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Gallery */}
        {product.images?.length > 0 && (
          <div className="max-w-7xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-[#3a6372] mb-8">
              Product Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-xl overflow-hidden bg-white shadow"
                >
                  <Image
                    src={img.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}