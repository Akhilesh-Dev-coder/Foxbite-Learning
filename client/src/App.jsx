import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PDFViewer from "./pages/PDFViewer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Set Axios Base URL
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen bg-background text-dark font-sans antialiased">
          {/* Sidebar (Fixed on Desktop, Drawer on Mobile) */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-64 w-full min-h-screen transition-all duration-300">
            <div className="container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/view/:id"
                  element={
                    <ProtectedRoute>
                      <PDFViewer />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
