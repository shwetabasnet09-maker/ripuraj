


// // import Image from "next/image";
// // import Link from "next/link"; 

// // const ProductCard = ({ bgImage, productImage, title, weight, slug }) => {
// //   return (
// //     <Link href={`/product/${slug}`}> 
// //       <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer">
// //         <div
// //           className="relative h-72 bg-cover bg-center flex items-center justify-center"
// //           style={{ backgroundImage: `url(${bgImage})` }}
// //         >
// //           <div className="relative w-40 h-56 transition-transform duration-500 ease-in-out group-hover:scale-110">
// //             <Image
// //               src={productImage}
// //               alt={title}
// //               fill
// //               className="object-contain"
// //             />
// //           </div>
// //         </div>

// //         <div className="p-4 text-center">
// //           <h3 className="font-semibold text-gray-800 text-sm md:text-base">
// //             {title}
// //           </h3>
// //           <p className="text-gray-500 text-sm mt-1">{weight}</p>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default ProductCard;

// import Image from "next/image";
// import Link from "next/link"; 

// const ProductCard = ({ bgImage, productImage, title, weight, slug }) => {
//   return (
//     // Ensure slug is passed correctly from the parent component
//     <Link href={`/product/${slug}`}> 
//       <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer">
//         <div
//           className="relative h-72 bg-cover bg-center flex items-center justify-center"
//           style={{ backgroundImage: `url(${bgImage})` }}
//         >
//           <div className="relative w-40 h-56 transition-transform duration-500 ease-in-out group-hover:scale-110">
//             <Image
//               src={productImage}
//               alt={title}
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>

//         <div className="p-4 text-center">
//           <h3 className="font-semibold text-gray-800 text-sm md:text-base">
//             {title}
//           </h3>
//           <p className="text-gray-500 text-sm mt-1">{weight}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer hover:shadow-lg transition">

        <div className="relative h-64 bg-gray-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={300}
            className="object-contain group-hover:scale-105 transition"
          />
        </div>

        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-800">
            {product.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {product.weight}
          </p>

          <p className="text-[#3a6372] font-bold mt-2">
            Rs {product.price}
          </p>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;