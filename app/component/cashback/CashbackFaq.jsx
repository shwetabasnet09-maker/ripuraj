"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CashbackFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does TopCashback make money?",
      answer:
        "We earn a small commission from retailers when you shop through our links, and we share the majority of that back with you as cashback.",
    },
    {
      question: "Will it cost me anything?",
      answer:
        "No, joining and using our cashback program is completely free. There are no hidden fees or charges.",
    },
    {
      question: "How does cashback work?",
      answer:
        "Simply buy the qualifying product, scan the QR code, complete your details, and your cashback is credited directly to your bank account via UPI.",
    },
    {
      question: "When will I actually get my cashback?",
      answer:
        "Cashback is typically processed within 7-10 working days after successful verification of your purchase and details.",
    },
    {
      question: "What can I get cashback on?",
      answer:
        "Cashback is available on every 5 Kg pack of Ripuraj Sonashakti purchased during the offer period.",
    },
    {
      question: "What payout methods are available?",
      answer:
        "Currently, cashback is paid out directly to your UPI-linked bank account.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1e3a4c] mb-8 md:mb-10">
          Frequently Asked Questions
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 items-start">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#2f5f73] rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium text-sm sm:text-[15px] pr-3">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-white/80 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 text-white/90 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
