"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

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
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

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

// ---------------- Reusable text input ----------------
function InputField({ name, type = "text", placeholder, value, handleChange, maxLength }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      className="w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-[#1a1a1a] placeholder:text-gray-400"
    />
  );
}

// ---------------- Password input with show/hide toggle ----------------
function PasswordField({ name, placeholder, value, handleChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-3 pr-11 rounded-xl bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 text-[#1a1a1a] placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
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
  const [gstError, setGstError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [stepError, setStepError] = useState("");

  // ---------------- Forgot password state ----------------
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = enter email, 2 = enter otp + new password
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const openForgotPassword = () => {
    setForgotData({ email: "", otp: "", new_password: "", confirm_new_password: "" });
    setForgotStep(1);
    setForgotOpen(true);
  };

  const closeForgotPassword = () => {
    setForgotOpen(false);
    setForgotStep(1);
  };

  const handleForgotRequestOtp = async (e) => {
    e.preventDefault();
    if (!forgotData.email) {
      showToast("Please enter your email address.", "error");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotData.email }),
      });
      const data = await res.json();
      console.log("Forgot-password response:", res.status, data);

      if (!res.ok) {
        showToast(extractErrorMessage(data), "error");
        return;
      }

      showToast("Reset code sent! Check your email.", "success");
      setForgotStep(2);
    } catch (err) {
      console.error("Forgot-password request failed:", err);
      showToast("Could not reach the server. Check your connection and try again.", "error");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotResetPassword = async (e) => {
    e.preventDefault();

    if (!forgotData.otp) {
      showToast("Please enter the code sent to your email.", "error");
      return;
    }
    if (!forgotData.new_password || !forgotData.confirm_new_password) {
      showToast("Please enter and confirm your new password.", "error");
      return;
    }
    if (forgotData.new_password !== forgotData.confirm_new_password) {
      showToast("Passwords don't match.", "error");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotData.email,
          otp: forgotData.otp,
          new_password: forgotData.new_password,
          // Backend requires confirm_password on this endpoint (same as
          // register). We collect it as confirm_new_password in state,
          // so map it to the key name the API expects here.
          confirm_password: forgotData.confirm_new_password,
        }),
      });
      const data = await res.json();
      console.log("Reset-password response:", res.status, data);

      if (!res.ok) {
        showToast(extractErrorMessage(data), "error");
        return;
      }

      showToast("Password reset! Please log in.", "success");
      closeForgotPassword();
      setActiveTab("login");
    } catch (err) {
      console.error("Reset-password request failed:", err);
      showToast("Could not reach the server. Check your connection and try again.", "error");
    } finally {
      setForgotLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    full_name: "", username: "", email: "", phone: "",
    password: "", confirm_password: "",
    street: "", city: "", state: "", pincode: "", landmark: "",
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
    if (name === "gst_number") setGstError("");
    if (name === "pincode") setPincodeError("");
  };

  // ---------------- Pincode -> city/state auto-lookup ----------------
  // Uses the free, keyless India Post pincode API. Called from the
  // browser once the user has typed a full 6-digit valid pincode.
  const lookupPincode = async (pincode) => {
    setPincodeLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      const record = data?.[0];

      if (record?.Status === "Success" && record.PostOffice?.length) {
        const po = record.PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          city: po.District || prev.city,
          state: po.State || prev.state,
        }));
        setPincodeError("");
      } else {
        setPincodeError("Pincode not found. Please check and enter manually.");
      }
    } catch (err) {
      console.error("Pincode lookup failed:", err);
      // Fail quietly — don't block the user, they can still fill city/state manually
    } finally {
      setPincodeLoading(false);
    }
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

  // Shared address validation, used both when navigating away from step 2
  // (goNext) AND right before final submit (handleRegister). This used to
  // live only inside goNext, which meant customer accounts — where step 2
  // IS the last step — could hit "Send Verification Code" directly and
  // skip address validation entirely, since goNext never ran for them.
  const validateAddressStep = () => {
    if (!formData.street || !formData.city || !formData.state || !formData.pincode) {
      setStepError("Please complete your address to continue.");
      return false;
    }
    if (!PINCODE_REGEX.test(formData.pincode.trim())) {
      setPincodeError("Invalid pincode. Expected a 6-digit PIN code.");
      setStepError("Please enter a valid pincode to continue.");
      return false;
    }
    return true;
  };

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
      if (!validateAddressStep()) return;
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
    setStepError("");

    // Address is required for every account type. For customers, step 2
    // (address) is also the final step, so this button is reached WITHOUT
    // going through goNext — validate it here explicitly so it can never
    // be skipped, regardless of which step led to this button.
    if (!validateAddressStep()) {
      return;
    }

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

      const gst = formData.gst_number.trim().toUpperCase();
      if (!gst) {
        setGstError("GST number is required for reseller accounts.");
        return;
      }
      if (!GST_REGEX.test(gst)) {
        setGstError("Invalid GST format. Expected: 22ABCDE1234F1Z5");
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
        postal_code: formData.pincode.trim(),
        landmark: formData.landmark,
        account_type: formData.account_type,
      };

      if (formData.account_type === "reseller") {
        payload.business_name = formData.business_name;
        payload.pan_number = formData.pan_number.trim().toUpperCase();
        payload.gst_number = formData.gst_number.trim().toUpperCase();
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
      const loginId = formData.loginId.trim();

      // NOTE: we're not 100% sure which field name the backend's login
      // serializer actually reads (it changed recently — we started
      // getting "Email/phone and password are required" even with both
      // filled in). Until we can confirm the exact field name from the
      // Django view/serializer, we send the same value under every
      // plausible key so whichever one the backend checks for is
      // satisfied. Once confirmed, this can be trimmed back down to just
      // the one correct key.
      const loginPayload = {
        email: loginId,
        username: loginId,
        identifier: loginId,
        login: loginId,
        phone: loginId,
        password: formData.password,
      };

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

      {/* <div className="absolute bottom-0 left-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image src="/leftpea.png" alt="" width={160} height={160} className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 right-0 w-28 md:w-36 opacity-80 pointer-events-none">
        <Image src="/rightpea.png" alt="" width={160} height={160} className="w-full h-auto" />
      </div> */}

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
                            Customer
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
                      <PasswordField name="password" placeholder="Password" value={formData.password} handleChange={handleChange} />
                      <PasswordField name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} handleChange={handleChange} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-white font-semibold text-sm">Your Address</p>

                      <InputField name="street" placeholder="Street Address (House No., Building, Area)" value={formData.street} handleChange={handleChange} />
                      <InputField name="landmark" placeholder="Landmark (optional)" value={formData.landmark} handleChange={handleChange} />

                      <div>
                        <input
                          name="pincode"
                          placeholder="Pincode (6-digit PIN code)"
                          value={formData.pincode}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
                            handleChange({ target: { name: "pincode", value: digitsOnly, type: "text" } });
                            if (digitsOnly.length === 6 && PINCODE_REGEX.test(digitsOnly)) {
                              lookupPincode(digitsOnly);
                            }
                          }}
                          maxLength={6}
                          inputMode="numeric"
                          className={`w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder:text-gray-400 ${
                            pincodeError ? "ring-2 ring-red-400" : "focus:ring-white/50"
                          }`}
                        />
                        {pincodeLoading && (
                          <p className="text-white/70 text-xs mt-1.5">Looking up city/state…</p>
                        )}
                        {pincodeError && <p className="text-red-200 text-xs mt-1.5">{pincodeError}</p>}
                      </div>

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

                      <div>
                        <input
                          name="gst_number"
                          placeholder="GST Number (required, e.g. 22ABCDE1234F1Z5)"
                          value={formData.gst_number}
                          onChange={(e) => handleChange({ target: { name: "gst_number", value: e.target.value.toUpperCase(), type: "text" } })}
                          maxLength={15}
                          className={`w-full p-3 rounded-xl bg-white border-none focus:outline-none focus:ring-2 text-[#1a1a1a] placeholder:text-gray-400 uppercase ${
                            gstError ? "ring-2 ring-red-400" : "focus:ring-white/50"
                          }`}
                        />
                        {gstError && <p className="text-red-200 text-xs mt-1.5">{gstError}</p>}
                      </div>

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
          {activeTab === "login" && !forgotOpen && (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Email, Phone, or Username <span className="text-red-300">*</span>
                </label>
                <InputField
                  name="loginId"
                  type="text"
                  placeholder="Email, phone number, or username"
                  value={formData.loginId}
                  handleChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white text-sm">
                  Password <span className="text-red-300">*</span>
                </label>
                <PasswordField name="password" placeholder="Password" value={formData.password} handleChange={handleChange} />
              </div>

              <div className="flex items-center justify-between text-sm text-white">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-white/80 hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-white text-[#1a1a1a] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          )}

          {/* ================= FORGOT PASSWORD ================= */}
          {activeTab === "login" && forgotOpen && (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2 mb-1">
                <button
                  type="button"
                  onClick={closeForgotPassword}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <p className="text-white font-semibold text-sm">
                  {forgotStep === 1 ? "Reset your password" : "Enter code & new password"}
                </p>
              </div>

              {forgotStep === 1 ? (
                <>
                  <p className="text-white/70 text-xs">
                    Enter the email linked to your account and we'll send you a reset code.
                  </p>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={forgotData.email}
                    handleChange={handleForgotChange}
                  />
                  <button
                    type="button"
                    onClick={handleForgotRequestOtp}
                    disabled={forgotLoading}
                    className="w-full bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                  >
                    {forgotLoading ? "Sending..." : "Send Reset Code"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-white/70 text-xs">
                    We sent a code to <span className="font-semibold">{forgotData.email}</span>.
                  </p>
                  <InputField
                    name="otp"
                    placeholder="Enter code"
                    value={forgotData.otp}
                    handleChange={handleForgotChange}
                  />
                  <PasswordField
                    name="new_password"
                    placeholder="New password"
                    value={forgotData.new_password}
                    handleChange={handleForgotChange}
                  />
                  <PasswordField
                    name="confirm_new_password"
                    placeholder="Confirm new password"
                    value={forgotData.confirm_new_password}
                    handleChange={handleForgotChange}
                  />
                  <button
                    type="button"
                    onClick={handleForgotResetPassword}
                    disabled={forgotLoading}
                    className="w-full bg-white text-[#2f5f73] font-bold py-3 rounded-xl text-base hover:bg-gray-100 transition-colors"
                  >
                    {forgotLoading ? "Resetting..." : "Reset Password"}
                  </button>
                  <button
                    type="button"
                    onClick={handleForgotRequestOtp}
                    disabled={forgotLoading}
                    className="w-full text-white/70 hover:text-white text-xs transition-colors"
                  >
                    Resend code
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}