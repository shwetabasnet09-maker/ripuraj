// "use client";

// import Link from "next/link";
// import { Package, ArrowLeft, Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import { authFetch } from "../../utils/authFetch";
// import ShippingTracker from "../../component/global/ShippingTracker";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const statusStyles = {
//   delivered: "bg-green-100 text-green-700",
//   shipped: "bg-blue-100 text-blue-700",
//   processing: "bg-yellow-100 text-yellow-700",
//   paid: "bg-green-100 text-green-700",
//   pending: "bg-orange-100 text-orange-700",
// };

// // ---------------- STAR RATING PICKER ----------------
// function StarPicker({ value, onChange }) {
//   const [hovered, setHovered] = useState(0);

//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((n) => (
//         <button
//           key={n}
//           type="button"
//           onClick={() => onChange(n)}
//           onMouseEnter={() => setHovered(n)}
//           onMouseLeave={() => setHovered(0)}
//           className="p-0.5"
//         >
//           <Star
//             size={22}
//             className={
//               n <= (hovered || value)
//                 ? "text-yellow-400"
//                 : "text-gray-300"
//             }
//             fill={n <= (hovered || value) ? "#facc15" : "none"}
//           />
//         </button>
//       ))}
//     </div>
//   );
// }

// // ---------------- REVIEW FORM (inline, per item) ----------------
// function ReviewForm({ item, onSubmitted }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const submit = async () => {
//     if (!rating) {
//       setError("Please select a star rating.");
//       return;
//     }

//     setSubmitting(true);
//     setError(null);

//     try {
//       const res = await authFetch(`${API_BASE_URL}/api/reviews/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           // NOTE: assumes each order item exposes a `product` id field,
//           // matching the same convention confirmed on cart items
//           // (CartItemSerializer's `product = PrimaryKeyRelatedField`).
//           // If order items use a different field name, this needs
//           // updating — check the /api/orders/history/ response.
//           product: item.product || item.product_id,
//           rating,
//           comment,
//           order_item_id: item.id,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || data.error || "Failed to submit review");
//       }

//       onSubmitted();
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
//       <div>
//         <p className="text-xs font-semibold text-slate-600 mb-1.5">Your rating</p>
//         <StarPicker value={rating} onChange={setRating} />
//       </div>

//       <div>
//         <p className="text-xs font-semibold text-slate-600 mb-1.5">
//           Your review (optional)
//         </p>
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           rows={3}
//           placeholder="What did you think of this product?"
//           className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#335B6E] resize-none"
//         />
//       </div>

//       {error && <p className="text-xs text-red-600">{error}</p>}

//       <button
//         onClick={submit}
//         disabled={submitting}
//         className="bg-[#335B6E] hover:bg-[#274550] text-white text-sm font-semibold px-5 py-2 rounded-lg transition disabled:opacity-60"
//       >
//         {submitting ? "Submitting..." : "Submit Review"}
//       </button>
//     </div>
//   );
// }

// export default function OrderDetailsPage({ params }) {
//   const [id, setId] = useState(null);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Which item's review form is currently open (item id, or null).
//   const [reviewingItemId, setReviewingItemId] = useState(null);
//   // Items successfully reviewed in this session (item id set).
//   const [reviewedItemIds, setReviewedItemIds] = useState(new Set());

//   useEffect(() => {
//     Promise.resolve(params).then((p) => setId(p.id));
//   }, [params]);

//   const fetchOrder = async (orderId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await authFetch(`${API_BASE_URL}/api/orders/history/`);

//       if (!res.ok) {
//         throw new Error("Failed to fetch orders");
//       }

//       const data = await res.json();
//       const list = Array.isArray(data) ? data : [];

//       const found = list.find((o) => String(o.id) === String(orderId));

//       if (!found) {
//         setError("Order not found.");
//       } else {
//         setOrder(found);
//       }
//     } catch (err) {
//       console.error("Failed to fetch order:", err);
//       setError("Couldn't load this order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchOrder(id);
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
//         <div className="max-w-3xl mx-auto animate-pulse space-y-6">
//           <div className="h-5 w-32 bg-slate-200 rounded" />
//           <div className="bg-white border border-slate-200 rounded-2xl p-6 h-24" />
//           <div className="bg-white border border-slate-200 rounded-2xl p-6 h-40" />
//         </div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
//         <p className="text-red-600 font-medium mb-2">{error || "Order not found"}</p>
//         <Link
//           href="/orders"
//           className="mt-4 inline-flex items-center gap-2 text-sm text-[#335B6E] hover:underline"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Orders
//         </Link>
//       </div>
//     );
//   }

//   const itemCount = order.items?.length || 0;
//   // Review eligibility: this store's orders appear to go straight to
//   // "paid" without ever reaching a separate "delivered" status, so
//   // treat both as eligible for review rather than gating on
//   // "delivered" alone (which would never actually appear).
//   const canReview = ["delivered", "paid"].includes(order.status?.toLowerCase());

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
//       <div className="max-w-3xl mx-auto">
//         <Link
//           href="/orders"
//           className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#335B6E] mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Orders
//         </Link>

//         <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-slate-100 rounded-lg">
//               <Package className="w-5 h-5 text-[#335B6E]" />
//             </div>
//             <h1 className="text-xl font-bold text-slate-900">Order #{order.id}</h1>
//           </div>
//           <p className="text-sm text-slate-500">
//             Placed on {new Date(order.created_at).toLocaleDateString()} • {itemCount} Item
//             {itemCount !== 1 ? "s" : ""}
//           </p>
//         </div>

//         <ShippingTracker status={order.status} />

