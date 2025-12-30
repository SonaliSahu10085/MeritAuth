import { useState, useEffect } from "react";

export default function AdminDashboard({ notify }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const USERS_PER_PAGE = 10; // As per requirement

  // 1. Fetch Users with Pagination
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/admin/users?page=${page}&limit=${USERS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch users");

      setUsers(data.users); // Array of user objects
      setTotalPages(data.totalPages); // Backend should return total pages based on 10 per page
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // 2. Activate/Deactivate User Logic
  const toggleStatus = async (id, currentStatus) => {
    const action = currentStatus === "active" ? "deactivate" : "activate";

    // Confirmation dialog before actions
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/users/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: action === "activate" ? "active" : "inactive",
            }),
          }
        );

        const data = await response.json();
        console.log("data", data);
        if (!response.ok) throw new Error(data.message || "Update failed");

        // Success notification
        notify(`User successfully ${action}d`, "success");

        // Refresh the list for current page
        fetchUsers(currentPage);
      } catch (err) {
        notify(err.message, "error");
      }
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="badge badge-primary">Total Pages: {totalPages}</div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover">
                <td className="font-medium">{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-ghost capitalize">
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="text-center">
                  {/* Activate/Deactivate buttons */}
                  <button
                    onClick={() => toggleStatus(user.userId, user.status)}
                    className={`btn btn-xs ${
                      user.status === "active"
                        ? "btn-error btn-outline"
                        : "btn-success text-white"
                    }`}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (10 users per page) */}
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`join-item btn btn-sm ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
