import Image from "next/image";
import Link from "next/link";
import { products } from "../data/date";
import Bannermain from "../component/gobal/Banner";


export default function ShopPage() {
  return (
    <>
      <Bannermain
        backgroundImg="/aboutbanner.png"
        title="Shop"
      />
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

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
                <div className=" rounded-xl  flex rouned-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={350}
                  />

                </div>

                <h3 className="mt-4 font-semibold text-[#2f5f73] text-sm">
                  {product.name}
                </h3>

                {/* <p className="text-xs text-gray-500 mt-1">
                5Kg – 20Kg
              </p>

              <Link
                href={`/shop/${product.slug}`}
                className="mt-4 inline-block bg-[#2f5f73] text-white text-xs px-4 py-2 rounded"
              >
                Add To Cart
              </Link> */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">
                    5Kg – 20Kg
                  </p>

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
