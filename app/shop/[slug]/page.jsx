
// // "use client";

// // import React, { useState, useEffect, use } from "react"; // Added 'use'
// // import Image from "next/image";
// // import { notFound, useRouter } from "next/navigation";
// // import { Star, Minus, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

// // export default function ProductDetail({ params }) {
// //   // ✅ FIX: Next.js 15 requires unwrapping params
// //   const resolvedParams = use(params);
// //   const { slug } = resolvedParams;
  
// //   const router = useRouter();

// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [buttonLoading, setButtonLoading] = useState(false);
// //   const [selectedWeight, setSelectedWeight] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

// //   // ================= FETCH PRODUCT =================
// //   useEffect(() => {
// //     async function fetchProduct() {
// //       try {
// //         setLoading(true);
// //         const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, { 
// //           cache: "no-store" 
// //         });

// //         if (!res.ok) {
// //           setProduct("not-found");
// //           return;
// //         }

// //         const data = await res.json();
// //         setProduct(data);

// //         if (data.weights && data.weights.length > 0) {
// //           setSelectedWeight(data.weights[0]);
// //         }
// //       } catch (error) {
// //         console.error(error);
// //         setProduct("not-found");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     if (slug) fetchProduct();
// //   }, [slug]);

// //   // ================= CORE LOGIC: CHECK LOGIN & POST =================
// //   const handleAction = async (type) => {
// //   try {
// //     setButtonLoading(true);

// //     const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         product_id: product.id,
// //         quantity,
// //         weight: selectedWeight?.weight || null,
// //       }),
// //       credentials: "include", // send cookies for login
// //     });

// //     const data = await res.json();

// //     if (!res.ok) {
// //       alert(data.error || "Action failed");
// //       return;
// //     }

// //     if (type === "buy") {
// //       router.push("/cart");
// //     } else {
// //       alert("Added to cart ✅");
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     alert("Something went wrong");
// //   } finally {
// //     setButtonLoading(false);
// //   }
// // };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3d5a68]" />
// //       </div>
// //     );
// //   }

// //   if (product === "not-found" || !product) return notFound();

// //   const currentUnitPrice = selectedWeight?.price || product.price || 0;
// //   const totalPrice = currentUnitPrice * quantity;
// //   const images = product.images?.length > 0 ? product.images : [product.image];

// //   return (
// //     <div className="wrapper mx-auto py-40 px-4 font-sans">
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
// //         {/* LEFT: IMAGES */}
// //         <div className="space-y-4">
// //           <div
// //             onClick={() => setIsModalOpen(true)}
// //             className="border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white rounded p-8 flex justify-center items-center min-h-[500px] cursor-pointer"
// //           >
// //             <Image src={images[selectedImageIndex]} alt={product.name} width={350} height={500} className="object-contain" priority />
// //           </div>
// //           <div className="flex gap-3 overflow-x-auto">
// //             {images.map((img, i) => (
// //               <div key={i} onClick={() => setSelectedImageIndex(i)} className={`min-w-[110px] aspect-square bg-amber-50 rounded-lg border-2 flex items-center justify-center p-4 cursor-pointer ${selectedImageIndex === i ? 'border-yellow-500' : 'border-yellow-100'}`}>
// //                 <Image src={img} alt="thumb" width={60} height={80} className="object-contain" />
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* RIGHT: INFO */}
// //         <div className="flex flex-col">
// //           <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
// //           <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

// //           <div className="flex gap-1 mt-4">
// //             {[...Array(5)].map((_, i) => (
// //               <Star key={i} size={20} fill={i < product.rating ? "#fbbf24" : "none"} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
// //             ))}
// //           </div>

// //           <p className="text-3xl font-bold mt-4 text-gray-900">₹{totalPrice.toLocaleString("en-IN")}.00</p>

// //           {/* WEIGHT SELECTION (Added back in) */}
// //           <div className="mt-6">
// //             <p className="text-xl font-semibold mb-3 text-gray-900">Weight</p>
// //             <div className="flex items-center gap-3">
// //               {product.weights?.map((w, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => setSelectedWeight(w)}
// //                   className={`px-6 py-2.5 rounded font-semibold transition-all ${selectedWeight?.weight === w.weight ? "bg-[#3d5a68] text-white" : "bg-gray-200 text-gray-700"}`}
// //                 >
// //                   {w.weight} kg
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* QUANTITY */}
// //           <div className="mt-8 flex items-center gap-4">
// //             <span className="text-lg font-medium">Quantity:</span>
// //             <div className="flex items-center border border-gray-300 rounded bg-white">
// //               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border-r"><Minus size={16} /></button>
// //               <span className="px-6 font-bold text-lg">{quantity}</span>
// //               <button onClick={() => setQuantity(quantity + 1)} className="p-3 border-l"><Plus size={16} /></button>
// //             </div>
// //           </div>

