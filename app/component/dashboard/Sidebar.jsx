import { User, ShoppingBag, Heart, Star, XCircle, LogOut } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "account", label: "Manage My Account", icon: <User size={20} /> },
    { id: "orders", label: "My Orders", icon: <ShoppingBag size={20} /> },
    { id: "wishlist", label: "My Wishlist", icon: <Heart size={20} /> },
    { id: "reviews", label: "My Reviews", icon: <Star size={20} /> },
    { id: "returns", label: "My Return & Cancellations", icon: <XCircle size={20} /> },
  ];

  return (
    <div className="w-full lg:w-1/4 border-r p-6 space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl ${
            activeTab === item.id
              ? "bg-[#2C5C6E] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}

      <button className="w-full flex items-center gap-3 p-3 mt-4 text-red-500 hover:bg-red-50 rounded-xl">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
