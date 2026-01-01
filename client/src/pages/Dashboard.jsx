import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, FileText, CheckCircle, AlertCircle, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const subjects = ["Physics", "Chemistry", "Maths"];

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const res = await axios.get("/api/pdfs");
      setPdfs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleOpenPdf = (id) => {
    navigate(`/view/${id}`);
  };

  if (!user)
    return <div className="p-10 text-center">Loading User Data...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome & Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-gray-600 mb-4">
              Batch: {user.batch} | State Syllabus
            </p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
            title="Sign Out"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline font-medium">Sign Out</span>
          </button>
        </div>

        {!user.isApproved ? (
          <div className="flex items-center p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <AlertCircle className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold">Account Pending Approval</p>
              <p className="text-sm">
                Please wait for admin to approve your account.
              </p>
            </div>
          </div>
        ) : !user.hasPaid ? (
          <div className="flex flex-col md:flex-row items-center md:justify-between p-4 bg-blue-50 text-blue-800 rounded-lg gap-4">
            <div className="flex items-start md:items-center w-full md:w-auto">
              <Lock className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5 md:mt-0" />
              <div>
                <p className="font-semibold">Payment Pending</p>
                <p className="text-sm opacity-80">
                  Purchase the full course to unlock all PDFs.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/918848319326?text=I%20want%20to%20buy%20Foxbite%20Course"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span className="text-lg">💬</span> Buy via WhatsApp
            </a>
          </div>
        ) : (
          <div className="flex items-center p-4 bg-green-50 text-green-800 rounded-lg">
            <CheckCircle className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold">Access Granted</p>
              <p className="text-sm">
                You have full access to study materials.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Subject Tabs */}
      <div>
        <div className="flex space-x-4 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar pb-1">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${
                activeSubject === subject
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-dark"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* PDF List */}
        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading content...</p>
          ) : pdfs.filter((p) => p.subject === activeSubject).length > 0 ? (
            pdfs
              .filter((p) => p.subject === activeSubject)
              .map((pdf) => (
                <div
                  key={pdf._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition gap-3"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2 bg-red-50 rounded-lg shrink-0">
                      <FileText className="text-red-500 w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate pr-2">
                        {pdf.title}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        {new Date(pdf.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {user.hasPaid ? (
                    <button
                      onClick={() => handleOpenPdf(pdf._id)}
                      className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-blue-600"
                    >
                      View PDF
                    </button>
                  ) : (
                    <div
                      className="p-2 bg-gray-100 rounded-full text-gray-400 cursor-not-allowed"
                      title="Purchase to unlock"
                    >
                      <Lock size={20} />
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="text-gray-500 italic py-4">
              No materials available for {activeSubject} yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
