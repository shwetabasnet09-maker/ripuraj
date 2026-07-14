import Bannermain from "../component/global/Banner";
import ProductCard from "../component/product/ProductCard";
import Image from "next/image";
import { products } from "../data/date";

const ProductsPage = () => {
  return (
    <>
      <Bannermain
        backgroundImg="/About%20Banner.webp"
        title="Our Products"
      />

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

        <div className="container mx-auto relative z-10">

          {/* Heading */}
          <p className="text-center uppercase text-sm tracking-widest text-gray-500 mb-2">
            Explore Our Products Range
          </p>

          <h1 className="text-center text-3xl md:text-4xl font-semibold text-[#2f5f73] mb-12">
            High Quality Ripuraj Premium Rice
          </h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={{
                  ...product,
                  weight: product.weights?.join(" - ") || "5Kg - 20Kg",
                }}
              />
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
