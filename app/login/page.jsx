


// // // "use client";
// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";

// // // export default function AuthPage() {
// // //   const router = useRouter();

// // //   const [activeTab, setActiveTab] = useState("register");
// // //   const [otpSent, setOtpSent] = useState(false);

// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     email: "",
// // //     phone: "",
// // //     password: "",
// // //     confirm_password: "",
// // //     otp: "",
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   // ---------------- REGISTER ----------------
// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();

// // //     const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         username: formData.username,
// // //         email: formData.email,
// // //         phone: formData.phone,
// // //         password: formData.password,
// // //         confirm_password: formData.confirm_password,
// // //       }),
// // //     });

// // //     const data = await res.json();
// // //     console.log(data);

// // //     if (res.ok) {
// // //       alert("OTP sent! Check console (for now)");
// // //       setOtpSent(true);
// // //     } else {
// // //       alert(JSON.stringify(data));
// // //     }
// // //   };

// // //   // ---------------- VERIFY ----------------
// // //   const handleVerify = async (e) => {
// // //     e.preventDefault();

// // //     const res = await fetch("http://127.0.0.1:8000/api/accounts/verify-email/", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         email: formData.email,
// // //         otp: formData.otp,
// // //       }),
// // //     });

// // //     const data = await res.json();
// // //     console.log(data);

// // //     if (res.ok) {
// // //       alert("Registration successful! Please login.");
// // //       setActiveTab("login");
// // //       setOtpSent(false);
// // //     } else {
// // //       alert(JSON.stringify(data));
// // //     }
// // //   };

// // //   // ---------------- LOGIN ----------------
// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();

// // //     const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         email: formData.email,
// // //         password: formData.password,
// // //       }),
// // //     });

// // //     const data = await res.json();
// // //     console.log(data);

// // //     if (res.ok) {
// // //       localStorage.setItem("token", data.access);
// // //       alert("Login successful!");
// // //       router.push("/shop");
// // //     } else {
// // //       alert(JSON.stringify(data));
// // //     }
// // //   };

// // //   return (
// // //     <div className="wrapper py-40 px-4">
// // //       <div className="flex justify-center">
// // //         <div className="w-full max-w-md bg-[#E6D8BD] rounded-3xl shadow-xl border-4 border-[#2C5C6E] p-8">

// // //           {/* Tabs */}
// // //           <div className="flex justify-center mb-6 gap-6">
// // //             <button onClick={() => setActiveTab("register")}
// // //               className={activeTab === "register" ? "font-bold text-[#2C5C6E]" : ""}>
// // //               Register
// // //             </button>

// // //             <button onClick={() => setActiveTab("login")}
// // //               className={activeTab === "login" ? "font-bold text-[#2C5C6E]" : ""}>
// // //               Login
// // //             </button>
// // //           </div>

// // //           {/* REGISTER */}
// // //           {activeTab === "register" && (
// // //             <form className="space-y-4">

// // //               <input
// // //                 name="username"
// // //                 placeholder="Username"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <input
// // //                 name="email"
// // //                 type="email"
// // //                 placeholder="Email"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <input
// // //                 name="phone"
// // //                 placeholder="Phone"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <input
// // //                 name="password"
// // //                 type="password"
// // //                 placeholder="Password"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <input
// // //                 name="confirm_password"
// // //                 type="password"
// // //                 placeholder="Confirm Password"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               {!otpSent ? (
// // //                 <button
// // //                   onClick={handleRegister}
// // //                   className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl"
// // //                 >
// // //                   Send Verification Code
// // //                 </button>
// // //               ) : (
// // //                 <>
// // //                   <input
// // //                     name="otp"
// // //                     placeholder="Enter OTP"
// // //                     onChange={handleChange}
// // //                     className="w-full p-3 rounded-xl border"
// // //                   />

// // //                   <button
// // //                     onClick={handleVerify}
// // //                     className="w-full bg-green-600 text-white py-3 rounded-xl"
// // //                   >
// // //                     Verify & Register
// // //                   </button>
// // //                 </>
// // //               )}

// // //             </form>
// // //           )}

// // //           {/* LOGIN */}
// // //           {activeTab === "login" && (
// // //             <form className="space-y-4">

// // //               <input
// // //                 name="email"
// // //                 type="email"
// // //                 placeholder="Email"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <input
// // //                 name="password"
// // //                 type="password"
// // //                 placeholder="Password"
// // //                 onChange={handleChange}
// // //                 className="w-full p-3 rounded-xl border"
// // //               />

// // //               <button
// // //                 onClick={handleLogin}
// // //                 className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl"
// // //               >
// // //                 Login
// // //               </button>

