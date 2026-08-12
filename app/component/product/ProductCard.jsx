import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative w-full aspect-[296/318] bg-[#EDEEF0] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
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