"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, User, Truck, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages WITHOUT a full-bleed hero background image behind the header.
  // On these, always show a solid header + alternate logo, instead of
  // the transparent-over-image style used elsewhere.
  const noHeroBackground =
    pathname?.startsWith("/shop/") || // internal product detail pages
    pathname === "/login" ||
    pathname === "/cart" ||
    pathname?.startsWith("/orders") ||
    pathname?.startsWith("/dashboard");

  // Combine scroll-based sticky state with the route-based override —
  // either condition makes the header render "solid".
  const solid = isSticky || noHeroBackground;

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/about-us" },
    { name: "Shop", link: "/shop" },
    { name: "Product", link: "/product" },
    { name: "Event", link: "/latest-news" },
    { name: "Sustainability", link: "/sustainability" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="wrapper px-4 md:px-6">
        
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
          <nav
            className={`hidden lg:flex items-center space-x-7 rounded-full px-6 py-3 transition-all duration-300 ${
              solid
                ? "bg-white border border-[#EDEDED]"
                : "border border-[#ffffff40] backdrop-blur-md"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={`text-[15px] transition-colors ${
                  solid
                    ? "text-[#335B6E] hover:text-black"
                    : "text-white hover:text-[#F6F0DE]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            
            {/* Icons */}
            <div
              className={`hidden md:flex items-center space-x-4 transition-colors ${
                solid ? "text-[#335B6E]" : "text-white"
              }`}
            >
              <Link href="/orders">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </Link>

              <Link href="/cart">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </Link>

              <Link href="/login">
                <User className="w-6 h-6 stroke-[1.5]" />
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className={`lg:hidden ${
                solid ? "text-[#335B6E]" : "text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-lg p-5 space-y-4">
            
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

            {/* Cashback Button */}
            <button className="w-full bg-[#335B6E] text-white py-2 rounded-md font-semibold text-sm">
              CASHBACK
            </button>
          </div>
        )}
      </div>
    </header>
  );
}