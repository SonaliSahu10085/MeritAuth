import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ notify }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Detailed Password Criteria State
  const [checks, setChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    digit: false,
    special: false,
  });

  // Real-time validation effect
  useEffect(() => {
    const pwd = formData.password;
    setChecks({
      length: pwd.length >= 6,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      digit: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  }, [formData.password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError("");

    // Check if all criteria are met
    const allMet = Object.values(checks).every(Boolean);
    if (!allMet) {
      notify("Please meet all password requirements", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notify("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      //   console.log(response);

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      notify("Account created successfully!", "success");
      navigate("/login");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper component for checklist items
  const CriteriaItem = ({ met, text }) => (
    <div
      className={`flex items-center gap-2 text-xs ${
        met ? "text-success" : "opacity-50"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${met ? "bg-success" : "bg-base-300"}`}
      />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-300">
        <form className="card-body" onSubmit={handleSignup}>
          <h2 className="text-2xl font-bold text-center text-primary">
            Join MeritAuth
          </h2>

          {serverError && (
            <div className="alert alert-error text-sm py-2">{serverError}</div>
          )}

          <div className="form-control">
            <label className="label my-4">
              <span className="label-text font-bold">Full Name</span>
            </label>
            <br />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Jhon Doe"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label my-4">
              <span className="label-text font-bold">Email</span>
            </label>
            <br />
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="email@example.com"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label my-4">
              <span className="label-text font-bold">Password</span>
            </label>
            <br />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Real-time Strength Checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 p-3 bg-base-200 rounded-lg">
              <CriteriaItem met={checks.length} text="6+ Characters" />
              <CriteriaItem met={checks.upper} text="Uppercase (A-Z)" />
              <CriteriaItem met={checks.lower} text="Lowercase (a-z)" />
              <CriteriaItem met={checks.digit} text="Number (0-9)" />
              <CriteriaItem met={checks.special} text="Special Char (!@#)" />
            </div>
          </div>

          <div className="form-control">
            <label className="label my-4">
              <span className="label-text font-bold">Confirm Password</span>
            </label>
            <br />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            className={`btn btn-primary mt-6 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <Link to="/login" className="link link-primary font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
