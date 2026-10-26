

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ManageAccount from "../component/dashboard/tabs/ManageAccount";
// import MyOrders from "../component/dashboard/tabs/MyOrders";
// import MyReviews from "../component/dashboard/tabs/MyReviews";
// import { User, ShoppingBag, Heart, Star, XCircle, LogOut } from "lucide-react";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("account");

//   // Check authentication
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       router.replace("/auth"); // if not logged in
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

  
//   const handleLogout = () => {
//     try {
      
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");

     
//       localStorage.clear();

      
//       router.push("/login");

      
//       router.refresh();
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const renderTab = () => {
//     switch (activeTab) {
//       case "account":
//         return <ManageAccount />;
//       case "orders":
//         return <MyOrders />;
//       case "reviews":
//         return <MyReviews />;
//       case "returns":
//       default:
//         return <ManageAccount />;
//     }
//   };

//   const menuItems = [
//     { key: "account", label: "Manage My Account", icon: <User size={20} /> },
//     { key: "orders", label: "My Orders", icon: <ShoppingBag size={20} /> },
//     { key: "reviews", label: "My Reviews", icon: <Star size={20} /> },
//   ];

//   if (loading) return <p className="text-center mt-20">Checking authentication...</p>;

//   return (
//     <div className="wrapper py-40 px-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
        
//         {/* Sidebar */}
//         <div className="w-full lg:w-1/4 bg-gray-50 border-r p-6 space-y-3">
//           {menuItems.map((item) => (
//             <div
//               key={item.key}
//               onClick={() => setActiveTab(item.key)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
//                 activeTab === item.key
//                   ? "bg-[#2C5C6E]/10 text-[#2C5C6E] font-semibold"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </div>
//           ))}

//           {/* Logout */}
//           <div
//             onClick={handleLogout}
//             className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500"
//           >
//             <LogOut size={20} />
//             <span>Logout</span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="w-full lg:w-3/4 p-8">
//           {renderTab()}
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManageAccount from "../component/dashboard/tabs/ManageAccount";
import MyOrders from "../component/dashboard/tabs/MyOrders";
import MyReviews from "../component/dashboard/tabs/MyReviews";
import {
  User,
  ShoppingBag,
  Star,
  LogOut,
} from "lucide-react";
import { authFetch } from "../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");

  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [ordersLoading, setOrdersLoading] =
    useState(false);

  const [reviewsLoading, setReviewsLoading] =
    useState(false);

  // --------------------------------------------------
  // AUTH
  // --------------------------------------------------

  useEffect(() => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      router.replace("/auth");
      return;
    }

    setLoading(false);
  }, [router]);

  // --------------------------------------------------
  // FETCH ORDERS
  // --------------------------------------------------

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const res = await authFetch(
        `${API_BASE_URL}/api/orders/history/`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch orders"
        );
      }

      const data = await res.json();

      setOrders(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );

      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // --------------------------------------------------
  // FETCH REVIEWS
  // --------------------------------------------------

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const res = await authFetch(
        `${API_BASE_URL}/api/reviews/`
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch reviews"
        );
      }

      const data = await res.json();

      /*
       * Handles both:
       *
       * [
       *   {...},
       *   {...}
       * ]
       *
       * and:
       *
       * {
       *   results: [...]
       * }
       */
      if (Array.isArray(data)) {
        setReviews(data);
      } else if (
        Array.isArray(data?.results)
      ) {
        setReviews(data.results);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch reviews:",
        error
      );

      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD TAB DATA
  // --------------------------------------------------

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }

    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    try {
      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem(
        "refresh_token"
      );

      localStorage.clear();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  };

  // --------------------------------------------------
  // TAB CONTENT
  // --------------------------------------------------

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return <ManageAccount />;

      case "orders":
        return (
          <MyOrders
            orders={orders}
            loading={ordersLoading}
            refreshOrders={fetchOrders}
          />
        );

      case "reviews":
        return (
          <MyReviews
            reviews={reviews}
            loading={reviewsLoading}
            refreshReviews={fetchReviews}
          />
        );

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
      key: "reviews",
      label: "My Reviews",
      icon: <Star size={20} />,
    },
  ];

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">
          Checking authentication...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <div className="wrapper py-40 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">

        {/* SIDEBAR */}
        <div className="w-full lg:w-1/4 bg-gray-50 border-r p-6 space-y-3">

          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                setActiveTab(item.key)
              }
              className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-left ${
                activeTab === item.key
                  ? "bg-[#2C5C6E]/10 text-[#2C5C6E] font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="w-full lg:w-3/4 p-8">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}