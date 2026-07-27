"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Info, X } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const INDIAN_STATES = [
  "Delhi", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// ---------------- TOAST NOTIFICATION SYSTEM ----------------
const TOAST_STYLES = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-green-500",
    bg: "bg-white",
    border: "border-l-4 border-green-500",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-500",
    bg: "bg-white",
    border: "border-l-4 border-red-500",
  },
  info: {
    icon: Info,
    iconColor: "text-[#2f5f73]",
    bg: "bg-white",
    border: "border-l-4 border-[#2f5f73]",
  },
};

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 w-[90vw] max-w-sm">
      {toasts.map((toast) => {
        const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className={`${style.bg} ${style.border} rounded-xl shadow-2xl p-4 flex items-start gap-3 animate-toast-in`}
          >
            <Icon size={22} className={`${style.iconColor} flex-shrink-0 mt-0.5`} />
            <p className="text-sm text-[#1a1a1a] font-medium leading-relaxed flex-1">
              {toast.message}
            </p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-toast-in {
          animation: toastIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) router.replace("/dashboard");
  }, [router]);

  // ---------------- Toast state + helper ----------------
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [activeTab, setActiveTab] = useState("login");
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [panError, setPanError] = useState("");
  const [stepError, setStepError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "", username: "", email: "", phone: "",
    password: "", confirm_password: "",
    street: "", city: "", state: "",
    otp: "",
    loginId: "",
    account_type: "customer",
    business_name: "", pan_number: "", gst_number: "",
    store_address: "", same_as_personal_address: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "pan_number") setPanError("");
  };

  const extractErrorMessage = (data) => {
    if (!data) return "Something went wrong. Please try again.";
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (data.error) return data.error;
    if (data.message) return data.message;
    if (Array.isArray(data.non_field_errors)) return data.non_field_errors.join(" ");
    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) return `${firstKey}: ${data[firstKey].join(" ")}`;
    return JSON.stringify(data);
  };

  const totalSteps = formData.account_type === "reseller" ? 3 : 2;

  const goNext = () => {
    setStepError("");

    if (step === 1) {
      if (!formData.full_name || !formData.username || !formData.email || !formData.phone || !formData.password || !formData.confirm_password) {
        setStepError("Please fill in all fields to continue.");
        return;
      }
      if (formData.password !== formData.confirm_password) {
        setStepError("Passwords don't match.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.street || !formData.city || !formData.state) {
        setStepError("Please complete your address to continue.");
        return;
      }
    }

    setStep((s) => s + 1);
  };

  const goBack = () => {
    setStepError("");
    setStep((s) => Math.max(1, s - 1));
  };

  // ---------------- REGISTER (final submit) ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.account_type === "reseller") {
      const pan = formData.pan_number.trim().toUpperCase();
      if (!pan) {
        setPanError("PAN number is required for reseller accounts.");
        return;
      }
      if (!PAN_REGEX.test(pan)) {
        setPanError("Invalid PAN format. Expected: ABCDE1234F");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirm_password,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        account_type: formData.account_type,
      };

      if (formData.account_type === "reseller") {
        payload.business_name = formData.business_name;
        payload.pan_number = formData.pan_number.trim().toUpperCase();
        payload.gst_number = formData.gst_number || null;
        payload.store_address = formData.same_as_personal_address
          ? formData.street
          : formData.store_address;
      }

      const res = await fetch(`${API_BASE_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Register response:", res.status, data);

      if (!res.ok) {
        showToast(extractErrorMessage(data), "error");
        return;
      }

      showToast("OTP sent! Check your email.", "success");
      setOtpSent(true);
    } catch (err) {
      console.error("Register request failed:", err);
      showToast("Could not reach the server. Check your connection and try again.", "error");
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
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await res.json();
      console.log("Verify response:", res.status, data);

      if (!res.ok) {
        showToast(extractErrorMessage(data), "error");
        return;
      }

      showToast(
        formData.account_type === "reseller"
          ? "Registration successful! Your reseller account is pending verification."
          : "Registration successful! Please login.",
        "success"
      );
      setActiveTab("login");
      setOtpSent(false);
      setStep(1);
    } catch (err) {
      console.error("Verify request failed:", err);
      showToast("Could not reach the server. Check your connection and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN (email OR username) ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isEmail = formData.loginId.includes("@");

      const loginPayload = isEmail
        ? { email: formData.loginId, password: formData.password }
        : { username: formData.loginId, password: formData.password };

      const res = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();
      console.log("Login response:", res.status, data);

      if (!res.ok) {
        showToast(extractErrorMessage(data), "error");
        return;
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      showToast("Login successful!", "success");
      setTimeout(() => router.push("/"), 800);
    } catch (err) {
      console.error("Login request failed:", err);
      showToast("Could not reach the server. Check your connection and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28 pb-16 relative overflow-hidden">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="absolute bottom-0 left-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image src="/leftpea.png" alt="" width={160} height={160} className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 right-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image src="/rightpea.png" alt="" width={160} height={160} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#2f5f73] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Login Page</span>
        </div>
        <div className="border-b border-gray-200 mt-4" />
      </div>

      <div className="flex items-center justify-center px-4 mt-12 relative z-10">
        <div className="w-full max-w-md bg-[#2f5f73] rounded-[35px] shadow-2xl p-8 md:p-10">
          {/* Tabs */}
          <div className="flex justify-center gap-10 mb-8 text-lg font-bold">
            <button
              onClick={() => { setActiveTab("login"); setStep(1); setOtpSent(false); }}
              className={`transition-colors ${activeTab === "login" ? "text-white" : "text-white/50"}`}
            >
              Login
            </button>
            <button
              onClick={() => { setActiveTab("register"); setStep(1); setOtpSent(false); }}
              className={`transition-colors ${activeTab === "register" ? "text-white" : "text-white/50"}`}
            >
              Register
            </button>
          </div>

          {/* ================= REGISTER ================= */}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!otpSent ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i + 1 === step ? "w-8 bg-white" : i + 1 < step ? "w-1.5 bg-white/70" : "w-1.5 bg-white/25"
                        }`}
                      />
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 font-medium text-white text-sm">
                          Account Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, account_type: "customer" })}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                              formData.account_type === "customer"
                                ? "bg-white text-[#2f5f73] border-white"
                                : "bg-transparent text-white/70 border-white/30 hover:border-white/60"
                            }`}
                          >
                            Normal Customer
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, account_type: "reseller" })}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                              formData.account_type === "reseller"
                                ? "bg-white text-[#2f5f73] border-white"
                                : "bg-transparent text-white/70 border-white/30 hover:border-white/60"
                            }`}
                          >
                            Reseller
                          </button>
                        </div>
                      </div>

                      <InputField name="full_name" placeholder="Full Name" value={formData.full_name} handleChange={handleChange} />
                      <InputField name="username" placeholder="Username" value={formData.username} handleChange={handleChange} />
                      <InputField name="email" type="email" placeholder="Email address" value={formData.email} handleChange={handleChange} />
                      <InputField name="phone" placeholder="Phone" value={formData.phone} handleChange={handleChange} />
                      <InputField name="password" type="password" placeholder="Password" value={formData.password} handleChange={handleChange} />
                      <InputField name="confirm_password" type="password" placeholder="Confirm Password" value={formData.confirm_password} handleChange={handleChange} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-white font-semibold text-sm">Your Address</p>

                      <InputField name="street" placeholder="Street Address" value={formData.street} handleChange={handleChange} />

                      <div className="grid grid-cols-2 gap-3">
                        <InputField name="city" placeholder="City" value={formData.city} handleChange={handleChange} />
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-[#1a1a1a] text-sm"
                        >
                          <option value="">State</option>
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 3 && formData.account_type === "reseller" && (
                    <div className="space-y-4">
                      <p className="text-white font-semibold text-sm">Reseller Details</p>

                      <InputField name="business_name" placeholder="Business / Store Name" value={formData.business_name} handleChange={handleChange} />

                      <div>
                        <input
                          name="pan_number"
                          placeholder="PAN Number (e.g. ABCDE1234F)"
                          value={formData.pan_number}
                          onChange={(e) => handleChange({ target: { name: "pan_number", value: e.target.value.toUpperCase(), type: "text" } })}
                          maxLength={10}
                          className={`w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder:text-gray-400 uppercase ${
                            panError ? "ring-2 ring-red-400" : "focus:ring-white/50"
                          }`}
                        />
                        {panError && <p className="text-red-200 text-xs mt-1.5">{panError}</p>}
                      </div>

                      <InputField name="gst_number" placeholder="GST Number (optional)" value={formData.gst_number} handleChange={handleChange} />

                      <label className="flex items-center gap-2 text-white text-sm">
                        <input
                          type="checkbox"
                          name="same_as_personal_address"
                          checked={formData.same_as_personal_address}
                          onChange={handleChange}
                          className="w-4 h-4 rounded"
                        />
                        Store address same as personal address
                      </label>

                      {!formData.same_as_personal_address && (
                        <InputField name="store_address" placeholder="Store Address" value={formData.store_address} handleChange={handleChange} />
                      )}
                    </div>
                  )}

                  {stepError && (
                    <p className="text-red-200 text-xs text-center">{stepError}</p>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center justify-center gap-1.5 border border-white/30 text-white font-semibold py-3 px-4 rounded-xl text-sm hover:bg-white/10 transition-colors"
                      >
                        <ArrowLeft size={16} />
                      </button>
                    )}

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                      >
                        Continue
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRegister}
                        disabled={loading}
                        className="flex-1 bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                      >
                        {loading ? "Sending..." : "Send Verification Code"}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <InputField name="otp" placeholder="Enter OTP" value={formData.otp} handleChange={handleChange} />
                  <button
                    type="button"
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

          {/* ================= LOGIN (email OR username) ================= */}
          {activeTab === "login" && (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Email or Username <span className="text-red-300">*</span>
                </label>
                <InputField
                  name="loginId"
                  type="text"
                  placeholder="Email address or Username"
                  value={formData.loginId}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Password <span className="text-red-300">*</span>
                </label>
                <InputField name="password" type="password" placeholder="Password" value={formData.password} handleChange={handleChange} />
              </div>

              <div className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Remember me</span>
              </div>

              <button
                type="button"
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

function InputField({ name, type = "text", placeholder, value, handleChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-[#1a1a1a] placeholder:text-gray-400"
    />
  );
}