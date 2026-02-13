import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      setWishlist(data);
    }

    fetchWishlist();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.map((item) => (
        <div key={item.id} className="border-b py-4">
          {item.product_name}
        </div>
      ))}
    </div>
  );
}
