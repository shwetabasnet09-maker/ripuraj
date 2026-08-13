"use client";

import { ShoppingBag, CreditCard, PackageSearch, Truck, Home, X } from "lucide-react";

// Maps directly to the backend's order.status values. If your backend
// ever adds more granular statuses, add a matching entry here — the
// tracker will automatically grow to fit.
const STAGES = [
  { key: "pending", label: "Order Placed", icon: ShoppingBag },
  { key: "paid", label: "Payment Confirmed", icon: CreditCard },
  { key: "processing", label: "Processing", icon: PackageSearch },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

const CANCELLED_STATUSES = ["cancelled", "canceled", "refunded", "failed"];

export default function ShippingTracker({ status }) {
  const normalizedStatus = status?.toLowerCase();

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

  const currentIndex = STAGES.findIndex((s) => s.key === normalizedStatus);
  // Unknown/unmapped status — don't guess a position, just show nothing
  // rather than an inaccurate tracker.
  if (currentIndex === -1) return null;

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
