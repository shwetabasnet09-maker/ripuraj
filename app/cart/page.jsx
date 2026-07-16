

// "use client";

// import React, { useEffect, useState } from "react";
// import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { authFetch } from "../utils/authFetch";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

// // Safely builds the image URL whether the backend returns a full
// // absolute URL (http://...) or a relative path (/media/...).
// function resolveImageUrl(image) {
//   if (!image) return null;
//   if (image.startsWith("http://") || image.startsWith("https://")) {
//     return image;
//   }
//   return `${API_BASE_URL}${image}`;
// }

// export default function CartPage() {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [checkoutLoading, setCheckoutLoading] = useState(false);

//   // ---------------- FETCH CART ----------------
//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await authFetch(`${API_BASE_URL}/api/cart/`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch cart");

//         const data = await res.json();
//         const items = data.items.map((item) => ({
//           ...item,
//           total_price: item.total_price || item.product_price * item.quantity,
//         }));

//         setCartItems(items);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // ---------------- UPDATE QUANTITY ----------------
//   const updateQuantity = async (id, newQty) => {
//     if (newQty < 1) return;
//     const token = localStorage.getItem("access_token");
//     if (!token) return;

//     try {
//       const res = await authFetch(`${API_BASE_URL}/api/cart/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ quantity: newQty }),
//       });

//       if (!res.ok) throw new Error("Failed to update cart");

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.id === id
//             ? {
//               ...item,
//               quantity: newQty,
//               total_price: parseFloat(item.product_price) * newQty,
//             }
//             : item
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- REMOVE ITEM ----------------
//   const removeItem = async (id) => {
//     const token = localStorage.getItem("access_token");
//     if (!token) return;

//     try {
//       const res = await authFetch(`${API_BASE_URL}/api/cart/${id}/`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to remove item");

//       setCartItems((prev) => prev.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- CALCULATE SUBTOTAL ----------------
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + parseFloat(item.total_price || 0),
//     0
//   );

//   // ---------------- HANDLE CHECKOUT ----------------
//   const handleCheckout = async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token || cartItems.length === 0) return;

//     setCheckoutLoading(true);

//     try {
//       // Prepare items payload for DRF checkout.
//       // IMPORTANT: item.id is the CART ITEM's own id, not the product's.
//       // The actual product reference is item.product (confirmed from the
//       // real /api/cart/ response: { id: 4, product: 1, ... }).
//       const payload = {
//         items: cartItems.map((item) => ({
//           product_id: item.product,
//           quantity: Number(item.quantity),
//         })),
//       };

//       const res = await authFetch(
//         `${API_BASE_URL}/api/orders/checkout/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       let data;
//       try {
//         data = await res.json();
//       } catch (parseErr) {
//         console.error("Checkout response wasn't valid JSON:", parseErr);
//         alert(
//           `Server returned an unexpected response (status ${res.status}). ` +
//           `This usually means the backend hit an internal error. Check the Network tab for the raw response.`
//         );
//         return;
//       }

//       if (!res.ok) {
//         console.error("Checkout error:", data);
//         alert("Checkout failed: " + JSON.stringify(data));
//         return;
//       }

//       console.log("Checkout initiated:", data);

//       // If API returns a payment URL, redirect to it. Otherwise, send the
//       // user to their Orders page so they can see the order that was
//       // just created, instead of leaving them on an empty alert with
//       // nowhere to go.
//       if (data.payment_url) {
//         window.location.href = data.payment_url;
//       } else {
//         router.push("/orders");
//       }

//     } catch (err) {
//       console.error("Checkout request failed:", err);
//       alert(
//         `Checkout request failed: ${err.message}. ` +
//         `This usually means the browser couldn't reach the server at all (network/CORS issue).`
//       );
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <p className="mt-4 text-gray-600">Loading your cart...</p>
//       </div>
//     );

