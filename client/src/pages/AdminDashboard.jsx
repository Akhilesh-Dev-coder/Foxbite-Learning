import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  Upload,
  CheckCircle,
  XCircle,
  DollarSign,
  UserCog,
  Trash2,
  Edit,
  Search,
  FileText,
  AlertCircle,
  BarChart3,
  LogOut,
  Key,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("users"); // users | upload
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contentBatchTab, setContentBatchTab] = useState("+1");

  const [uploadData, setUploadData] = useState({
    title: "",
    subject: "Physics",
    batch: "+1",
    file: null,
  });
  const [message, setMessage] = useState("");
  const [editingPdf, setEditingPdf] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchPDFs();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPDFs = async () => {
    try {
      const res = await axios.get("/api/pdfs");
      setPdfs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Stats Calculation
  const stats = {
    totalUsers: users.length,
    pendingUsers: users.filter((u) => !u.isApproved).length,
    paidUsers: users.filter((u) => u.hasPaid).length,
    totalPDFs: pdfs.length,
  };

  // Filtered Data
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPDFs = pdfs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Actions
  const deleteUser = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This cannot be undone."
      )
    ) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error("Delete User Error:", err);
        const errorMsg =
          err.response?.data?.msg || err.message || "Unknown Error";
        const status = err.response?.status
          ? ` (Status: ${err.response.status})`
          : "";
        alert(`Failed to delete user: ${errorMsg}${status}`);
      }
    }
  };

  const deletePDF = async (id) => {
    if (window.confirm("Are you sure you want to delete this PDF?")) {
      try {
        await axios.delete(`/api/pdfs/${id}`);
        setPdfs(pdfs.filter((p) => p._id !== id));
        if (editingPdf && editingPdf._id === id) cancelEdit();
      } catch (err) {
        console.error(err);
        alert("Failed to delete PDF");
      }
    }
  };

  const startEditPDF = (pdf) => {
    setEditingPdf(pdf);
    setUploadData({
      title: pdf.title,
      subject: pdf.subject,
      batch: pdf.batch,
      file: null,
    });
    // Switch to upload tab if not already
    setActiveTab("upload");
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setEditingPdf(null);
    setUploadData({ title: "", subject: "Physics", batch: "+1", file: null });
  };

  const toggleApproval = async (id) => {
    try {
      await axios.put(`/api/admin/users/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePayment = async (id) => {
    try {
      await axios.put(`/api/admin/users/${id}/payment`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleRole = async (id, currentRole) => {
    if (window.confirm(`Are you sure you want to change this user's role?`)) {
      try {
        const newRole = currentRole === "admin" ? "student" : "admin";
        await axios.put(`/api/admin/users/${id}/role`, { role: newRole });
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to update role");
      }
    }
  };

  const toggleBatch = async (id, newBatch) => {
    try {
      await axios.put(`/api/admin/users/${id}/batch`, { batch: newBatch });
      // Update local state to reflect change immediately
      setUsers(
        users.map((u) => (u._id === id ? { ...u, batch: newBatch } : u))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update batch");
    }
  };

  const resetPassword = async (id) => {
    const newPassword = prompt(
      "Enter new password for this user (min 6 chars):"
    );
    if (!newPassword) return; // User cancelled or empty
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await axios.put(`/api/admin/users/${id}/password`, {
        password: newPassword,
      });
      alert("Password updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    }
  };

  const handleFileChange = (e) => {
    setUploadData({ ...uploadData, file: e.target.files[0] });
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setMessage(editingPdf ? "Updating..." : "Uploading...");

    try {
      if (editingPdf) {
        await axios.put(`/api/pdfs/${editingPdf._id}`, {
          title: uploadData.title,
          subject: uploadData.subject,
          batch: uploadData.batch,
        });
        setMessage("PDF Updated Successfully!");
        cancelEdit();
        fetchPDFs();
      } else {
        const formData = new FormData();
        formData.append("file", uploadData.file);
        formData.append("title", uploadData.title);
        formData.append("subject", uploadData.subject);
        formData.append("batch", uploadData.batch);

        await axios.post("/api/pdfs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("PDF Uploaded Successfully!");
        setUploadData({
          title: "",
          subject: "Physics",
          batch: "+1",
          file: null,
        });
        fetchPDFs();
      }
    } catch (err) {
      setMessage("Operation Failed");
      console.error(err);
    }
  };

  if (!user || user.role !== "admin")
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Access Denied
      </div>
    );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Welcome back,{" "}
            <span className="font-semibold text-primary">{user.name}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-600 font-medium">
              {user.email}
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 border border-red-100"
            title="Sign Out"
          >
            <LogOut size={20} />
            <span className="hidden md:inline font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.totalUsers}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Pending Approvals
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.pendingUsers}
            </h3>
          </div>
          <div
            className={`p-3 rounded-lg ${
              stats.pendingUsers > 0
                ? "bg-yellow-50 text-yellow-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Active (Paid)</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.paidUsers}
            </h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Content</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.totalPDFs}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <FileText size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "users"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={16} /> Users
              </div>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "upload"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={16} /> Manage Content
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={
                activeTab === "users" ? "Search users..." : "Search content..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Content Views */}
        <div className="p-0">
          {/* USER TABLE */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <table className="hidden md:table min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Batch</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Payment</th>
                    <th className="px-6 py-4 text-center">Role</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr
                        key={u._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {u.name}
                          </div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={u.batch}
                            onChange={(e) => toggleBatch(u._id, e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
                          >
                            <option value="+1">+1</option>
                            <option value="+2">+2</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleApproval(u._id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              u.isApproved
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            {u.isApproved ? "Approved" : "Pending"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => togglePayment(u._id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              u.hasPaid
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {u.hasPaid ? "Paid" : "Unpaid"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold tracking-wide ${
                              u.role === "admin"
                                ? "text-purple-600 bg-purple-50"
                                : "text-gray-500"
                            }`}
                          >
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Quick Actions */}
                            <button
                              onClick={() => toggleRole(u._id, u.role)}
                              className="p-1.5 text-gray-400 hover:text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                              title="Manage Role"
                            >
                              <UserCog size={18} />
                            </button>
                            <button
                              onClick={() => deleteUser(u._id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button
                              onClick={() => resetPassword(u._id)}
                              className="p-1.5 text-gray-400 hover:text-yellow-600 rounded-md hover:bg-yellow-50 transition-colors"
                              title="Reset Password"
                            >
                              <Key size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users size={32} className="opacity-20" />
                          <p>No users found matching "{searchTerm}"</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile User Cards */}
              <div className="md:hidden space-y-4 p-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <div
                      key={u._id}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900">{u.name}</h4>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                        <select
                          value={u.batch}
                          onChange={(e) => toggleBatch(u._id, e.target.value)}
                          className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-primary focus:border-primary block p-1.5"
                        >
                          <option value="+1">+1</option>
                          <option value="+2">+2</option>
                        </select>
                      </div>

                      <div className="flex gap-2 text-xs">
                        <button
                          onClick={() => toggleApproval(u._id)}
                          className={`flex-1 py-1.5 rounded-lg font-medium border ${
                            u.isApproved
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          {u.isApproved ? "Approved" : "Pending"}
                        </button>
                        <button
                          onClick={() => togglePayment(u._id)}
                          className={`flex-1 py-1.5 rounded-lg font-medium border ${
                            u.hasPaid
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-white text-gray-600 border-gray-200"
                          }`}
                        >
                          {u.hasPaid ? "Paid" : "Unpaid"}
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span
                          className={`text-xs font-bold tracking-wide ${
                            u.role === "admin"
                              ? "text-purple-600"
                              : "text-gray-400"
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleRole(u._id, u.role)}
                            className="p-2 bg-white text-gray-500 hover:text-purple-600 rounded-lg border border-gray-200"
                            title="Manage Role"
                          >
                            <UserCog size={16} />
                          </button>
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="p-2 bg-white text-red-500 rounded-lg border border-gray-200"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => resetPassword(u._id)}
                            className="p-2 bg-white text-yellow-500 rounded-lg border border-gray-200"
                            title="Reset Password"
                          >
                            <Key size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <Users size={32} className="opacity-20 mx-auto mb-2" />
                    <p>No users found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTENT MANAGEMENT */}
          {activeTab === "upload" && (
            <div className="flex flex-col lg:flex-row">
              {/* Left Side: List */}
              <div className="flex-1 border-r border-gray-100">
                <div className="flex border-b border-gray-100 bg-gray-50">
                  <button
                    onClick={() => setContentBatchTab("+1")}
                    className={`flex-1 py-3 text-sm font-semibold text-center transition-colors ${
                      contentBatchTab === "+1"
                        ? "text-primary border-b-2 border-primary bg-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    +1 Batch
                  </button>
                  <button
                    onClick={() => setContentBatchTab("+2")}
                    className={`flex-1 py-3 text-sm font-semibold text-center transition-colors ${
                      contentBatchTab === "+2"
                        ? "text-primary border-b-2 border-primary bg-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    +2 Batch
                  </button>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredPDFs.filter((p) => p.batch === contentBatchTab)
                    .length > 0 ? (
                    filteredPDFs
                      .filter((p) => p.batch === contentBatchTab)
                      .map((pdf) => (
                        <div
                          key={pdf._id}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-all flex justify-between items-center group"
                        >
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {pdf.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                                {pdf.subject}
                              </span>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">
                                {pdf.batch}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditPDF(pdf)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deletePDF(pdf._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-12 text-center text-gray-400">
                      <p>No content found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="w-full lg:w-[400px] bg-gray-50 p-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                  <h3 className="tex-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    {editingPdf ? (
                      <Edit size={20} className="text-blue-500" />
                    ) : (
                      <Upload size={20} className="text-green-500" />
                    )}
                    {editingPdf ? "Edit PDF" : "Upload New PDF"}
                  </h3>

                  {message && (
                    <div
                      className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                        message.includes("Success")
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={uploadData.title}
                        onChange={(e) =>
                          setUploadData({
                            ...uploadData,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                        placeholder="e.g. Chapter 1: Dynamics"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Subject
                        </label>
                        <select
                          value={uploadData.subject}
                          onChange={(e) =>
                            setUploadData({
                              ...uploadData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        >
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Maths">Maths</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Batch
                        </label>
                        <select
                          value={uploadData.batch}
                          onChange={(e) =>
                            setUploadData({
                              ...uploadData,
                              batch: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        >
                          <option value="+1">+1 State</option>
                          <option value="+2">+2 State</option>
                        </select>
                      </div>
                    </div>

                    {!editingPdf && (
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                          Source File
                        </label>

                        {!uploadData.file ? (
                          <label className="block w-full cursor-pointer group">
                            <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 group-hover:border-primary group-hover:bg-blue-50 transition-all">
                              <Upload
                                className="text-gray-400 group-hover:text-primary transition-colors"
                                size={24}
                              />
                              <span className="text-sm text-gray-500 group-hover:text-gray-700">
                                Click to select PDF
                              </span>
                            </div>
                            <input
                              type="file"
                              onChange={handleFileChange}
                              className="hidden"
                              accept="application/pdf"
                            />
                          </label>
                        ) : (
                          <div className="w-full border border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="p-2 bg-white rounded-lg border border-blue-100 shdaow-sm text-red-500">
                                <FileText size={24} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {uploadData.file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(uploadData.file.size / 1024 / 1024).toFixed(
                                    2
                                  )}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={URL.createObjectURL(uploadData.file)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-xs font-medium"
                              >
                                Preview
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  setUploadData({ ...uploadData, file: null })
                                }
                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <XCircle size={20} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-4 flex gap-3">
                      <button
                        type="submit"
                        className={`flex-1 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all transform active:scale-95 ${
                          editingPdf
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-primary hover:bg-blue-700"
                        }`}
                      >
                        {editingPdf ? "Save Changes" : "Upload Content"}
                      </button>
                      {editingPdf && (
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
