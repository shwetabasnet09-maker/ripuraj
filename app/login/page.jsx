"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const [activeTab, setActiveTab] = useState("login");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Pulls a human-readable error message out of whatever shape the
  // backend returns (DRF errors can come as .detail, .error, .message,
  // .non_field_errors, or a field-specific object).
  const extractErrorMessage = (data) => {
    if (!data) return "Something went wrong. Please try again.";
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (data.error) return data.error;
    if (data.message) return data.message;
    if (Array.isArray(data.non_field_errors)) {
      return data.non_field_errors.join(" ");
    }
    // Field-level errors, e.g. { email: ["This field is required."] }
    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) {
      return `${firstKey}: ${data[firstKey].join(" ")}`;
    }
    return JSON.stringify(data);
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      });

      const data = await res.json();
      console.log("Register response:", res.status, data);

      if (!res.ok) {
        alert(extractErrorMessage(data));
        return;
      }

      alert("OTP sent!");
      setOtpSent(true);
    } catch (err) {
      console.error("Register request failed:", err);
      alert("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY ----------------
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts/verify-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await res.json();
      console.log("Verify response:", res.status, data);

      if (!res.ok) {
        alert(extractErrorMessage(data));
        return;
      }

      alert("Registration successful! Please login.");
      setActiveTab("login");
      setOtpSent(false);
    } catch (err) {
      console.error("Verify request failed:", err);
      alert("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", res.status, data);

      if (!res.ok) {
        alert(extractErrorMessage(data));
        return;
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert("Login successful ✅");
      router.push("/");
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28 pb-16 relative overflow-hidden">
      {/* Decorative bottom-left icon */}
      <div className="absolute bottom-0 left-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image
          src="/leftpea.png"
          alt=""
          width={160}
          height={160}
          className="w-full h-auto"
        />
      </div>

      {/* Decorative bottom-right icon */}
      <div className="absolute bottom-0 right-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image
          src="/rightpea.png"
          alt=""
          width={160}
          height={160}
          className="w-full h-auto"
        />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#2f5f73] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Login Page</span>
        </div>
        <div className="border-b border-gray-200 mt-4" />
      </div>

      {/* Login card */}
      <div className="flex items-center justify-center px-4 mt-12 relative z-10">
        <div className="w-full max-w-md bg-[#2f5f73] rounded-[35px] shadow-2xl p-8 md:p-10">
          {/* Tabs */}
          <div className="flex justify-center gap-10 mb-8 text-lg font-bold">
            <button
              onClick={() => setActiveTab("login")}
              className={`transition-colors ${
                activeTab === "login" ? "text-white" : "text-white/50"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`transition-colors ${
                activeTab === "register" ? "text-white" : "text-white/50"
              }`}
            >
              Register
            </button>
          </div>

          {/* ================= REGISTER ================= */}
          {activeTab === "register" && (
            <form className="space-y-4">
              <InputField
                name="username"
                placeholder="Username"
                handleChange={handleChange}
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                handleChange={handleChange}
              />
              <InputField
                name="phone"
                placeholder="Phone"
                handleChange={handleChange}
              />
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                handleChange={handleChange}
              />
              <InputField
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                handleChange={handleChange}
              />

              {!otpSent ? (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              ) : (
                <>
                  <InputField
                    name="otp"
                    placeholder="Enter OTP"
                    handleChange={handleChange}
                  />

                  <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                  >
                    {loading ? "Verifying..." : "Verify & Register"}
                  </button>
                </>
              )}
            </form>
          )}

          {/* ================= LOGIN ================= */}
          {activeTab === "login" && (
            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Email address <span className="text-red-300">*</span>
                </label>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email address"
                  handleChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Password <span className="text-red-300">*</span>
                </label>
                <InputField
                  name="password"
                  type="password"
                  placeholder="Password"
                  handleChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Remember me</span>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-white text-[#1a1a1a] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              <p className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
                Forgot email?
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({ name, type = "text", placeholder, handleChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-[#1a1a1a] placeholder:text-gray-400"
    />
  );
}
