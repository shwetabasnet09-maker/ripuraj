import Link from "next/link";
import { Truck, Package, ChevronRight } from "lucide-react";
import { orders } from "../data/page";

const OrdersPage = () => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-1 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Package className="w-6 h-6 text-[#335B6E]" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Order History
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-12">
            Check the status of recent orders and manage returns.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block"
            >
              <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#335B6E]/30 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#335B6E]/5 group-hover:text-[#335B6E] transition-colors">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-[#335B6E] transition-colors">
                        {order.id}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {order.date} • {order.items}{" "}
                        {order.items > 1 ? "Items" : "Item"}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                        Status
                      </p>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusStyles(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                        Total
                      </p>
                      <p className="font-bold text-slate-900">
                        {order.total}
                      </p>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#335B6E] transition-all duration-300 hidden md:block">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;
