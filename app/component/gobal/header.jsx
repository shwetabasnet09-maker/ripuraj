// import React from "react";
// import { ShoppingBag, User, Truck } from "lucide-react";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="absolute top-0 left-0 w-full z-50 py-10 bg-transparent">
      
//       {/* Main Rounded Container */}
//       <div className="wrapper mx-auto bg-white rounded-2xl shadow-sm px-6 py-3 flex items-center justify-between">
        
//         {/* Logo div */}
//         <div className="flex-shrink-0">
//           <img
//             src="/logo.png"   
//             alt="RIPURAJ"
//             className="h-16 w-auto object-contain"
//           />
//         </div>

//         {/* Navigation Menu */}
//         <nav className="hidden lg:flex items-center space-x-7">
//           {[
//             "Home",
//             "About us",
//             "Shop",
//             "Product",
//             "Event",
//             "Winner List",
//             "Contact Us",
//           ].map((item) => (
//             <a
//               key={item}
//               href={`${item.toLowerCase().replace(" ", "-")}`}
//               className="text-[#335B6E] hover:text-black font-medium text-[15px] transition-colors"
//             >
//               {item}
//             </a>
//           ))}
//         </nav>

//         {/* Right Side Actions */}
//         <div className="flex items-center space-x-5">
          
//           {/* Cashback Button */}
//           <button className="bg-[#335B6E] hover:bg-[#264554] text-white px-5 py-2.5 rounded-md font-semibold text-sm tracking-wide transition-colors">
//             CASHBACK
//           </button>

//           {/* Icons */}
//          <div className="flex items-center space-x-4 text-[#335B6E]">

//       <Link
//         href="/orders"
//         className="hover:opacity-70 transition-opacity"
//         aria-label="Orders"
//       >
//         <Truck className="w-6 h-6 stroke-[1.5]" />
//       </Link>

//       <Link
//         href="/cart"
//         className="hover:opacity-70 transition-opacity"
//         aria-label="Cart"
//       >
//         <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
//       </Link>

//       <Link
//         href="/account"
//         className="hover:opacity-70 transition-opacity"
//         aria-label="Account"
//       >
//         <User className="w-6 h-6 stroke-[1.5]" />
//       </Link>

//     </div>

//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import React, { useState } from "react";
import { ShoppingBag, User, Truck, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/about-us" },
    { name: "Shop", link: "/shop" },
    { name: "Product", link: "/product" },
    { name: "Event", link: "/event" },
    { name: "Winner List", link: "/winner-list" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 bg-transparent">
      <div className="wrapper bg-white rounded-2xl shadow-sm px-4 md:px-6 py-3">
        
        {/* Top Row */}
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="RIPURAJ"
              width={150}
              height={60}
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-[#335B6E] hover:text-black font-medium text-[15px] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            
            {/* Cashback Button */}
            <button className="hidden sm:block bg-[#335B6E] hover:bg-[#264554] text-white px-4 md:px-5 py-2 rounded-md font-semibold text-sm transition-colors">
              CASHBACK
            </button>

            {/* Icons (hidden on small mobile) */}
            <div className="hidden md:flex items-center space-x-4 text-[#335B6E]">
              <Link href="/orders">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </Link>

              <Link href="/cart">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </Link>

              <Link href="/account">
                <User className="w-6 h-6 stroke-[1.5]" />
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden text-[#335B6E]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 border-t pt-4 space-y-4">
            
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="block text-[#335B6E] font-medium text-[15px]"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Icons */}
            <div className="flex items-center space-x-6 pt-2 text-[#335B6E]">
              <Link href="/orders">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </Link>
              <Link href="/cart">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </Link>
              <Link href="/account">
                <User className="w-6 h-6 stroke-[1.5]" />
              </Link>
            </div>

            {/* Cashback Button Mobile */}
            <button className="w-full bg-[#335B6E] text-white py-2 rounded-md font-semibold text-sm">
              CASHBACK
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
