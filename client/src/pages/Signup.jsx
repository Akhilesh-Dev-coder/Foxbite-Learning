import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import logo from "../assets/logo.jpg";

const Signup = () => {
  const { register, isAuthenticated, user, error, clearErrors } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    batch: "+2", // Default to +2
  });
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, batch } = formData;

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearErrors();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password, batch });
  };

  return (
    <div className="min-h-screen md:min-h-[80vh] flex items-center justify-center p-0 md:p-4 relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 md:bg-none">
      {/* Background Decoration (Desktop Only) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-blob animate-delay-200" />
      </div>

      <div className="w-full max-w-5xl bg-white/60 md:bg-white/80 backdrop-blur-xl md:backdrop-blur-2xl rounded-none md:rounded-[2.5rem] shadow-none md:shadow-2xl border-none md:border border-white/50 overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[600px]">
        {/* Left Side: Brand Visual */}
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-primary via-purple-600 to-secondary p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit text-sm font-medium">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="font-bold tracking-widest text-xs uppercase">
                Join the Elite
              </span>
            </div>
            <h2 className="text-4xl font-display font-bold leading-tight mb-4">
              Start Your
              <br />
              Success Story.
            </h2>
            <p className="text-indigo-100 leading-relaxed font-light text-lg">
              Join thousands of students topping their exams with Foxbite's
              premium resources.
            </p>
          </div>

          {/* Testimonial Snippet */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mt-8 shadow-lg">
            <p className="text-sm italic text-indigo-50 mb-4 font-medium">
              "I never thought studying could be this organized. Foxbite changed
              everything for me!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md border-2 border-white/20" />
              <div>
                <h5 className="font-bold text-xs tracking-wide">Goutham</h5>
                <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">
                  +2 State Rank Holder
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm opacity-80 mt-auto pt-8 text-indigo-200">
            © 2026 Foxbite Learning
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-12 relative flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/20 mb-6 mx-auto md:mx-0">
              <img
                src={logo}
                alt="Foxbite Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-dark mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">Join Foxbite Learning today.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 mb-6 rounded-xl text-sm flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium text-dark"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium text-dark"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Batch / Class
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none">
                  <Sparkles size={20} />
                </div>
                <select
                  name="batch"
                  value={batch}
                  onChange={onChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium text-dark appearance-none cursor-pointer"
                >
                  <option value="+1">+1 (Class 11)</option>
                  <option value="+2">+2 (Class 12)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Password
              </label>
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
                  minLength="6"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium text-dark"
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
              className="w-full py-4 bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group mt-4"
            >
              Start Learning Now{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
