"use client";

import { ShoppingBag, CreditCard, Truck, Home, X } from "lucide-react";

// Maps to a combination of two separate backend fields:
//   - order.status          -> "pending" | "paid" | "cancelled" | "refunded" | "failed"
//   - order.shipping_status -> "pending" | "on_the_way" | "delivered"
// (confirmed from the Django admin dropdown, which only has those three
// shipping_status choices — there is no separate "processing"/"shipped").
// The first two stages are driven by `status`, the rest by `shipping_status`.
const STAGES = [
  { key: "order_placed", label: "Order Placed", icon: ShoppingBag },
  { key: "paid", label: "Payment Confirmed", icon: CreditCard },
  { key: "on_the_way", label: "On the Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

const CANCELLED_STATUSES = ["cancelled", "canceled", "refunded", "failed"];

// Normalizes away spaces/underscores/casing so "On the Way", "on_the_way",
// "on the way", etc. all compare equal — protects against small
// formatting differences between what the backend serializes and what
// we expect here.
const normalizeKey = (value) => value?.toLowerCase().replace(/[\s_]+/g, "");

export default function ShippingTracker({ status, shippingStatus }) {
  const normalizedStatus = status?.toLowerCase();
  const shippingKey = normalizeKey(shippingStatus);

  // Cancelled/refunded/failed orders don't fit the linear progress
  // model — show a distinct, non-progress state instead of a
  // half-filled tracker that would be misleading.
  if (CANCELLED_STATUSES.includes(normalizedStatus)) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <X className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 capitalize">{status}</p>
          <p className="text-sm text-slate-500">
            This order was {normalizedStatus === "refunded" ? "refunded" : "not completed"}.
          </p>
        </div>
      </div>
    );
  }

  // Start from the payment status: "paid" means we've cleared stage 1
  // (Payment Confirmed); anything else (pending) sits at stage 0.
  let currentIndex = normalizedStatus === "paid" ? 1 : 0;

  // Then layer on shipping progress, if any. Only ever move forward —
  // shipping_status can't put us behind the payment stage.
  if (shippingKey === "delivered") {
    currentIndex = Math.max(currentIndex, 3);
  } else if (shippingKey === "ontheway") {
    currentIndex = Math.max(currentIndex, 2);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-6">Order Status</h2>

      {/* ---- DESKTOP: horizontal stepper ---- */}
      <div className="hidden md:flex items-start">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isUpcoming = i > currentIndex;

          return (
            <div key={stage.key} className="flex-1 flex items-start last:flex-none">
              <div className="flex flex-col items-center" style={{ width: 96 }}>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isComplete
                      ? "bg-green-600"
                      : isCurrent
                      ? "bg-[#335B6E] ring-4 ring-[#335B6E]/15"
                      : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isComplete || isCurrent ? "text-white" : "text-slate-400"
                    }`}
                  />
                </div>
                <p
                  className={`mt-2 text-xs text-center font-medium leading-tight ${
                    isUpcoming ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  {stage.label}
                </p>
              </div>

              {i < STAGES.length - 1 && (
                <div className="flex-1 h-[2px] mt-[18px] mx-1">
                  <div
                    className={`h-full rounded-full transition-colors ${
                      i < currentIndex ? "bg-green-600" : "bg-slate-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---- MOBILE: vertical stepper ---- */}
      <div className="md:hidden space-y-0">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isUpcoming = i > currentIndex;
          const isLast = i === STAGES.length - 1;

          return (
            <div key={stage.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isComplete
                      ? "bg-green-600"
                      : isCurrent
                      ? "bg-[#335B6E] ring-4 ring-[#335B6E]/15"
                      : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isComplete || isCurrent ? "text-white" : "text-slate-400"
                    }`}
                  />
                </div>
                {!isLast && (
                  <div
                    className={`w-[2px] flex-1 min-h-[24px] my-1 rounded-full ${
                      isComplete ? "bg-green-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>

              <p
                className={`text-sm font-medium pb-6 ${
                  isUpcoming ? "text-slate-400" : "text-slate-800"
                } ${isCurrent ? "text-[#335B6E]" : ""}`}
              >
                {stage.label}
                {isCurrent && (
                  <span className="block text-xs font-normal text-slate-500 mt-0.5">
                    Current status
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 