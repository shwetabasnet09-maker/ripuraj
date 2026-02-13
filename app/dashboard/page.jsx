"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Star,
  XCircle,
  LogOut,
} from "lucide-react";

import ManageAccount from "../component/dashboard/tabs/ManageAccount";
import MyOrders from "../component/dashboard/tabs/MyOrders";
import Wishlist from "../component/dashboard/tabs/Wishlist";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return <ManageAccount />;
      case "orders":
        return <MyOrders />;
      case "wishlist":
        return <Wishlist />;
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
      key: "wishlist",
      label: "My Wishlist",
      icon: <Heart size={20} />,
    },
    {
      key: "reviews",
      label: "My Reviews",
      icon: <Star size={20} />,
    },
    {
      key: "returns",
      label: "My Return & Cancellations",
      icon: <XCircle size={20} />,
    },
  ];

  return (
    <div className="wrapper py-40 px-6">
      
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-[#2C5C6E]">
          Home
        </Link>
        <span className="mx-2">||</span>
        <span className="text-[#2C5C6E] font-medium">
          Dashboard
        </span>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-gray-50 border-r">
          <div className="p-6 space-y-3">

            {menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${
                    activeTab === item.key
                      ? "bg-[#2C5C6E]/10 text-[#2C5C6E] font-semibold"
                      : "hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}

            {/* Logout */}
            <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500">
              <LogOut size={20} />
              <span>Logout</span>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 p-8">
          {renderTab()}
        </div>

      </div>
    </div>
  );
}