//         {itemCount > 0 && (
//           <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
//             <h2 className="text-sm font-semibold text-slate-700 mb-4">Items</h2>

//             <div className="space-y-4">
//               {order.items.map((item, i) => {
//                 const itemKey = item.id || i;
//                 const isReviewing = reviewingItemId === itemKey;
//                 const isReviewed = reviewedItemIds.has(itemKey);

//                 return (
//                   <div
//                     key={itemKey}
//                     className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
//                   >
//                     <div className="flex items-center justify-between text-sm">
//                       <div>
//                         <p className="font-medium text-slate-800">
//                           {item.product_name || item.name || `Item ${i + 1}`}
//                         </p>
//                         <p className="text-slate-500 text-xs">
//                           Qty: {item.quantity || 1}
//                           {item.weight ? ` • ${item.weight}` : ""}
//                         </p>
//                       </div>
//                       {(item.total_price || item.price) && (
//                         <p className="font-medium text-slate-800">
//                           ₹{Number(item.total_price || item.price).toLocaleString("en-IN")}
//                         </p>
//                       )}
//                     </div>

//                     {/* Review CTA — only for delivered orders */}
//                     {canReview && (
//                       <div className="mt-2">
//                         {isReviewed ? (
//                           <p className="text-xs text-green-600 font-medium flex items-center gap-1">
//                             <Star size={13} fill="#16a34a" className="text-green-600" />
//                             Thanks for your review!
//                           </p>
//                         ) : isReviewing ? (
//                           <ReviewForm
//                             item={item}
//                             onSubmitted={() => {
//                               setReviewedItemIds((prev) => new Set(prev).add(itemKey));
//                               setReviewingItemId(null);
//                             }}
//                           />
//                         ) : (
//                           <button
//                             onClick={() => setReviewingItemId(itemKey)}
//                             className="text-xs font-semibold text-[#335B6E] hover:underline"
//                           >
//                             Write a Review
//                           </button>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
//           <div className="flex justify-between text-sm">
//             <span className="text-slate-500">Status</span>
//             <span
//               className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                 statusStyles[order.status?.toLowerCase()] || "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {order.status}
//             </span>
//           </div>

//           {order.payment_method && (
//             <div className="flex justify-between text-sm">
//               <span className="text-slate-500">Payment</span>
//               <span className="font-medium text-slate-900">{order.payment_method}</span>
//             </div>
//           )}

//           {order.delivery_method && (
//             <div className="flex justify-between text-sm">
//               <span className="text-slate-500">Delivery</span>
//               <span className="font-medium text-slate-900">{order.delivery_method}</span>
//             </div>
//           )}

//           <div className="flex justify-between text-sm border-t pt-4">
//             <span className="text-slate-500">Total Amount</span>
//             <span className="font-bold text-slate-900">
//               ₹{Number(order.total_price).toLocaleString("en-IN")}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManageAccount from "../component/dashboard/tabs/ManageAccount";
import MyOrders from "../component/dashboard/tabs/MyOrders";
import MyReviews from "../component/dashboard/tabs/MyReviews";
import {
  User,
  ShoppingBag,
  Star,
  LogOut,
} from "lucide-react";
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");

  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [ordersLoading, setOrdersLoading] =
    useState(false);

  const [reviewsLoading, setReviewsLoading] =
    useState(false);

  // --------------------------------------------------
  // AUTH
  // --------------------------------------------------

  useEffect(() => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      router.replace("/auth");
      return;
    }

    setLoading(false);
  }, [router]);

  // --------------------------------------------------
  // FETCH ORDERS
  // --------------------------------------------------

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const res = await authFetch(
        `${API_BASE_URL}/api/orders/history/`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch orders"
        );
      }

      const data = await res.json();

      setOrders(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );

      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // --------------------------------------------------
  // FETCH REVIEWS
  // --------------------------------------------------

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const res = await authFetch(
        `${API_BASE_URL}/api/reviews/`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch reviews"
        );
      }

      const data = await res.json();

      /*
       * Handles both:
       *
       * [
       *   {...},
       *   {...}
       * ]
       *
       * and:
       *
       * {
       *   results: [...]
       * }
       */
      if (Array.isArray(data)) {
        setReviews(data);
      } else if (
        Array.isArray(data?.results)
      ) {
        setReviews(data.results);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch reviews:",
        error
      );

      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD TAB DATA
  // --------------------------------------------------

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }

    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    try {
      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem(
        "refresh_token"
      );

      localStorage.clear();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  };

  // --------------------------------------------------
  // TAB CONTENT
  // --------------------------------------------------

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return <ManageAccount />;

      case "orders":
        return (
          <MyOrders
            orders={orders}
            loading={ordersLoading}
            refreshOrders={fetchOrders}
          />
        );

      case "reviews":
        return (
          <MyReviews
            reviews={reviews}
            loading={reviewsLoading}
            refreshReviews={fetchReviews}
          />
        );

      default:
        return <ManageAccount />;
    }
  };

  const menuItems = [
    {
      key: "account",
      label: "Manage My Account",
      icon: <User size={20} />,
    },
    {
      key: "orders",
      label: "My Orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      key: "reviews",
      label: "My Reviews",
      icon: <Star size={20} />,
    },
  ];

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">
          Checking authentication...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <div className="wrapper py-40 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">

        {/* SIDEBAR */}
        <div className="w-full lg:w-1/4 bg-gray-50 border-r p-6 space-y-3">

          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                setActiveTab(item.key)
              }
              className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-left ${
                activeTab === item.key
                  ? "bg-[#2C5C6E]/10 text-[#2C5C6E] font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="w-full lg:w-3/4 p-8">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}