// // //             </form>
// // //           )}

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function AuthPage() {
// //   const router = useRouter();

// //   const [activeTab, setActiveTab] = useState("login");
// //   const [otpSent, setOtpSent] = useState(false);

// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirm_password: "",
// //     otp: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // ---------------- REGISTER ----------------
// //   const handleRegister = async (e) => {
// //     e.preventDefault();

// //     const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         username: formData.username,
// //         email: formData.email,
// //         phone: formData.phone,
// //         password: formData.password,
// //         confirm_password: formData.confirm_password,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       alert("OTP sent!");
// //       setOtpSent(true);
// //     } else {
// //       alert(JSON.stringify(data));
// //     }
// //   };

// //   // ---------------- VERIFY ----------------
// //   const handleVerify = async (e) => {
// //     e.preventDefault();

// //     const res = await fetch("http://127.0.0.1:8000/api/accounts/verify-email/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         email: formData.email,
// //         otp: formData.otp,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       alert("Registration successful! Please login.");
// //       setActiveTab("login");
// //       setOtpSent(false);
// //     } else {
// //       alert(JSON.stringify(data));
// //     }
// //   };

// //   // ---------------- LOGIN ----------------
// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         email: formData.email,
// //         password: formData.password,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       localStorage.setItem("token", data.access);
// //       alert("Login successful!");
// //       router.push("/shop");
// //     } else {
// //       alert(JSON.stringify(data));
// //     }
// //   };

// //   return (
// //     <div className="py-45 flex items-center justify-center bg-gray-100 px-4">

// //       <div className="w-full max-w-md bg-[#E6D8BD] rounded-[35px] shadow-2xl border-4 border-[#2C5C6E] p-8">

// //         {/* Tabs */}
// //         <div className="flex justify-center gap-10 mb-8 text-lg font-semibold">
// //           <button
// //             onClick={() => setActiveTab("login")}
// //             className={`transition ${
// //               activeTab === "login"
// //                 ? "text-[#2C5C6E]"
// //                 : "text-gray-600"
// //             }`}
// //           >
// //             Login
// //           </button>

// //           <button
// //             onClick={() => setActiveTab("register")}
// //             className={`transition ${
// //               activeTab === "register"
// //                 ? "text-[#2C5C6E]"
// //                 : "text-gray-600"
// //             }`}
// //           >
// //             Register
// //           </button>
// //         </div>

// //         {/* ================= REGISTER ================= */}
// //         {activeTab === "register" && (
// //           <form className="space-y-4">

// //             <InputField name="username" placeholder="Username" handleChange={handleChange} />
// //             <InputField name="email" type="email" placeholder="Email address" handleChange={handleChange} />
// //             <InputField name="phone" placeholder="Phone" handleChange={handleChange} />
// //             <InputField name="password" type="password" placeholder="Password" handleChange={handleChange} />
// //             <InputField name="confirm_password" type="password" placeholder="Confirm Password" handleChange={handleChange} />

// //             {!otpSent ? (
// //               <button
// //                 onClick={handleRegister}
// //                 className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
// //               >
// //                 Send Verification Code
// //               </button>
// //             ) : (
// //               <>
// //                 <InputField name="otp" placeholder="Enter OTP" handleChange={handleChange} />

// //                 <button
// //                   onClick={handleVerify}
// //                   className="w-full bg-green-600 text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
// //                 >
// //                   Verify & Register
// //                 </button>
// //               </>
// //             )}
// //           </form>
// //         )}

// //         {/* ================= LOGIN ================= */}
// //         {activeTab === "login" && (
// //           <form className="space-y-6">

// //             <div>
// //               <label className="block mb-2 font-medium">
// //                 Email address <span className="text-red-500">*</span>
// //               </label>
// //               <InputField
// //                 name="email"
// //                 type="email"
// //                 placeholder="Email address"
// //                 handleChange={handleChange}
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-2 font-medium">
// //                 Password <span className="text-red-500">*</span>
// //               </label>
// //               <InputField
// //                 name="password"
// //                 type="password"
// //                 placeholder="Password"
// //                 handleChange={handleChange}
// //               />
// //             </div>

// //             <div className="flex items-center gap-2 text-sm">
// //               <input type="checkbox" className="w-4 h-4" />
// //               <span>Remember me</span>
// //             </div>

// //             <button
// //               onClick={handleLogin}
// //               className="w-full bg-[#2C5C6E] text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
// //             >
// //               Log in
// //             </button>

// //             <p className="text-sm text-gray-700">Forgot email?</p>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* Reusable Input */
// // function InputField({ name, type = "text", placeholder, handleChange }) {
// //   return (
// //     <input
// //       name={name}
// //       type={type}
// //       placeholder={placeholder}
// //       onChange={handleChange}
// //       className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C5C6E]"
// //     />
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ================= HANDLE INPUT =================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ================= HANDLE LOGIN =================
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("LOGIN RESPONSE:", data);

//       if (!res.ok) {
//         setError(data.detail || "Invalid email or password");
//         return;
//       }

//       // ✅ SAVE JWT TOKENS
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);

//       alert("Login successful ✅");

//       // redirect to shop
//       router.push("/shop");
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-xl rounded-lg p-8 w-[400px]"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#3d5a68]"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-[#3d5a68]"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#3d5a68] text-white p-3 rounded font-semibold hover:bg-[#2d4550] transition disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Login failed");
        return;
      }

      // ✅ Store JWT in localStorage
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      alert("Login successful ✅");
      router.push("/"); // redirect to home or previous page
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#3d5a68] text-white py-3 rounded font-bold hover:bg-[#2d4550]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}