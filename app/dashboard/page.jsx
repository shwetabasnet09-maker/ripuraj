

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ManageAccount from "../component/dashboard/tabs/ManageAccount";
import MyOrders from "../component/dashboard/tabs/MyOrders";
import Wishlist from "../component/dashboard/tabs/Wishlist";
import MyReviews from "../component/dashboard/tabs/MyReviews";
import ReturnsCancellations from "../component/dashboard/tabs/ReturnsCancellations";
import { User, ShoppingBag, Heart, Star, XCircle, LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/auth"); // if not logged in
    } else {
      setLoading(false);
    }
  }, [router]);

  
  const handleLogout = () => {
    try {
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

     
      localStorage.clear();

      
      router.push("/login");

      
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return <ManageAccount />;
      case "orders":
        return <MyOrders />;
      case "wishlist":
        return <Wishlist />;
      case "reviews":
        return <MyReviews />;
      case "returns":
        return <ReturnsCancellations />;
      default:
        return <ManageAccount />;
    }
  };

  const menuItems = [
    { key: "account", label: "Manage My Account", icon: <User size={20} /> },
    { key: "orders", label: "My Orders", icon: <ShoppingBag size={20} /> },
    { key: "wishlist", label: "My Wishlist", icon: <Heart size={20} /> },
    { key: "reviews", label: "My Reviews", icon: <Star size={20} /> },
    { key: "returns", label: "My Return & Cancellations", icon: <XCircle size={20} /> },
  ];

  if (loading) return <p className="text-center mt-20">Checking authentication...</p>;

  return (
    <div className="wrapper py-40 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-gray-50 border-r p-6 space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
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
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-3/4 p-8">
          {renderTab()}
        </div>

      </div>
    </div>
  );
}