"use client";
import { useState } from "react";
import Link from "next/link";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="wrapper py-40 px-4">

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-[#2C5C6E]">
          Home
        </Link>
        <span className="mx-2">||</span>
        <span className="text-[#2C5C6E] font-medium capitalize">
          {activeTab}
        </span>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md bg-[#E6D8BD] rounded-3xl shadow-xl border-4 border-[#2C5C6E] p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Register
          </h2>

          <form className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Gmail Address *
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
              />
            </div>

            {/* Phone with Country */}
            <div>
              <label className="block mb-2 font-medium">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select className="p-3 rounded-xl border bg-gray-100">
                  <option value="+977">🇳🇵 +977 (Nepal)</option>
                  <option value="+91">🇮🇳 +91 (India)</option>
                </select>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="flex-1 p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password *
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password *
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
              />
            </div>

            {/* OTP Section */}
            {!otpSent ? (
              <button
                type="button"
                onClick={() => setOtpSent(true)}
                className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl hover:opacity-90"
              >
                Send Verification Code
              </button>
            ) : (
              <>
                <div>
                  <label className="block mb-2 font-medium">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full p-3 rounded-xl border bg-gray-100 focus:ring-2 focus:ring-[#2C5C6E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:opacity-90"
                >
                  Verify & Register
                </button>
              </>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
