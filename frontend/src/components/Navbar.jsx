import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, ShieldCheck } from "lucide-react";

export default function Navbar({ user, setUser }) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("token", "");
    setUser(null);
    navigate("/login");
  };

  console.log("Navbar User", user);
  return (
    <div className="navbar shadow-md px-4 md:px-8 sticky top-0 backdrop-blur-lg bg-base-100 z-999">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-center text-primary"
        >
          MeritAuth
        </Link>
      </div>
      <div className="md:hidden flex-none gap-2">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold">{user.fullName}</p>
              <p className="text-xs opacity-60 capitalize">{user.role}</p>
            </div>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>{user.fullName}</span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">
                    <User size={16} /> Profile
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link to="/admin/dashboard">
                      <ShieldCheck size={16} /> Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="text-error">
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : isLoginPage ? (
          <Link to="/signup" className="btn btn-primary btn-sm">
            Signup
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>

      {/* Desktop Screen */}
      <div className="hidden md:flex flex-none items-center gap-6">
        {user ? (
          <>
            {/* Common Links */}
            <Link to="/profile" className="btn btn-ghost btn-sm">
              <User size={16} /> Profile
            </Link>

            {/* Admin Only */}
            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="btn btn-ghost btn-sm">
                <ShieldCheck size={16} /> Admin Dashboard
              </Link>
            )}

            {/* User Info */}
            <div className="flex gap-2">
              <div className="text-right">
                <p className="text-sm font-bold">{user.fullName}</p>
                <p className="text-xs opacity-60 capitalize">{user.role}</p>
              </div>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar placeholder"
                >
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{user.fullName}</span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                >
                  <li className="bg-base-100 px-2 py-4 rounded-md shadow-sm shadow-gray-400">
                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="btn btn-error btn-sm z-5"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : isLoginPage ? (
          <Link to="/signup" className="btn btn-primary btn-sm">
            Signup
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