// //           {/* ACTIONS: Gated by handleAction */}
// //           <div className="mt-8 flex gap-4">
// //             <button
// //               onClick={() => handleAction("cart")}
// //               disabled={buttonLoading}
// //               className="bg-[#3d5a68] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#2d4550] flex-1 disabled:opacity-50"
// //             >
// //               {buttonLoading ? "Processing..." : "Add To Cart"}
// //             </button>
// //             <button
// //               onClick={() => handleAction("buy")}
// //               disabled={buttonLoading}
// //               className="bg-[#fef3c7] text-gray-900 px-10 py-4 rounded font-bold text-lg hover:bg-[#fde68a] flex-1 border border-yellow-200 disabled:opacity-50"
// //             >
// //               Buy it now
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* MODAL */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
// //           <div className="relative max-w-5xl w-full bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
// //             <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"><X size={24} /></button>
// //             <div className="flex items-center justify-center min-h-[500px]">
// //                <Image src={images[selectedImageIndex]} alt={product.name} width={500} height={700} className="object-contain max-h-[600px]" />
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, use } from "react";
// import Image from "next/image";
// import { notFound, useRouter } from "next/navigation";
// import { Star, Minus, Plus, X } from "lucide-react";

// export default function ProductDetail({ params }) {
//   const resolvedParams = use(params);
//   const { slug } = resolvedParams;

//   const router = useRouter();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const [selectedWeight, setSelectedWeight] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   // ================= FETCH PRODUCT =================
//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           setProduct("not-found");
//           return;
//         }

//         const data = await res.json();
//         setProduct(data);

//         if (data.weights && data.weights.length > 0) {
//           setSelectedWeight(data.weights[0]);
//         }
//       } catch (error) {
//         console.error(error);
//         setProduct("not-found");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (slug) fetchProduct();
//   }, [slug]);

//   // ================= ADD TO CART / BUY =================
//   const handleAction = async (type) => {
//     try {
//       setButtonLoading(true);

//       // Get JWT token from localStorage
//       const token = localStorage.getItem("access_token");

//       if (!token) {
//         alert("You must be logged in to perform this action!");
//         router.push("/login");
//         return;
//       }

//       const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // JWT included
//         },
//         body: JSON.stringify({
//           product_id: product.id,
//           quantity,
//           weight: selectedWeight?.weight || null,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.detail || data.error || "Action failed");
//         return;
//       }

//       if (type === "buy") {
//         router.push("/cart");
//       } else {
//         alert("Added to cart ✅");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     } finally {
//       setButtonLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3d5a68]" />
//       </div>
//     );
//   }

//   if (product === "not-found" || !product) return notFound();

//   const currentUnitPrice = selectedWeight?.price || product.price || 0;
//   const totalPrice = currentUnitPrice * quantity;
//   const images = product.images?.length > 0 ? product.images : [product.image];

//   return (
//     <div className="wrapper mx-auto py-40 px-4 font-sans">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* LEFT: IMAGES */}
//         <div className="space-y-4">
//           <div
//             onClick={() => setIsModalOpen(true)}
//             className="border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white rounded p-8 flex justify-center items-center min-h-[500px] cursor-pointer"
//           >
//             <Image
//               src={images[selectedImageIndex]}
//               alt={product.name}
//               width={350}
//               height={500}
//               className="object-contain"
//               priority
//             />
//           </div>

//           <div className="flex gap-3 overflow-x-auto">
//             {images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImageIndex(i)}
//                 className={`min-w-[110px] aspect-square bg-amber-50 rounded-lg border-2 flex items-center justify-center p-4 cursor-pointer ${
//                   selectedImageIndex === i ? "border-yellow-500" : "border-yellow-100"
//                 }`}
//               >
//                 <Image src={img} alt="thumb" width={60} height={80} className="object-contain" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: INFO */}
//         <div className="flex flex-col">
//           <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
//           <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

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

//           <p className="text-3xl font-bold mt-4 text-gray-900">₹{totalPrice.toLocaleString("en-IN")}.00</p>

