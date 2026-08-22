// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Package, ChevronRight } from "lucide-react";
// import { authFetch } from "../../../utils/authFetch";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// const statusStyles = {
//   delivered: "bg-green-100 text-green-700",
//   shipped: "bg-blue-100 text-blue-700",
//   processing: "bg-yellow-100 text-yellow-700",
//   paid: "bg-green-100 text-green-700",
//   pending: "bg-orange-100 text-orange-700",
// };

// // Maps each tab to the real backend status value(s) it should show.
// // NOTE: this mapping is a best-guess based on common e-commerce status
// // naming — confirm against your backend's actual status values and
// // adjust if needed.
// const TAB_STATUS_MAP = {
//   All: null,
//   "To Pay": ["pending"],
//   "To Ship": ["paid", "processing"],
//   "To Receive": ["shipped"],
//   "To Review": ["delivered"],
// };

// const tabs = Object.keys(TAB_STATUS_MAP);

// export default function MyOrders() {
//   const [tab, setTab] = useState("All");
//   const [allOrders, setAllOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await authFetch(`${API_BASE_URL}/api/orders/history/`, {
//         headers: { "Content-Type": "application/json" },
//         signal: AbortSignal.timeout(10000),
//       });

//       if (!res.ok) {
//         throw new Error(`Server returned status ${res.status}`);
//       }

//       const data = await res.json();
//       setAllOrders(Array.isArray(data) ? data : data.results || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//       if (err.name === "TimeoutError" || err.name === "AbortError") {
//         setError("The server took too long to respond.");
//       } else if (err.message === "Failed to fetch") {
//         setError("Couldn't reach the server. Check your connection.");
//       } else {
//         setError(err.message || "Failed to load orders.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch once — tabs filter client-side for instant switching, no
//   // re-fetching the whole list every time you click a tab.
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const allowedStatuses = TAB_STATUS_MAP[tab];
//   const filteredOrders = allowedStatuses
//     ? allOrders.filter((o) =>
//         allowedStatuses.includes(o.status?.toLowerCase())
//       )
//     : allOrders;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-slate-800 mb-6">My Orders</h2>

//       {/* Tabs */}
//       <div className="flex gap-6 border-b mb-6 overflow-x-auto scrollbar-hide">
//         {tabs.map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`pb-3 whitespace-nowrap text-sm font-medium transition-colors ${
//               tab === t
//                 ? "border-b-2 border-[#2C5C6E] text-[#2C5C6E]"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Loading skeleton */}
//       {loading && (
//         <div className="space-y-4">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 animate-pulse"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-11 h-11 bg-slate-100 rounded-xl" />
//                 <div className="space-y-2">
//                   <div className="h-4 w-28 bg-slate-100 rounded" />
//                   <div className="h-3 w-36 bg-slate-100 rounded" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Error state */}
//       {!loading && error && (
//         <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
//           <p className="text-red-600 font-medium mb-2">
//             Couldn't load your orders
//           </p>
//           <p className="text-gray-500 text-sm mb-6">{error}</p>
//           <button
//             onClick={fetchOrders}
//             className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && !error && filteredOrders.length === 0 && (
//         <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
//           <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//           <p className="text-gray-500">
//             {tab === "All"
//               ? "You haven't placed any orders yet."
//               : `No orders in "${tab}" right now.`}
//           </p>
//         </div>
//       )}

//       {/* Orders list */}
//       {!loading && !error && filteredOrders.length > 0 && (
//         <div className="space-y-4">
//           {filteredOrders.map((order) => {
//             const itemCount = order.items?.length || 0;

//             return (
//               <Link
//                 key={order.id}
//                 href={`/orders/${order.id}`}
//                 className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-slate-100 rounded-xl p-3">
//                     <Package className="w-5 h-5 text-slate-500" />
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-slate-800">
//                       Order #{order.id}
//                     </h3>
//                     <p className="text-slate-500 text-sm">
//                       {order.created_at &&
//                         new Date(order.created_at).toLocaleDateString()}{" "}
//                       · {itemCount} Item{itemCount !== 1 ? "s" : ""}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-6 sm:gap-10">
//                   <div className="text-center hidden sm:block">
//                     <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
//                       Status
//                     </p>
//                     <span
//                       className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                         statusStyles[order.status?.toLowerCase()] ||
//                         "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>

//                   <div className="text-center">
//                     <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
//                       Total
//                     </p>
//                     <p className="font-bold text-slate-800">
//                       ₹{Number(order.total_price).toLocaleString("en-IN")}
//                     </p>
//                   </div>

