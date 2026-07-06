import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative h-[318px] bg-[#EDEEF0] flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={260}
            className="object-contain h-[318px] w-auto transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="pt-4 text-left">
          <h3 className="font-semibold text-[#2f5f73] text-sm leading-snug">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {product.weight}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;