"use client";
import { useState, useEffect } from "react";

export default function MyOrders() {
  const [tab, setTab] = useState("All");
  const [orders, setOrders] = useState([]);

  const tabs = ["All", "To Pay", "To Ship", "To Receive", "To Review"];

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`/api/orders?status=${tab}`);
      const data = await res.json();
      setOrders(data);
    }

    fetchOrders();
  }, [tab]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="flex gap-6 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 ${
              tab === t
                ? "border-b-2 border-[#2C5C6E] text-[#2C5C6E]"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {orders.map((order) => (
        <div key={order.id} className="border-b py-4">
          {order.product_name} - Rs {order.price}
        </div>
      ))}
    </div>
  );
}
