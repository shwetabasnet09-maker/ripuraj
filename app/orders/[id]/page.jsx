import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { orders } from "@/app/data/page";


const OrderDetailsPage = ({ params }) => {
  const { id } = params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-12">
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
              Order {order.id}
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Placed on {order.date} • {order.items}{" "}
            {order.items > 1 ? "items" : "item"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="font-medium text-slate-900">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment</span>
            <span className="font-medium text-slate-900">
              {order.payment}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Delivery</span>
            <span className="font-medium text-slate-900">
              {order.delivery}
            </span>
          </div>

          <div className="flex justify-between text-sm border-t pt-4">
            <span className="text-slate-500">Total Amount</span>
            <span className="font-bold text-slate-900">
              {order.total}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;
