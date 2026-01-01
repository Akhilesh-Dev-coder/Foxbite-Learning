import logo from "../assets/logo.jpg";

import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Home,
  Book,
  Star,
  HelpCircle,
  MessageCircle,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", icon: <Home size={22} />, path: "/#hero" },
    { label: "Why Us", icon: <Star size={22} />, path: "/#why-us" },
    { label: "Courses", icon: <Book size={22} />, path: "/#courses" },
    {
      label: "Student Reviews",
      icon: <MessageCircle size={22} />,
      path: "/#reviews",
    },
    { label: "FAQ", icon: <HelpCircle size={22} />, path: "/#faq" },
  ];

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") return;

    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sidebar Container (Desktop Only) */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-2xl border-r border-white/20 shadow-2xl z-40 flex-col">
        {/* Background Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />

        <div className="flex flex-col h-full relative z-10">
          {/* Logo */}
          <div className="p-8 pb-6 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 bg-white">
              <img
                src={logo}
                alt="Foxbite Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-dark tracking-tight leading-none">
                Foxbite
              </h1>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Learning
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
            {navItems.map((item) =>
              location.pathname === "/" ? (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.path.replace("/", ""));
                  }}
                  className="flex items-center space-x-4 px-5 py-3.5 text-gray-500 rounded-2xl hover:bg-blue-50/80 hover:text-primary transition-all group relative overflow-hidden"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {item.icon}
                  </span>
                  <span className="font-medium text-base relative z-10">
                    {item.label}
                  </span>
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.path.replace("#", "") === "/hero" ? "/" : "/"}
                  className="flex items-center space-x-4 px-5 py-3.5 text-gray-500 rounded-2xl hover:bg-blue-50/80 hover:text-primary transition-all group relative overflow-hidden"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {item.icon}
                  </span>
                  <span className="font-medium text-base relative z-10">
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )
            )}

            <div className="pt-8 mt-4 px-2">
              <div className="bg-gradient-to-br from-dark to-gray-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/30 transition-colors" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-primary-light">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Premium Support
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    Need help with your batch or notes? We are here 24/7.
                  </p>
                  <a
                    href="https://wa.me/918848319326"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-white text-dark rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 m-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-2 pb-3 mb-2 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {user?.name?.[0] || "U"}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-dark truncate">
                      {user?.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
                >
                  <LayoutDashboard size={18} />
                  <span className="font-medium text-sm">
                    {user?.role === "admin" ? "Admin" : "Dashboard"}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block w-full py-2.5 text-center text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-hover rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 bg-white/80 backdrop-blur-2xl border border-white/50 lg:hidden rounded-2xl shadow-2xl shadow-primary/10 pb-safe">
        <div className="flex justify-between items-center px-4 py-3">
          {navItems.slice(0, 4).map((item) => {
            const isActive =
              location.pathname === "/" && item.path.includes("#")
                ? false // Can't easily track hash active state without more logic, simplified for now
                : location.pathname === item.path.replace("#", ""); // Basic check

            // Better active check needed or just rely on click
            // For now, let's make it look good regardless of active state

            return location.pathname === "/" ? (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.path.replace("/", ""));
                }}
                className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-primary transition-colors group relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm" />
                <div className="group-hover:-translate-y-1 transition-transform duration-300">
                  {item.icon}
                </div>
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.path.replace("#", "") === "/hero" ? "/" : "/"}
                className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-primary transition-colors group relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm" />
                <div className="group-hover:-translate-y-1 transition-transform duration-300">
                  {item.icon}
                </div>
              </Link>
            );
          })}

          {/* Mobile Profile Link */}
          <Link
            to={
              isAuthenticated
                ? user?.role === "admin"
                  ? "/admin"
                  : "/dashboard"
                : "/login"
            }
            className="flex flex-col items-center gap-1 p-2 group relative"
          >
            <div className="group-hover:-translate-y-1 transition-transform duration-300">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all ${
                  isAuthenticated
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-primary/30"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isAuthenticated ? (
                  <span className="text-sm font-bold">
                    {user?.name?.[0] || "U"}
                  </span>
                ) : (
                  <LayoutDashboard size={20} />
                )}
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