//   if (!cartItems.length)
//     return (
//       <div className="text-center py-20">
//         <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
//         <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
//         <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
//         <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//           Continue Shopping
//         </button>
//       </div>
//     );

//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ---------------- ITEM LIST ---------------- */}
//           <div className="lg:col-span-2 space-y-4">
//             {cartItems.map((item) => {
//               const itemPrice = parseFloat(item.product_price || 0);
//               const itemQty = item.quantity || 0;
//               const itemTotal = parseFloat(item.total_price || itemPrice * itemQty);
//               const itemName = item.product_name || "Product";
//               const itemImage = resolveImageUrl(
//                 item.product_image || item.image
//               );

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
//                 >
//                   <div className="bg-gray-100 p-2 rounded-lg w-[104px] h-[104px] flex items-center justify-center">
//                     {itemImage ? (
//                       <Image
//                         src={itemImage}
//                         alt={itemName}
//                         width={96}
//                         height={96}
//                         className="w-24 h-24 object-contain"
//                         unoptimized
//                       />
//                     ) : (
//                       <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
//                         No image
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-bold text-gray-800">{itemName}</h2>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-gray-400 hover:text-red-500 transition"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>

//                     <p className="text-sm text-gray-500 mb-3">
//                       Weight:{" "}
//                       {item.weight
//                         ? String(item.weight).match(/kg/i)
//                           ? item.weight
//                           : `${item.weight}Kg`
//                         : "N/A"}
//                     </p>

//                     <div className="flex justify-between items-end">
//                       <div className="flex items-center border rounded-lg bg-white">
//                         <button
//                           onClick={() => updateQuantity(item.id, itemQty - 1)}
//                           className="p-1 px-2 hover:bg-gray-50"
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="px-3 font-medium text-sm">{itemQty}</span>
//                         <button
//                           onClick={() => updateQuantity(item.id, itemQty + 1)}
//                           className="p-1 px-2 hover:bg-gray-50"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>

//                       <p className="font-bold text-lg">₹{itemTotal.toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ---------------- ORDER SUMMARY ---------------- */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="space-y-3 text-gray-600 border-b pb-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span className="text-green-600 font-medium">FREE</span>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-4 mb-6 text-xl font-bold">
//                 <span>Total</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={checkoutLoading}
//                 className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
//               </button>
//               <p className="text-xs text-center text-gray-400 mt-4">
//                 Secure checkout powered by Stripe
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";

//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);

//     document.body.appendChild(script);
//   });
// };
// const handleCheckout = async () => {
//   if (cartItems.length === 0) return;

//   setCheckoutLoading(true);

//   try {
//     const loaded = await loadRazorpay();

//     if (!loaded) {
//       alert("Unable to load Razorpay.");
//       return;
//     }

//     const payload = {
//       items: cartItems.map((item) => ({
//         product_id: item.product,
//         quantity: Number(item.quantity),
//       })),
//     };

//     const checkoutRes = await authFetch(
//       `${API_BASE_URL}/api/orders/checkout/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const checkoutData = await checkoutRes.json();

//     if (!checkoutRes.ok) {
//       alert(checkoutData.error || "Checkout failed");
//       return;
//     }

//     const options = {
//       key: checkoutData.key,

//       amount: checkoutData.amount * 100,

//       currency: "INR",

//       name: "Your Store",

//       description: "Order Payment",

//       order_id: checkoutData.razorpay_order_id,

//       handler: async function (response) {
//         try {
//           const verifyRes = await authFetch(
//             `${API_BASE_URL}/api/orders/verify/`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );

//           const verifyData = await verifyRes.json();

//           if (verifyRes.ok) {
//             alert("Payment Successful!");

//             setCartItems([]);

//             router.push("/orders");
//           } else {
//             alert(
//               verifyData.error ||
//                 "Payment verification failed."
//             );
//           }
//         } catch (err) {
//           console.error(err);
//           alert("Verification failed.");
//         }
//       },

//       modal: {
//         ondismiss: function () {
//           console.log("Payment cancelled");
//         },
//       },

