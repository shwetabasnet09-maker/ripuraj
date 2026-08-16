"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DownloadButtons from "./DownloadButtons";

// Add any route prefixes here where the download bar should NOT appear.
// Matching is "starts with", so "/cart" also hides "/cart/checkout" etc.
const EXCLUDED_PATHS = [
  "/login",
  "/signup",
  "/register",
  "/auth",
  "/cart",
  "/checkout",
  "/order",
  "/orders",
  "/account",
];

export default function ScrollAwareDownloadButtons() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      setIsAtBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isExcluded = EXCLUDED_PATHS.some((path) => pathname?.startsWith(path));

  if (isExcluded) return null;

  return <DownloadButtons isAtBottom={isAtBottom} />;
}