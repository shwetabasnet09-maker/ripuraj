import { useEffect, useState } from "react";

export default function ManageAccount() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data);
    }

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage My Account</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl border">
          <h3 className="font-semibold mb-2">Personal Profile</h3>
          <p>Phone - {profile.phone}</p>
          <p>Email - {profile.email}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{profile.address}</p>
        </div>
      </div>
    </div>
  );
}
