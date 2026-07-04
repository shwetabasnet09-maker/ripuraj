

// "use client";
// import Image from "next/image";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Bannermain from "../component/gobal/Banner";
// export default function ShopPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/products/");
//         const data = await res.json(); setProducts(data);
//       }
//       catch (err) {
//         console.error("Failed to fetch products:", err);

//       }
//       finally { setLoading(false); }
//     }; fetchProducts();
//   }, []);
//   if (loading)
//     return
//   <p className="text-center py-20">Loading products...</p>;
//   return (<> <Bannermain backgroundImg="/aboutbanner.png" title="Shop" />
//     <div className="py-16 px-4"> <div className="max-w-7xl mx-auto">
//       {/* Heading */} <p className="text-center uppercase text-sm tracking-widest text-gray-500 mb-2"> Explore Our Products Range </p>
//       <h1 className="text-center text-3xl md:text-4xl font-semibold text-[#2f5f73] mb-12"> High Quality Ripuraj Premium Rice </h1>
//       {/* Grid */} <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> {products.map((product) => (<div key={product.slug} className="bg-[#f8f6f1] rounded-2xl p-4 shadow-sm" >
//         <div className="rounded-xl flex overflow-hidden"> <Image src={product.main_image} alt={product.name} width={350}
//           unoptimized height={400} /> </div>
//         <h3 className="mt-4 font-semibold text-[#2f5f73] text-sm"> {product.name} </h3>
//         <div className="flex items-center justify-between mt-4"> <p className="text-xs text-gray-500"> 5Kg – 20Kg </p>
//           <Link href={`/shop/${product.slug}`} className="bg-[#2f5f73] text-white text-xs px-4 py-2 rounded" > Add To Cart </Link> </div> </div>))}
//       </div> </div> </div> </>);
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Bannermain from "../component/gobal/Banner";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products/");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="text-center py-20">Loading products...</p>
    );

  return (
    <>
      <Bannermain backgroundImg="/aboutbanner.png" title="Shop" />

      <div className="py-16 px-4 bg-[#f5f5f5] relative overflow-hidden">
        
        {/* Left Icon */}
        <div className="absolute top-0 left-0 w-32 md:w-44 opacity-80">
          <Image
            src="/leftpea.png"
            alt="left design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        {/* Right Icon */}
        <div className="absolute top-0 right-0 w-32 md:w-44 opacity-80 ">
          <Image
            src="/rightpea.png"
            alt="right design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Heading */}
          <p className="text-center uppercase text-sm tracking-widest text-gray-500 mb-2">
            Explore Our Products Range
          </p>

          <h1 className="text-center text-3xl md:text-4xl font-semibold text-[#2f5f73] mb-12">
            High Quality Ripuraj Premium Rice
          </h1>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.slug}
                className="bg-[#f8f6f1] rounded-2xl p-4 shadow-sm"
              >
                <div className="rounded-xl flex overflow-hidden">
                  <Image
                    src={product.main_image}
                    alt={product.name}
                    width={350}
                    height={400}
                    unoptimized
                  />
                </div>

                <h3 className="mt-4 font-semibold text-[#2f5f73] text-sm">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">5Kg – 20Kg</p>

                  <Link
                    href={`/shop/${product.slug}`}
                    className="bg-[#2f5f73] text-white text-xs px-4 py-2 rounded"
                  >
                    Add To Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}