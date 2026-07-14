"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, User, Truck, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [csrDropdownOpen, setCsrDropdownOpen] = useState(false);
  const [mobileCsrOpen, setMobileCsrOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef(null);

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

  const navItems = [{ name: "Home", link: "/" }, { name: "About us", link: "/about-us" }, { name: "Shop", link: "/shop" }, { name: "Product", link: "/product" }, { name: "Event", dropdown: [{ name: "CSR Activity", link: "/csr" }, { name: "Latest News", link: "/latest-news" }, { name: "Event", link: "/event" },] }, { name: "Sustainability", link: "/sustainability" }, { name: "Contact Us", link: "/contact-us" },];

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCsrDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCsrDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${solid ? "bg-white shadow-md py-3" : "bg-transparent py-6"
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
            className={`hidden lg:flex items-center space-x-7 rounded-full px-6 py-3 transition-all duration-300 ${solid
                ? "bg-white border border-[#EDEDED]"
                : "border border-[#ffffff40] backdrop-blur-md"
              }`}
          >
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className={`flex items-center gap-1 text-[15px] transition-colors ${solid
                        ? "text-[#335B6E] hover:text-black"
                        : "text-white hover:text-[#F6F0DE]"
                      }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${csrDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${csrDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-[#EDEDED] py-2 min-w-[180px]">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.link}
                          className="block px-5 py-2.5 text-[14px] text-[#335B6E] hover:bg-[#F5F5F5] hover:text-black transition-colors whitespace-nowrap"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`text-[15px] transition-colors ${solid
                      ? "text-[#335B6E] hover:text-black"
                      : "text-white hover:text-[#F6F0DE]"
                    }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Icons */}
            <div
              className={`hidden md:flex items-center space-x-4 transition-colors ${solid ? "text-[#335B6E]" : "text-white"
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
              className={`lg:hidden ${solid ? "text-[#335B6E]" : "text-white"
                }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — full-height slide-in drawer */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
              className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              <div className="flex flex-col h-full">
                {/* Header row with close button */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-[#EDEDED]">
                  <Image
                    src="/logo.png"
                    alt="RIPURAJ"
                    width={110}
                    height={44}
                    className="h-10 w-auto object-contain"
                  />

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#335B6E] hover:text-black transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav list */}
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                  {navItems.map((item) =>
                    item.dropdown ? (
                      <div key={item.name}>
                        <button
                          onClick={() => setMobileCsrOpen(!mobileCsrOpen)}
                          className="w-full flex items-center justify-between py-3 text-[#335B6E] font-medium text-[15px] border-b border-[#F5F5F5]"
                        >
                          {item.name}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${mobileCsrOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {mobileCsrOpen && (
                          <div className="pl-4 py-2 space-y-1 bg-[#FAFAFA]">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.link}
                                onClick={() => setIsOpen(false)}
                                className="block py-2.5 text-[#335B6E]/80 text-[14px]"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-[#335B6E] font-medium text-[15px] border-b border-[#F5F5F5]"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>

                {/* Footer: icons + cashback button */}
                <div className="px-5 py-5 border-t border-[#EDEDED] space-y-5">
                  <div className="flex items-center gap-6 text-[#335B6E]">
                    <Link href="/orders" onClick={() => setIsOpen(false)}>
                      <Truck className="w-6 h-6 stroke-[1.5]" />
                    </Link>

                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                    </Link>

                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <User className="w-6 h-6 stroke-[1.5]" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}