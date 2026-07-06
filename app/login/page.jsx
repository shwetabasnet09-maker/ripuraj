"use client";

import { useState, useEffect } from "react"; 
import { useRouter } from "next/navigation";

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

      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      alert("OTP sent!");
      setOtpSent(true);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY ----------------
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/accounts/verify-email/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      alert("Registration successful! Please login.");
      setActiveTab("login");
      setOtpSent(false);
    } catch (err) {
      alert("Verification failed");
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

      if (!res.ok) {
        alert(data.detail || "Login failed");
        return;
      }

      // ✅ store tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert("Login successful ✅");

      router.push("/"); // redirect
    } catch (err) {
      alert("Something went wrong during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-45 flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-[#E6D8BD] rounded-[35px] shadow-2xl border-4 border-[#2C5C6E] p-8">

        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-8 text-lg font-semibold">
          <button
            onClick={() => setActiveTab("login")}
            className={`transition ${
              activeTab === "login" ? "text-[#2C5C6E]" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`transition ${
              activeTab === "register" ? "text-[#2C5C6E]" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* ================= REGISTER ================= */}
        {activeTab === "register" && (
          <form className="space-y-4">

            <InputField name="username" placeholder="Username" handleChange={handleChange} />
            <InputField name="email" type="email" placeholder="Email address" handleChange={handleChange} />
            <InputField name="phone" placeholder="Phone" handleChange={handleChange} />
            <InputField name="password" type="password" placeholder="Password" handleChange={handleChange} />
            <InputField name="confirm_password" type="password" placeholder="Confirm Password" handleChange={handleChange} />

            {!otpSent ? (
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            ) : (
              <>
                <InputField name="otp" placeholder="Enter OTP" handleChange={handleChange} />

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
                >
                  {loading ? "Verifying..." : "Verify & Register"}
                </button>
              </>
            )}
          </form>
        )}

        {/* ================= LOGIN ================= */}
        {activeTab === "login" && (
          <form className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                Email address <span className="text-red-500">*</span>
              </label>
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                handleChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                handleChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4" />
              <span>Remember me</span>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-sm text-gray-700">Forgot password?</p>
          </form>
        )}
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
      className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C5C6E]"
    />
  );
}