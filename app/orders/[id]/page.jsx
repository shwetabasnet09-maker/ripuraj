"use client";

import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const statusStyles = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
};

export default function OrderDetailsPage({ params }) {
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // params is a Promise in Next.js 15+ — resolve it once on mount.
  useEffect(() => {
    Promise.resolve(params).then((p) => setId(p.id));
  }, [params]);

  const fetchOrder = async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/orders/history/`);

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      // Matches the same id field used for routing on the Orders list
      // page (order.id — confirmed from the real API response there).
      const found = list.find((o) => String(o.id) === String(orderId));

      if (!found) {
        setError("Order not found.");
      } else {
        setOrder(found);
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError("Couldn't load this order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder(id);
  }, [id]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="bg-white border border-slate-200 rounded-2xl p-6 h-24" />
          <div className="bg-white border border-slate-200 rounded-2xl p-6 h-40" />
        </div>
      </div>
    );
  }

  // ---------------- ERROR / NOT FOUND ----------------
  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <p className="text-red-600 font-medium mb-2">
          {error || "Order not found"}
        </p>
        <Link
          href="/orders"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#335B6E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  const itemCount = order.items?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 pt-24 md:pt-28 pb-12">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#335B6E] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Package className="w-5 h-5 text-[#335B6E]" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Order #{order.id}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Placed on {new Date(order.created_at).toLocaleDateString()} •{" "}
            {itemCount} Item{itemCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Itemized list, if the backend includes full item details */}
        {itemCount > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Items
            </h2>

            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={item.id || i}
                  className="flex items-center justify-between text-sm border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {item.product_name || item.name || `Item ${i + 1}`}
                    </p>
                    <p className="text-slate-500 text-xs">
                      Qty: {item.quantity || 1}
                      {item.weight ? ` • ${item.weight}` : ""}
                    </p>
                  </div>
                  {(item.total_price || item.price) && (
                    <p className="font-medium text-slate-800">
                      ₹
                      {Number(
                        item.total_price || item.price
                      ).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                statusStyles[order.status?.toLowerCase()] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.payment_method && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Payment</span>
              <span className="font-medium text-slate-900">
                {order.payment_method}
              </span>
            </div>
          )}

          {order.delivery_method && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery</span>
              <span className="font-medium text-slate-900">
                {order.delivery_method}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm border-t pt-4">
            <span className="text-slate-500">Total Amount</span>
            <span className="font-bold text-slate-900">
              ₹{Number(order.total_price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}