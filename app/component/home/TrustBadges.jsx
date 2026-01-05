import React from 'react'

const TrustBadges = () => {
  return (
    <section className="bg-amber-50 py-16 px-4">
      <div className="wrapper text-center">
        {/* Available At Badge */}
        <div className="inline-block bg-white px-6 py-2 rounded-full text-[18px] font-medium mb-6 text-bold ">
          Available At
        </div>
        
        {/* Main Heading */}
        <h2 className="text-[35px] font-bold  mb-4 ">
          Trusted by Global Brands & Local Businesses Alike
        </h2>
        
        {/* Subheading */}
        <p className=" text-[17px] max-w-4xl mx-auto mb-12">
          From international fashion houses to family-run cafés, thousands of businesses choose Bee Dee Bags
          to deliver packaging that's reliable, stylish, and sustainable.
        </p>
        
        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {/* Blinkit */}
          <div className="flex items-center">
            <span className="text-4xl font-bold text-gray-900">blink</span>
            <span className="text-4xl font-bold text-green-500">it</span>
          </div>
          
          {/* Smart Bazaar */}
          <div className="bg-red-600 px-6 py-3 rounded">
            <div className="text-white text-center">
              <div className="text-xs font-semibold">SMART</div>
              <div className="text-xl font-bold">BAZAAR</div>
            </div>
          </div>
          
          {/* JioMart */}
          <div className="flex items-center gap-2">
            <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center">
              <div className="bg-white rounded-full w-6 h-6"></div>
            </div>
            <span className="text-3xl font-bold text-gray-900">JioMart</span>
          </div>
          
          {/* Swiggy Instamart */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 rounded-lg w-10 h-10 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div>
              <div className="text-orange-500 font-bold text-xl leading-none">Swiggy</div>
              <div className="text-orange-500 font-bold text-sm">Instamart</div>
            </div>
          </div>
          
          {/* BigBasket */}
          <div className="flex items-center gap-2">
            <div className="bg-green-600 rounded-lg w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">bb</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">bigbasket</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustBadges