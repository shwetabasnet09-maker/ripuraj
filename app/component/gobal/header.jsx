import React from "react";
import { ShoppingBag, User, Truck } from "lucide-react";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-10 bg-transparent">
      
      {/* Main Rounded Container */}
      <div className="wrapper mx-auto bg-white rounded-2xl shadow-sm px-6 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png"   // ✅ put logo inside /public/images
            alt="RIPURAJ"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-7">
          {[
            "Home",
            "About us",
            "Shop",
            "Product",
            "Event",
            "Winner List",
            "Contact Us",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-[#335B6E] hover:text-black font-medium text-[15px] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-5">
          
          {/* Cashback Button */}
          <button className="bg-[#335B6E] hover:bg-[#264554] text-white px-5 py-2.5 rounded-md font-semibold text-sm tracking-wide transition-colors">
            CASHBACK
          </button>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-[#335B6E]">
            <button className="hover:opacity-70 transition-opacity">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <User className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
