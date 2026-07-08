// import { useEffect, useState } from "react";

// export default function ManageAccount() {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//   async function fetchProfile() {
//     // 1. Get the token from where you stored it during login
//     const token = localStorage.getItem("access_token"); 

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
          
//           "Authorization": `Bearer ${token}`, 
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setProfile(data);
//       } else {
//         console.error("Failed to fetch profile:", res.status);
      
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   fetchProfile();
// }, []);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Manage My Account</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-gray-50 p-6 rounded-xl border">
//           <h3 className="font-semibold mb-2">Personal Profile</h3>
//           <p>Phone - {profile.phone}</p>
//           <p>Email - {profile.email}</p>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-xl border">
//           <h3 className="font-semibold mb-2">Address</h3>
//           <p>{profile.address}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_BASE_URL =  "http://127.0.0.1:8000";

export default function ManageAccount() {
  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/accounts/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setProfile({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
          });
        }
      } catch (error) {
        console.error("Profile fetch error", error);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile
  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/accounts/profile/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (res.ok) {
        alert("Profile updated successfully");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
    }

    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage My Account</h2>

      <div className="bg-gray-50 p-6 rounded-xl border space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}