"use client";

import { useState } from "react";
import { X, FileText } from "lucide-react";

const DownloadButtons = () => {
  const items = [
    {
      label: "Annual Report",
      href: "/Annual Income.pdf",
    },
    {
      label: "Product Catalogue",
      href: "/Ripuraj Cataloug.pdf",
    },
  ];

  // Which item was clicked (null = modal closed)
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
      // Send the lead to Google Sheets via Apps Script webhook.
      // Replace the URL below with your own deployed Web App URL from Step 3.
      await fetch(
        "https://script.google.com/macros/s/AKfycbxkw-ynTxIoLOrHElLP6RbCXBEcIrgX2Iz7gEw6e98DzqBoG4gxxVxbCO98vypQ3oF6pQ/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ ...form, file: activeItem.label }),
        }
      );

      // Trigger the PDF download
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
      {/* Sticky pill buttons */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 w-full px-4 sm:w-auto sm:px-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#1f3a42]/70 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full shadow-lg p-1.5 gap-1 sm:gap-0 max-w-sm mx-auto sm:max-w-none">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => openModal(item)}
              className={`flex items-center justify-center gap-2 font-serif uppercase tracking-wide text-xs sm:text-sm font-bold text-[#f4efe6] px-4 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-full whitespace-nowrap hover:bg-white/10 transition-colors duration-200 ${
                index > 0 ? "sm:border-l border-white/20" : ""
              }`}
            >
              <FileText size={16} className="shrink-0" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md bg-[#f4efe6] rounded-2xl shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#1f3a42] hover:opacity-70 transition-opacity"
            >
              <X size={22} />
            </button>

            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1f3a42] mb-1 pr-8">
              Download {activeItem.label}
            </h2>
            <p className="text-sm text-[#1f3a42]/70 mb-6">
              Please share a few details before downloading.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1f3a42] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-4 py-2.5 text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1f3a42] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-4 py-2.5 text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1f3a42] mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#1f3a42]/20 px-4 py-2.5 text-[#1f3a42] focus:outline-none focus:ring-2 focus:ring-[#1f3a42]/40"
                  placeholder="+91 00000 00000"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1f3a42] text-[#f4efe6] font-serif uppercase tracking-wide font-bold text-sm py-3 rounded-lg hover:bg-[#16292f] transition-colors disabled:opacity-60"
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