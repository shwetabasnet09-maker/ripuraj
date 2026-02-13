import Image from "next/image";
import Bannermain from "../gobal/Banner";

const ProductCard = ({ bgImage, productImage, title, weight }) => {
  return (
    <>
    
    <div className="bg-white rounded-xl shadow-md overflow-hidden group">
      {/* Image div */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative w-40 h-56 transition-transform duration-500 ease-in-out group-hover:scale-110">
          <Image
            src={productImage}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{weight}</p>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
