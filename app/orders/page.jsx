// import Link from "next/link";
// import { Package, Truck, ChevronRight } from "lucide-react";
// import { orders } from "../data/date";

// const statusStyles = {
//   Delivered: "bg-green-100 text-green-700",
//   Shipped: "bg-blue-100 text-blue-700",
//   Processing: "bg-yellow-100 text-yellow-700",
// };

// export default function OrdersPage() {
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

//         {/* Orders list */}
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
//                   <h3 className="font-bold text-slate-800">{order.id}</h3>
//                   <p className="text-slate-500 text-sm">
//                     {order.date} · {order.items} Item
//                     {order.items > 1 ? "s" : ""}
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
//                       statusStyles[order.status] || "bg-gray-100 text-gray-600"
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
//                     ₹{order.total?.toLocaleString("en-IN")}
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

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Truck, ChevronRight } from "lucide-react";
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const statusStyles = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authFetch(
          `${API_BASE_URL}/api/orders/history/`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg font-medium">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold">No Orders Found</h2>
        <p className="text-gray-500 mt-2">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <Package className="w-6 h-6 text-slate-700" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Order History
          </h1>
        </div>

        <p className="text-slate-500 mb-8">
          Check the status of recent orders and manage returns.
        </p>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 rounded-xl p-3">
                  <Truck className="w-5 h-5 text-slate-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Order #{order.id}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString()} ·{" "}
                    {order.items?.length || 0} Item
                    {(order.items?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                    Status
                  </p>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      statusStyles[
                        order.status?.toLowerCase()
                      ] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                    Total
                  </p>

                  <p className="font-bold text-slate-800">
                    ₹{Number(order.total_price).toLocaleString("en-IN")}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}