//           {/* WEIGHT SELECTION */}
//           <div className="mt-6">
//             <p className="text-xl font-semibold mb-3 text-gray-900">Weight</p>
//             <div className="flex items-center gap-3">
//               {product.weights?.map((w, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedWeight(w)}
//                   className={`px-6 py-2.5 rounded font-semibold transition-all ${
//                     selectedWeight?.weight === w.weight ? "bg-[#3d5a68] text-white" : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {w.weight} kg
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* QUANTITY */}
//           <div className="mt-8 flex items-center gap-4">
//             <span className="text-lg font-medium">Quantity:</span>
//             <div className="flex items-center border border-gray-300 rounded bg-white">
//               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border-r">
//                 <Minus size={16} />
//               </button>
//               <span className="px-6 font-bold text-lg">{quantity}</span>
//               <button onClick={() => setQuantity(quantity + 1)} className="p-3 border-l">
//                 <Plus size={16} />
//               </button>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="mt-8 flex gap-4">
//             <button
//               onClick={() => handleAction("cart")}
//               disabled={buttonLoading}
//               className="bg-[#3d5a68] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#2d4550] flex-1 disabled:opacity-50"
//             >
//               {buttonLoading ? "Processing..." : "Add To Cart"}
//             </button>
//             <button
//               onClick={() => handleAction("buy")}
//               disabled={buttonLoading}
//               className="bg-[#fef3c7] text-gray-900 px-10 py-4 rounded font-bold text-lg hover:bg-[#fde68a] flex-1 border border-yellow-200 disabled:opacity-50"
//             >
//               Buy it now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="relative max-w-5xl w-full bg-white rounded-lg p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
//             >
//               <X size={24} />
//             </button>
//             <div className="flex items-center justify-center min-h-[500px]">
//               <Image
//                 src={images[selectedImageIndex]}
//                 alt={product.name}
//                 width={500}
//                 height={700}
//                 className="object-contain max-h-[600px]"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Star, Minus, Plus, X } from "lucide-react";

export default function ProductDetail({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setProduct("not-found");
          return;
        }

        const data = await res.json();
        setProduct(data);

        if (data.weights && data.weights.length > 0) {
          setSelectedWeight(data.weights[0]);
        }
      } catch (error) {
        console.error(error);
        setProduct("not-found");
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  // ================= ADD TO CART / BUY =================
  const handleAction = async (type) => {
    try {
      setButtonLoading(true);

      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You must be logged in to perform this action!");
        router.push("/login");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // include JWT
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
          weight: selectedWeight?.weight || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || data.error || "Action failed");
        return;
      }

      if (type === "buy") {
        router.push("/cart");
      } else {
        alert("Added to cart ✅");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3d5a68]" />
      </div>
    );
  }

  if (product === "not-found" || !product) return notFound();

  const currentUnitPrice = selectedWeight?.price || product.price || 0;
  const totalPrice = currentUnitPrice * quantity;
  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="wrapper mx-auto py-40 px-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: IMAGES */}
        <div className="space-y-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white rounded p-8 flex justify-center items-center min-h-[500px] cursor-pointer"
          >
            <Image
              src={images[selectedImageIndex]}
              alt={product.name}
              width={350}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`min-w-[110px] aspect-square bg-amber-50 rounded-lg border-2 flex items-center justify-center p-4 cursor-pointer ${
                  selectedImageIndex === i ? "border-yellow-500" : "border-yellow-100"
                }`}
              >
                <Image src={img} alt="thumb" width={60} height={80} className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

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

          <p className="text-3xl font-bold mt-4 text-gray-900">₹{totalPrice.toLocaleString("en-IN")}.00</p>

          {/* WEIGHT SELECTION */}
          <div className="mt-6">
            <p className="text-xl font-semibold mb-3 text-gray-900">Weight</p>
            <div className="flex items-center gap-3">
              {product.weights?.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedWeight(w)}
                  className={`px-6 py-2.5 rounded font-semibold transition-all ${
                    selectedWeight?.weight === w.weight ? "bg-[#3d5a68] text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {w.weight} kg
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-lg font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border-r">
                <Minus size={16} />
              </button>
              <span className="px-6 font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 border-l">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => handleAction("cart")}
              disabled={buttonLoading}
              className="bg-[#3d5a68] text-white px-10 py-4 rounded font-bold text-lg hover:bg-[#2d4550] flex-1 disabled:opacity-50"
            >
              {buttonLoading ? "Processing..." : "Add To Cart"}
            </button>
            <button
              onClick={() => handleAction("buy")}
              disabled={buttonLoading}
              className="bg-[#fef3c7] text-gray-900 px-10 py-4 rounded font-bold text-lg hover:bg-[#fde68a] flex-1 border border-yellow-200 disabled:opacity-50"
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <X size={24} />
            </button>
            <div className="flex items-center justify-center min-h-[500px]">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                width={500}
                height={700}
                className="object-contain max-h-[600px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}