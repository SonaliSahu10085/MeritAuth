import { useState } from "react";

export default function ProfilePage({ user, notify, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user.fullName,
    email: user.email,
    role: user.role,
  });

  //   console.log(profile);

  // Password State
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // 1. UPDATE PROFILE NAME API
  const handleProfileSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/myProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: profile.name }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Update failed");

      // Update global user state so Navbar/App reflects the change
      setUser({ ...user, fullName: profile.name });

      setIsEditing(false);
      notify("Profile name updated successfully!", "success");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // 2. UPDATE PASSWORD API
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      notify("New passwords do not match!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/changePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwords.old,
          newPassword: passwords.new,
        }),
      });

      const data = await response.json();
      //   console.log(data);
      if (!response.ok)
        throw new Error(data.message || "Password change failed");

      notify("Password updated successfully!", "success");

      // Close DaisyUI Modal
      document.getElementById("password-modal").checked = false;
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">
            {profile.role === "admin" ? "Admin " : "User "} Profile
          </h2>

          <div className="space-y-6">
            {/* Full Name Section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className={`input input-bordered flex-1 ${
                    !isEditing ? "bg-base-200" : "input-primary"
                  }`}
                  value={profile.name}
                  placeholder={profile.name}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-square btn-outline"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleProfileSave}
                    className="btn btn-success text-white"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            {/* Email Section (Read-Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-400">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered bg-base-300 cursor-not-allowed opacity-60"
                value={profile.email}
                readOnly
              />
            </div>

            <div className="divider">Security</div>

            {/* Change Password Button -> Triggers Modal */}
            <div className="flex justify-between items-center bg-base-200 p-4 rounded-lg">
              <p className="font-bold">Password</p>

              <label
                htmlFor="password-modal"
                className="btn btn-outline btn-sm"
              >
                Change Password
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* --- DAISYUI MODAL COMPONENT --- */}
      <input type="checkbox" id="password-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Update Password</h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
                value={passwords.old}
                onChange={(e) =>
                  setPasswords({ ...passwords, old: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <label htmlFor="password-modal" className="btn btn-ghost">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="password-modal">
          Close
        </label>
      </div>
    </div>
  );
}
