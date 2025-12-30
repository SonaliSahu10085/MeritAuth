import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, ShieldCheck } from "lucide-react";

export default function Navbar({ user, setUser }) {
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
        <Link to="/" className="text-3xl font-bold text-center text-primary">
          MeritAuth
        </Link>
      </div>
      <div className="flex-none gap-2">
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
                    <Link to="/admin">
                      <ShieldCheck size={16} /> Admin
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
        ) : (
          <Link to="/signup" className="btn btn-primary btn-sm">
            Signup
          </Link>
        )}
      </div>
    </div>
  );
}
