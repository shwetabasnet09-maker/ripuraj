import Bannermain from "../component/gobal/Banner";
import ProductCard from "../component/product/ProductCard";



const ProductsPage = () => {
  return (
    <>
      <Bannermain
        backgroundImg="/banner-products.jpg"
        title="Our Products"
      />

      <div className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            bgImage="/bg-light.png"
            productImage="/Mahashakti.jpg"
            title="Ripuraj Sonashakti Premium Jeera Parboiled Rice"
            weight="5Kg - 20Kg"
          />
           <ProductCard
            bgImage="/bg-light.png"
            productImage="/Mahashakti.jpg"
            title="Ripuraj Sonashakti Premium Jeera Parboiled Rice"
            weight="5Kg - 20Kg"
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
