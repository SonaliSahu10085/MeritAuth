import { useState } from "react";

export default function ProfilePage({ user, notify, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize state with user data
  const [profile, setProfile] = useState({
    name: user.fullName || "",
    email: user.email || "",
    role: user.role || "user",
  });

  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // 1. UPDATE PROFILE API (Now handles Name and Email)
  const handleProfileSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/myProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Sending both name and email to the backend
        body: JSON.stringify({
          fullName: profile.name,
          email: profile.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Update failed");

      // Update global user state for Navbar/App
      setUser({ ...user, fullName: profile.name, email: profile.email });

      setIsEditing(false);
      notify("Profile updated successfully!", "success");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

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
      if (!response.ok)
        throw new Error(data.message || "Password change failed");

      notify("Password updated successfully!", "success");
      document.getElementById("password-modal").checked = false;
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-2xl">
              {profile.role === "admin" ? "Admin " : "User "} Profile
            </h2>
            {/* Toggle Edit/Save buttons for the whole section */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className={`btn btn-success btn-sm text-white ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="form-control">
              <label className="label my-4">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <br />
              <input
                type="text"
                className={`input input-bordered w-full ${
                  !isEditing ? "bg-base-200" : "input-primary"
                }`}
                value={profile.name}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            {/* Email Field (Now Editable) */}
            <div className="form-control">
              <label className="label my-4">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <br />
              <input
                type="email"
                className={`input input-bordered w-full ${
                  !isEditing ? "bg-base-200" : "input-primary"
                }`}
                value={profile.email}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="divider">Security</div>

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

      {/* --- PASSWORD MODAL --- */}
      <input type="checkbox" id="password-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Update Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label my-4">
                <span className="label-text">Current Password</span>
              </label>
              <br />
              <input
                type="password"
                className="input input-bordered w-full"
                required
                value={passwords.old}
                onChange={(e) =>
                  setPasswords({ ...passwords, old: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label my-4">
                <span className="label-text">New Password</span>
              </label>
              <br />
              <input
                type="password"
                className="input input-bordered w-full"
                required
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label my-4">
                <span className="label-text">Confirm New Password</span>
              </label>
              <br />
              <input
                type="password"
                className="input input-bordered w-full"
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
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
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