//       prefill: {},

//       theme: {
//         color: "#2563EB",
//       },
//     };

//     const razorpay = new window.Razorpay(options);

//     razorpay.on("payment.failed", function (response) {
//       alert(response.error.description);
//     });

//     razorpay.open();
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong.");
//   } finally {
//     setCheckoutLoading(false);
//   }
// };

"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------------- RAZORPAY LOADER ----------------
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

// ---------------- IMAGE URL ----------------
function resolveImageUrl(image) {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${API_BASE_URL}${image}`;
}

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
        const res = await authFetch(`${API_BASE_URL}/api/cart/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();

        const items = data.items.map((item) => ({
          ...item,
          total_price:
            item.total_price ||
            item.product_price * item.quantity,
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
  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/cart/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: qty,
          }),
        }
      );

      if (!res.ok) throw new Error();

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: qty,
                total_price:
                  parseFloat(item.product_price) * qty,
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
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/cart/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      setCartItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- SUBTOTAL ----------------
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.total_price || 0),
    0
  );

  // ---------------- CHECKOUT ----------------
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setCheckoutLoading(true);

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Failed to load Razorpay.");
        return;
      }

      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.product,
          quantity: Number(item.quantity),
        })),
      };

      const res = await authFetch(
        `${API_BASE_URL}/api/orders/checkout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        return;
      }

      const options = {
        key: data.key,

        amount: Math.round(Number(data.amount) * 100),

        currency: "INR",

        name: "Your Store",

        description: "Order Payment",

        order_id: data.razorpay_order_id,

        handler: async function (response) {
          try {
            const verify = await authFetch(
              `${API_BASE_URL}/api/orders/verify/`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }),
              }
            );

            const verifyData =
              await verify.json();

            if (!verify.ok) {
              alert(
                verifyData.error ||
                  "Payment verification failed."
              );
              return;
            }

            alert("Payment Successful!");

            setCartItems([]);

            router.push("/orders");
          } catch (err) {
            console.error(err);
            alert(
              "Unable to verify payment."
            );
          }
        },

        modal: {
          ondismiss() {
            console.log(
              "Payment popup closed."
            );
          },
        },

        theme: {
          color: "#2563EB",
        },
      };

      const payment =
        new window.Razorpay(options);

      payment.on(
        "payment.failed",
        function (response) {
          alert(
            response.error.description
          );
        }
      );

      payment.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setCheckoutLoading(false);
    }
  };  if (loading)
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
      
        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ITEMS */}

          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {

              const itemPrice = parseFloat(item.product_price || 0);

              const itemQty = item.quantity || 0;

              const itemTotal = parseFloat(
                item.total_price || itemPrice * itemQty
              );

              const itemName =
                item.product_name || "Product";

              const itemImage = resolveImageUrl(
                item.product_image || item.image
              );

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
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

                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <h2 className="text-lg font-bold">
                        {itemName}
                      </h2>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      Weight:{" "}
                      {item.weight
                        ? String(item.weight).match(/kg/i)
                          ? item.weight
                          : `${item.weight}Kg`
                        : "N/A"}
                    </p>

                    <div className="flex justify-between items-end">

                      <div className="flex items-center border rounded-lg">

                        <button
                          onClick={() =>
                            updateQuantity(item.id, itemQty - 1)
                          }
                          className="p-2"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="px-3">
                          {itemQty}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, itemQty + 1)
                          }
                          className="p-2"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      <div className="font-bold text-lg">
                        ₹{itemTotal.toLocaleString()}
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">

              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 border-b pb-4">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    Calculated at Checkout
                  </span>
                </div>

              </div>

              <div className="flex justify-between mt-4 mb-6 text-xl font-bold">

                <span>Total</span>

                <span>
                  ₹{subtotal.toLocaleString()}
                </span>

              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Pay with Razorpay"}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Secure checkout powered by Razorpay
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}