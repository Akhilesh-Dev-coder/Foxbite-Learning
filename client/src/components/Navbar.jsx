import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary text-xl font-bold"
        >
          <BookOpen size={24} />
          <span>Foxbite Learning</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {user && user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="font-medium text-dark hover:text-primary"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="font-medium text-dark hover:text-primary"
                >
                  Dashboard
                </Link>
              )}
              <span className="text-gray-400">|</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut size={18} className="mr-1" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
