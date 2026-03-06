

"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // ---------------- FETCH CART ----------------
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/cart/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        const items = data.items.map((item) => ({
          ...item,
          total_price: item.total_price || item.product_price * item.quantity,
        }));

        setCartItems(items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ---------------- UPDATE QUANTITY ----------------
  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (!res.ok) throw new Error("Failed to update cart");

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: newQty,
                total_price: parseFloat(item.product_price) * newQty,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- REMOVE ITEM ----------------
  const removeItem = async (id) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- CALCULATE SUBTOTAL ----------------
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.total_price || 0),
    0
  );

  // ---------------- HANDLE CHECKOUT ----------------
  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token || cartItems.length === 0) return;

    setCheckoutLoading(true);

    try {
      // Prepare items payload for DRF checkout
      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.id,      // DRF usually expects product_id
          quantity: Number(item.quantity),
        })),
      };

      const res = await fetch(
        "http://127.0.0.1:8000/api/orders/checkout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout error:", data);
        alert("Checkout failed: " + JSON.stringify(data));
        return;
      }

      console.log("Checkout initiated:", data);

      // If API returns a payment URL, redirect to it
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Checkout initiated. Complete payment in your account.");
      }

    } catch (err) {
      console.error(err);
      alert("Checkout failed. Try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading your cart...</p>
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---------------- ITEM LIST ---------------- */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemPrice = parseFloat(item.product_price || 0);
              const itemQty = item.quantity || 0;
              const itemTotal = parseFloat(item.total_price || itemPrice * itemQty);
              const itemName = item.product_name || "Product";
              const itemImage = item.image || "/placeholder.png";

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
                >
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <img src={itemImage} alt={itemName} className="w-24 h-24 object-contain" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-bold text-gray-800">{itemName}</h2>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">Weight: {item.weight || "N/A"} kg</p>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, itemQty - 1)}
                          className="p-1 px-2 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 font-medium text-sm">{itemQty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, itemQty + 1)}
                          className="p-1 px-2 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="font-bold text-lg">₹{itemTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- ORDER SUMMARY ---------------- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-600 border-b pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 mb-6 text-xl font-bold">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
              <p className="text-xs text-center text-gray-400 mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}