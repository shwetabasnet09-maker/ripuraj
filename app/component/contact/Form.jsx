"use client";

import React, { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import AnimateIn from "./AnimateIn";

const RipurajContactPage = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulated submit — replace with real API call when ready
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", state: "", message: "" });

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="w-full bg-white px-4 py-10 md:py-14 space-y-10  font-sans overflow-hidden">
      {/* SECTION 1: CONTACT FORM & INFO */}
      <AnimateIn>
        <div className="relative flex flex-col md:flex-row w-full max-w-7xl mx-auto rounded-[50px] overflow-hidden bg-[#FFF5E1] shadow-xl">
          {/* Decorative floating blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#2D5A71]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-72 h-72 bg-[#2D5A71]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Side: Dark Blue Form */}
          <div className="relative bg-[#2D5A71] p-8 md:p-14 w-full md:w-[55%] rounded-[50px] z-10">
            <AnimateIn delay={100}>
              <div className="mb-8">
                <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-2">
                  HAVE QUESTIONS?
                </h3>
                <h2 className="text-white text-4xl md:text-5xl font-bold">
                  Leave A Message
                </h2>
              </div>
            </AnimateIn>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimateIn delay={150}>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-white focus:scale-[1.02] focus:shadow-lg"
                  />
                </div>
              </AnimateIn>

              <AnimateIn delay={200}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="text-gray-300 text-sm mb-2 block ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-white focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-300 text-sm mb-2 block ml-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-white focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={250}>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block ml-1">
                    Select State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none outline-none transition-all duration-300 focus:ring-2 focus:ring-white focus:scale-[1.02] focus:shadow-lg"
                  />
                </div>
              </AnimateIn>

              <AnimateIn delay={300}>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block ml-1">
                    Message Us
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-white focus:scale-[1.02] focus:shadow-lg"
                  />
                </div>
              </AnimateIn>

              <AnimateIn delay={350}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full font-bold py-4 rounded-xl mt-4 text-lg transition-all duration-300 active:scale-95 ${
                    status === "success"
                      ? "bg-green-400 text-[#2D5A71]"
                      : "bg-white text-[#2D5A71] hover:bg-opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                    ? "Message Sent ✓"
                    : "Submit Here"}
                </button>
              </AnimateIn>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="relative p-8 md:p-14 w-full md:w-[45%] flex flex-col justify-center z-10">
            <AnimateIn delay={200}>
              <h2 className="text-[#2D5A71] text-3xl md:text-4xl font-bold mb-4">
                Contact Information
              </h2>
              <p className="text-[#2D5A71] opacity-80 mb-12 text-lg leading-snug">
                We are a happy service by compiling each piece of rice and
                delivering pearl with faith
              </p>
            </AnimateIn>

            <div className="space-y-10">
              <AnimateIn delay={250}>
                <div className="group flex items-start gap-5">
                  <div className="p-3 rounded-full bg-[#2D5A71]/10 transition-all duration-300 group-hover:bg-[#2D5A71] group-hover:scale-110">
                    <Phone className="text-[#2D5A71] w-6 h-6 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D5A71] text-xl">
                      Hotline
                    </h4>
                    <p className="text-[#2D5A71] text-lg">+91 9905555666</p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={300}>
                <div className="group flex items-start gap-5">
                  <div className="p-3 rounded-full bg-[#2D5A71]/10 transition-all duration-300 group-hover:bg-[#2D5A71] group-hover:scale-110">
                    <MapPin className="text-[#2D5A71] w-6 h-6 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D5A71] text-xl">
                      Head Office
                    </h4>
                    <p className="text-[#2D5A71] text-lg leading-relaxed">
                      RIPURAJ AGRO PVT LTD NH-527D,
                      <br />
                      Village Amodei Anchal, Ramgarhwa,
                      <br />
                      District East Champaran Bihar - 845433
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={350}>
                <div className="group flex items-start gap-5">
                  <div className="p-3 rounded-full bg-[#2D5A71]/10 transition-all duration-300 group-hover:bg-[#2D5A71] group-hover:scale-110">
                    <Mail className="text-[#2D5A71] w-6 h-6 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D5A71] text-xl">
                      Official Email
                    </h4>
                    <p className="text-[#2D5A71] text-lg">
                      sales@ripurajagro.com
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default RipurajContactPage;
