"use client";

import { useState } from "react";
import { X, FileText } from "lucide-react";

const DownloadButtons = ({ isAtBottom = false }) => {
  const items = [
    {
      label: "Annual Report",
      href: "/Annual Report.pdf",
    },
    {
      label: "Product Catalogue",
      href: "/Ripuraj%20Cataloug.pdf",
    },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const openModal = (item) => {
    setActiveItem(item);
    setForm({ name: "", email: "", phone: "" });
    setError("");
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Fire-and-forget: don't let a CORS/network hiccup on the logging
      // call block the actual file download. Google Apps Script exec
      // endpoints often don't return usable CORS headers from the browser,
      // which previously caused this fetch to throw and abort the download.
      fetch(
        "https://script.google.com/macros/s/AKfycbxkw-ynTxIoLOrHElLP6RbCXBEcIrgX2Iz7gEw6e98DzqBoG4gxxVxbCO98vypQ3oF6pQ/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ ...form, file: activeItem.label }),
        }
      ).catch(() => {
        // Swallow logging errors silently — the download should still happen.
      });

      const link = document.createElement("a");
      link.href = activeItem.href;
      link.download = "";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      closeModal();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky pill bar — single row on ALL screen sizes,
          width shrinks to fit content instead of stacking/stretching.
          Position now driven by isAtBottom prop passed from the parent
          scroll-aware wrapper, since this element owns its own `fixed`
          positioning (a wrapping fixed div can't override it). */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-40 w-full px-3 sm:px-0 sm:w-auto flex justify-center transition-all duration-300 ${
          isAtBottom ? "bottom-[8rem]" : "bottom-3 sm:bottom-8"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex flex-row items-center justify-center bg-[#1f3a42]/70 backdrop-blur-md border border-white/10 rounded-full shadow-lg p-1.5 w-fit max-w-full">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => openModal(item)}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 font-objective uppercase tracking-wide text-[10px] xs:text-xs sm:text-sm font-bold text-[#f4efe6] px-2.5 xs:px-4 sm:px-7 py-2.5 sm:py-4 rounded-full whitespace-nowrap hover:bg-white/10 active:bg-white/15 transition-colors duration-200 ${
                index > 0 ? "border-l border-white/20" : ""
              }`}
            >
              <FileText size={14} className="shrink-0 sm:hidden" />
              <FileText size={16} className="shrink-0 hidden sm:block" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full sm:max-w-md bg-[#f4efe6] rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 xs:p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-[#1f3a42] hover:opacity-70 active:opacity-50 transition-opacity"
            >
              <X size={22} />
            </button>

            <div className="sm:hidden w-10 h-1 rounded-full bg-[#1f3a42]/15 mx-auto mb-4" />

            <h2 className="font-objective text-base xs:text-lg sm:text-xl font-bold text-[#1f3a42] mb-1 pr-8">
              Download {activeItem.label}
            </h2>
            <p className="text-xs xs:text-sm text-[#1f3a42]/70 mb-5 sm:mb-6">
              Please share a few details before downloading.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs xs:text-sm font-semibold text-[#1f3a42] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-3.5 sm:px-4 py-2.5 text-sm sm:text-base text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-semibold text-[#1f3a42] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  inputMode="email"
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-3.5 sm:px-4 py-2.5 text-sm sm:text-base text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-semibold text-[#1f3a42] mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-3.5 sm:px-4 py-2.5 text-sm sm:text-base text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="+91 00000 00000"
                />
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1f3a42] text-[#f4efe6] font-objective uppercase tracking-wide font-bold text-xs sm:text-sm py-3 rounded-lg hover:bg-[#16292f] active:bg-[#0f1e22] transition-colors disabled:opacity-60"
              >
                {submitting ? "Please wait..." : "Submit & Download"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButtons;