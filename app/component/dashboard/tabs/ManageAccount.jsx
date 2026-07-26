"use client";

import { useEffect, useState } from "react";
import { authFetch } from "../../../utils/authFetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ManageAccount() {
  const [profile, setProfile] = useState({
    username: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/accounts/profile/`, {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setProfile({
        username: data.username || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        setError("The server took too long to respond.");
      } else if (err.message === "Failed to fetch") {
        setError(
          "Couldn't reach the server. Check your internet connection, or the backend may be temporarily down."
        );
      } else {
        setError(err.message || "Failed to load your profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/accounts/profile/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setEditingProfile(false);
        setEditingAddress(false);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Profile save error:", err);
      alert(
        err.message === "Failed to fetch"
          ? "Couldn't reach the server. Check your connection and try again."
          : "Something went wrong while saving."
      );
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
        {[0, 1].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <p className="text-red-600 font-medium mb-2">
          Couldn't load your account
        </p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button
          onClick={fetchProfile}
          className="bg-[#2f5f73] hover:bg-[#244a5a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
        Manage My Account
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* PERSONAL PROFILE CARD */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-semibold text-[#1a1a1a] text-[15px]">
              Personal Profile
            </h3>
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="text-[#2f5f73] text-sm font-medium hover:underline"
            >
              {editingProfile ? "Cancel" : "Edit"}
            </button>
          </div>

          {editingProfile ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5f73]/30"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5f73]/30"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#2f5f73] hover:bg-[#244a5a] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-gray-700">
              <p>Phone – {profile.phone || "Not added"}</p>
              <p>Email – {profile.email || "Not added"}</p>
            </div>
          )}
        </div>

        {/* ADDRESS CARD */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h3 className="font-semibold text-[#1a1a1a] text-[15px]">Address</h3>
            <button
              onClick={() => setEditingAddress(!editingAddress)}
              className="text-[#2f5f73] text-sm font-medium hover:underline"
            >
              {editingAddress ? "Cancel" : "Edit"}
            </button>
          </div>

          {editingAddress ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5f73]/30"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#2f5f73] hover:bg-[#244a5a] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Default Shipping Address
                </p>
                <p className="text-sm text-gray-500 border-b border-gray-100 pb-1.5 mb-1.5">
                  {profile.username || "User name"}
                </p>
                <p className="text-sm text-gray-500">
                  {profile.address || "Address"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Default Billing Address
                </p>
                <p className="text-sm text-gray-500 border-b border-gray-100 pb-1.5 mb-1.5">
                  {profile.username || "User name"}
                </p>
                <p className="text-sm text-gray-500">
                  {profile.address || "Address"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}