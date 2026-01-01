import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";

const Login = () => {
  const { login, isAuthenticated, user, error, clearErrors } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [tempAuth, setTempAuth] = useState(null); // { token, user }

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.mustChangePassword) {
        setShowChangePasswordModal(true);
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearErrors();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen md:min-h-[80vh] flex items-center justify-center p-0 md:p-4 relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 md:bg-none">
      {/* Background Blobs (Desktop Only) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-blob animate-delay-200" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/60 md:bg-white/80 backdrop-blur-xl md:backdrop-blur-2xl rounded-none md:rounded-[2.5rem] shadow-none md:shadow-2xl border-none md:border border-white/50 overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[600px]"
      >
        {/* Left Side - Hero/Brand */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary via-purple-600 to-secondary relative p-12 flex-col justify-between text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              <Sparkles size={14} className="text-yellow-300" />
              <span>Student Portal</span>
            </div>
            <h2 className="text-4xl font-display font-bold leading-tight mb-4">
              Welcome back, <br /> Scholar! 🎓
            </h2>
            <p className="text-indigo-100 text-lg font-light leading-relaxed max-w-xs">
              Continue your journey to academic excellence. Your notes are
              waiting.
            </p>
          </div>

          <div className="relative z-10 text-sm text-indigo-200">
            © 2026 Foxbite Learning
          </div>

          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/20 mb-6 mx-auto md:mx-0">
              <img
                src={logo}
                alt="Foxbite Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-dark mb-2">Sign In</h3>
            <p className="text-gray-500">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 mb-6 rounded-xl text-sm flex items-center gap-2 border border-red-100"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-primary hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot Password? 🔐
            </h3>
            <p className="text-gray-600 mb-6 font-medium">
              For security, password resets are handled manually by the admin.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Step 1: Contact Admin
                </p>
                <p className="text-xs text-blue-600">
                  Message us on WhatsApp with your registered email to request a
                  new password.
                </p>
              </div>

              <a
                href="https://wa.me/918848319326?text=I%20forgot%20my%20password%20for%20Foxbite%20Learning.%20My%20email%20is:..."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-green-600 text-white text-center font-bold rounded-xl hover:bg-green-700 transition"
              >
                Chat on WhatsApp 💬
              </a>

              <button
                onClick={() => setShowForgotModal(false)}
                className="block w-full py-3 text-gray-500 font-bold hover:text-gray-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Force Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-4 border-red-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Security Alert 🛡️
            </h3>
            <p className="text-gray-600 mb-6">
              Your password was reset by an admin. For your privacy, you must
              set a new secure password now to continue.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none"
                  placeholder="Enter new private password"
                  autoFocus
                />
              </div>

              <button
                onClick={async () => {
                  if (newPassword.length < 6) {
                    alert("Password must be at least 6 characters");
                    return;
                  }
                  try {
                    await axios.put("/api/auth/change-password", {
                      password: newPassword,
                    });
                    alert("Password secure! Logging you in...");
                    window.location.reload(); // Refresh to clear flags and redirect
                  } catch (err) {
                    console.error(err);
                    alert("Failed to set password. Try again.");
                  }
                }}
                className="block w-full py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-500/30"
              >
                Set Private Password & Login
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Login;
