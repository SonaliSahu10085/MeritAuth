import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser, notify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // BACKEND API INTEGRATION
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        // Server-side error display requirement
        throw new Error(data.message || "Invalid credentials");
      }

      // Success logic
      const userData = data.user; // Assuming backend returns { user: { name, role, email, token } }
      setUser(userData);

      // Store token in localStorage for persistence
      localStorage.setItem("token", data.token);

      notify(`Welcome back, ${userData.fullName}!`, "success");

      // ROLE-BASED REDIRECTION
      if (userData.role === "admin") {
        navigate("/admin"); // Redirect to admin dashboard
      } else if (userData.role === "user") {
        navigate("/profile"); // Redirect to welcome dashboard (users)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-300">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="text-2xl text-primary font-bold mb-4 text-center">
           Login to Your Account
          </h2>

          {/* Error Message Display */}
          {error && (
            <div className="alert alert-error mb-4 py-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered focus:input-primary"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered focus:input-primary"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control mt-8">
            <button
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </div>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            New to PurpleMerit?{" "}
            <Link to="/signup" className="link link-primary font-bold">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
