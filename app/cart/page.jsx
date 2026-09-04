"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle2, XCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${API_BASE_URL}${image}`;
}

// ==================== TOAST NOTIFICATION SYSTEM ====================
function ToastContainer({ toasts, onDismiss }) {
  const styles = {
    success: { icon: CheckCircle2, color: "text-green-500", border: "border-green-500" },
    error: { icon: XCircle, color: "text-red-500", border: "border-red-500" },
  };

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 w-[90vw] max-w-sm">
      {toasts.map((toast) => {
        const style = styles[toast.type] || styles.success;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className={`bg-white border-l-4 ${style.border} rounded-xl shadow-2xl p-4 flex items-start gap-3 animate-toast-in`}
          >
            <Icon size={22} className={`${style.color} flex-shrink-0 mt-0.5`} />
            <p className="text-sm text-[#1a1a1a] font-medium leading-relaxed flex-1">
              {toast.message}
            </p>
            <button onClick={() => onDismiss(toast.id)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-toast-in { animation: toastIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
// ==================== END TOAST SYSTEM ====================

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Toast state + helper
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ---------------- FETCH CART ----------------
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/cart/`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      const items = (data.items || []).map((item) => ({
        ...item,
        total_price: item.total_price || item.product_price * item.quantity,
      }));

      setCartItems(items);
    } catch (err) {
      console.error(err);
      showToast("Couldn't load your cart. Please refresh.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ---------------- UPDATE QUANTITY ----------------
  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      const res = await authFetch(`${API_BASE_URL}/api/cart/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (!res.ok) throw new Error("Failed to update cart");

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: newQty, total_price: parseFloat(item.product_price) * newQty }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      showToast("Couldn't update quantity. Please try again.", "error");
    }
  };

  // ---------------- REMOVE ITEM ----------------
  const removeItem = async (id) => {
    try {
      const res = await authFetch(`${API_BASE_URL}/api/cart/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      showToast("Item removed from cart.", "success");
    } catch (err) {
      console.error(err);
      showToast("Couldn't remove this item. Please try again.", "error");
    }
  };

  // ---------------- CHECKOUT (Razorpay) ----------------
  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token || cartItems.length === 0) return;

    if (!RAZORPAY_KEY_ID) {
      showToast("Payment is not configured yet.", "error");
      return;
    }

    setCheckoutLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showToast("Failed to load payment gateway. Check your connection.", "error");
        return;
      }

      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.product,
          quantity: Number(item.quantity),
        })),
      };

      const res = await authFetch(`${API_BASE_URL}/api/orders/create-razorpay-order/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        showToast(`Server error (status ${res.status}). Please try again.`, "error");
        return;
      }

      if (!res.ok) {
        showToast(data.detail || "Checkout failed. Please try again.", "error");
        return;
      }

      const { razorpay_order_id, amount, currency, order_id } = data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency: currency || "INR",
        name: "Ripuraj Agro",
        description: "Order Payment",
        image: "/logo.png",
        order_id: razorpay_order_id,
        handler: async function (response) {
          try {
            const verifyRes = await authFetch(`${API_BASE_URL}/api/orders/verify-payment/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              showToast(
                `Payment received but verification failed. Contact support with payment ID: ${response.razorpay_payment_id}`,
                "error"
              );
              return;
            }

            // ---- SUCCESS NOTIFICATION ----
            showToast(
              `Order placed successfully! Order #${order_id}`,
              "success"
            );
            setTimeout(() => router.push("/orders"), 1200);
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            showToast(
              `Payment received but couldn't verify. Contact support with payment ID: ${response.razorpay_payment_id}`,
              "error"
            );
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutLoading(false);
          },
        },
        theme: { color: "#2e6378" },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        showToast(response.error.description || "Payment failed. Please try again.", "error");
        setCheckoutLoading(false);
      });

      razorpay.open();
    } catch (err) {
      console.error("Checkout request failed:", err);
      showToast("Couldn't reach the server. Check your connection.", "error");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.total_price || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 px-4 bg-[#F8FAFC]">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <ShoppingBag size={24} />
          My Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const itemImage = resolveImageUrl(item.product_image || item.image);
                const itemName = item.product_name || item.name || "Product";

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
                  >
                    <div className="bg-gray-100 p-2 rounded-lg w-[104px] h-[104px] flex items-center justify-center">
                      {itemImage ? (
                        <Image
                          src={itemImage}
                          alt={itemName}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800">{itemName}</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Weight:{" "}
                        {item.weight
                          ? String(item.weight).match(/kg/i)
                            ? item.weight
                            : `${item.weight}Kg`
                          : "N/A"}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <p className="font-bold text-slate-800">
                        ₹{Number(item.total_price).toLocaleString("en-IN")}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-fit">
              <h2 className="font-bold text-lg text-slate-800 mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-slate-800 text-lg border-t pt-4 mb-6">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-[#2e6378] hover:bg-[#234d5d] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-70"
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Secure checkout powered by Razorpay
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}