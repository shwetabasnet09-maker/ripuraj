import Image from "next/image";
import { CheckCircle } from "lucide-react";

const WhatWeDo = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="wrapper">
        
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          What We Do
        </h2>

        {/* Description */}
        <p className="text-center max-w-5xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed mb-8">
          At Ripuraj Agro Pvt. Ltd., we specialize in the production, milling,
          refinement, and delivery of high-quality rice across various segments
          of society and multiple states. Our premium basmati and non-basmati
          rice varieties offer the perfect blend of taste, nutrient content,
          and texture. For Forty-Six years, we have consistently delivered
          top-quality rice. Our commitment to excellence is evident in the
          purity of our intentions and the superior quality of our products,
          making us renowned across many states. This journey of delivering
          the best rice continues, as we strive to meet and exceed the
          expectations of our valued customers.
        </p>

        {/* Features */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          {[
            "Biodynamic food",
            "Organic gardening",
            "Organic food certification",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="text-teal-600 w-6 h-6" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="w-full rounded-2xl overflow-hidden ">
          <Image
            src="/what-we-do.png"  
            alt="Rice processing plant"
            width={1400}
            height={700}
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default WhatWeDo;