//                   <ChevronRight className="w-5 h-5 text-slate-300" />
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Box,
  Star,
} from "lucide-react";

const shippingStatusStyles = {
  pending: "bg-orange-100 text-orange-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  on_the_way: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  canceled: "bg-red-100 text-red-700",
};

const paymentStatusStyles = {
  pending: "bg-orange-100 text-orange-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  canceled: "bg-red-100 text-red-700",
};

function normalizeStatus(status) {
  if (!status) return "";

  return String(status)
    .trim()
    .toLowerCase()
    .replace(/-/g, "_")
    .replace(/\s+/g, "_");
}

function getOrderCategory(order) {
  const paymentStatus =
    normalizeStatus(order.status);

  const shippingStatus =
    normalizeStatus(
      order.shipping_status
    );

  if (
    paymentStatus === "cancelled" ||
    paymentStatus === "canceled" ||
    shippingStatus === "cancelled" ||
    shippingStatus === "canceled"
  ) {
    return "cancelled";
  }

  if (shippingStatus === "delivered") {
    return "review";
  }

  if (
    shippingStatus === "on_the_way" ||
    shippingStatus === "shipped"
  ) {
    return "receive";
  }

  if (paymentStatus === "paid") {
    return "ship";
  }

  if (paymentStatus === "pending") {
    return "pay";
  }

  return "all";
}

export default function MyOrders({
  orders = [],
  loading = false,
}) {
  const [activeTab, setActiveTab] =
    useState("all");

  const tabs = [
    {
      key: "all",
      label: "All",
      icon: <ClipboardList size={17} />,
    },
    {
      key: "pay",
      label: "To Pay",
      icon: <CreditCard size={17} />,
    },
    {
      key: "ship",
      label: "To Ship",
      icon: <Box size={17} />,
    },
    {
      key: "receive",
      label: "To Receive",
      icon: <Truck size={17} />,
    },
    {
      key: "review",
      label: "To Review",
      icon: <Star size={17} />,
    },
  ];

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") {
      return orders;
    }

    return orders.filter(
      (order) =>
        getOrderCategory(order) ===
        activeTab
    );
  }, [orders, activeTab]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-medium text-slate-600">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-[#17395A] mb-6">
        My Orders
      </h1>

      {/* TABS */}
      <div className="flex items-center gap-8 border-b border-slate-300 mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const active =
            activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`relative flex items-center gap-2 pb-4 whitespace-nowrap text-sm font-medium transition ${
                active
                  ? "text-[#2C5C6E]"
                  : "text-slate-600 hover:text-[#2C5C6E]"
              }`}
            >
              {tab.icon}

              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2C5C6E]" />
              )}
            </button>
          );
        })}
      </div>

      {/* EMPTY */}
      {filteredOrders.length === 0 ? (
        <div className="border border-slate-200 rounded-2xl min-h-[260px] flex flex-col justify-center items-center text-center">
          <Package className="w-14 h-14 text-slate-300 mb-5" />

          <p className="text-slate-500">
            {activeTab === "receive"
              ? 'No orders in "To Receive" right now.'
              : activeTab === "review"
              ? 'No orders waiting for review right now.'
              : activeTab === "pay"
              ? 'No orders waiting for payment right now.'
              : activeTab === "ship"
              ? 'No orders waiting to ship right now.'
              : "No orders found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const shippingStatus =
              normalizeStatus(
                order.shipping_status
              );

            const paymentStatus =
              normalizeStatus(order.status);

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                  {/* ORDER */}
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 rounded-xl p-3">
                      <Truck className="w-5 h-5 text-slate-500" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Order #{order.id}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleDateString()
                          : "—"}{" "}
                        ·{" "}
                        {order.items?.length ||
                          0}{" "}
                        Item
                        {(order.items?.length ||
                          0) !== 1
                          ? "s"
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="flex items-center justify-between xl:justify-end gap-7">

                    {/* SHIPPING */}
                    <div className="text-center">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                        Shipping
                      </p>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          shippingStatusStyles[
                            shippingStatus
                          ] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.shipping_status ||
                          "Pending"}
                      </span>
                    </div>

                    {/* STATUS */}
                    <div className="text-center">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                        Status
                      </p>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          paymentStatusStyles[
                            paymentStatus
                          ] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status ||
                          "Pending"}
                      </span>
                    </div>

                    {/* TOTAL */}
                    <div className="text-center">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                        Total
                      </p>

                      <p className="font-bold text-slate-800">
                        ₹
                        {Number(
                          order.total_price ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}