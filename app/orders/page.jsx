

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Package, Truck, ChevronRight } from "lucide-react";
// import { authFetch } from "../utils/authFetch";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const statusStyles = {
//   delivered: "bg-green-100 text-green-700",
//   shipped: "bg-blue-100 text-blue-700",
//   processing: "bg-yellow-100 text-yellow-700",
//   paid: "bg-green-100 text-green-700",
//   pending: "bg-orange-100 text-orange-700",
// };

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await authFetch(
//           `${API_BASE_URL}/api/orders/history/`
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="text-lg font-medium">Loading orders...</div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center">
//         <Package className="w-16 h-16 text-gray-300 mb-4" />
//         <h2 className="text-2xl font-semibold">No Orders Found</h2>
//         <p className="text-gray-500 mt-2">
//           You haven't placed any orders yet.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-2">
//           <div className="bg-white rounded-xl p-2 shadow-sm">
//             <Package className="w-6 h-6 text-slate-700" />
//           </div>

//           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//             Order History
//           </h1>
//         </div>

//         <p className="text-slate-500 mb-8">
//           Check the status of recent orders and manage returns.
//         </p>

//         <div className="space-y-4">
//           {orders.map((order) => (
//             <Link
//               key={order.id}
//               href={`/orders/${order.id}`}
//               className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="bg-slate-100 rounded-xl p-3">
//                   <Truck className="w-5 h-5 text-slate-500" />
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-slate-800">
//                     Order #{order.id}
//                   </h3>

//                   <p className="text-slate-500 text-sm">
//                     {new Date(order.created_at).toLocaleDateString()} ·{" "}
//                     {order.items?.length || 0} Item
//                     {(order.items?.length || 0) !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-10">
//                 <div className="text-center">
//                   <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
//                     Status
//                   </p>

//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                       statusStyles[
//                         order.status?.toLowerCase()
//                       ] || "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
//                     Total
//                   </p>

//                   <p className="font-bold text-slate-800">
//                     ₹{Number(order.total_price).toLocaleString("en-IN")}
//                   </p>
//                 </div>

//                 <ChevronRight className="w-5 h-5 text-slate-300" />
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
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
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const paymentStatus = normalizeStatus(order.status);
  const shippingStatus = normalizeStatus(order.shipping_status);

  // Cancelled
  if (
    paymentStatus === "cancelled" ||
    paymentStatus === "canceled" ||
    shippingStatus === "cancelled" ||
    shippingStatus === "canceled"
  ) {
    return "cancelled";
  }

  // Delivered orders are ready for review
  if (shippingStatus === "delivered") {
    return "review";
  }

  // On the way / shipped = customer is waiting to receive
  if (
    shippingStatus === "on_the_way" ||
    shippingStatus === "shipped"
  ) {
    return "receive";
  }

  // Paid but not shipped yet
  if (paymentStatus === "paid") {
    return "ship";
  }

  // Payment pending
  if (paymentStatus === "pending") {
    return "pay";
  }

  return "all";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await authFetch(
          `${API_BASE_URL}/api/orders/history/`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") {
      return orders;
    }

    return orders.filter(
      (order) => getOrderCategory(order) === activeTab
    );
  }, [orders, activeTab]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8FAFC]">
        <p className="text-lg font-medium text-slate-600">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <Package className="w-6 h-6 text-slate-700" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Order History
          </h1>
        </div>

        <p className="text-slate-500 mb-8">
          Check the status of your recent orders and manage reviews.
        </p>

        {/* TABS */}
        <div className="bg-white rounded-2xl border border-slate-200 px-6 pt-5 mb-6 overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2 pb-4 text-sm font-medium transition ${
                    isActive
                      ? "text-[#2C5C6E]"
                      : "text-slate-500 hover:text-[#2C5C6E]"
                  }`}
                >
                  {tab.icon}

                  {tab.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2C5C6E]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* EMPTY */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl min-h-[300px] flex flex-col justify-center items-center text-center">
            <Package className="w-16 h-16 text-slate-300 mb-4" />

            <h2 className="text-xl font-semibold text-slate-700">
              No Orders Found
            </h2>

            <p className="text-slate-500 mt-2">
              {activeTab === "receive"
                ? 'No orders in "To Receive" right now.'
                : activeTab === "review"
                ? 'No orders waiting for review right now.'
                : activeTab === "pay"
                ? 'No orders waiting for payment right now.'
                : activeTab === "ship"
                ? 'No orders waiting to ship right now.'
                : "You haven't placed any orders yet."}
            </p>
          </div>
        ) : (
          /* ORDERS */
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const shippingStatus = normalizeStatus(
                order.shipping_status
              );

              const paymentStatus = normalizeStatus(
                order.status
              );

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* ORDER INFO */}
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 rounded-xl p-3">
                        <Truck className="w-5 h-5 text-slate-500" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800">
                          Order #{order.id}
                        </h3>

                        <p className="text-slate-500 text-sm">
                          {order.created_at
                            ? new Date(
                                order.created_at
                              ).toLocaleDateString()
                            : "—"}{" "}
                          ·{" "}
                          {order.items?.length || 0} Item
                          {(order.items?.length || 0) !== 1
                            ? "s"
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex items-center justify-between lg:justify-end gap-7">

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
                          {order.shipping_status || "Pending"}
                        </span>
                      </div>

                      {/* PAYMENT */}
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
                          {order.status || "Pending"}
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
                            order.total_price || 0
                          ).toLocaleString("en-IN")}
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
    </div>
  );
}