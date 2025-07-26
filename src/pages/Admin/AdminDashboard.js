import React from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or session clear
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-xl text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-700 mb-6">Welcome, Admin!</p>
        <Link
          to="/admin/announcements"
          className="block p-4 bg-blue-100 hover:bg-blue-200 rounded"
        >
          📝 Post Announcement
        </Link>
        <Link
          to="/admin/view-complaints"
          className="block p-4 bg-red-100 hover:bg-red-200 rounded"
        >
          🛠️ View Hostel Complaints
        </Link>
        <Link
          to="/admin/tech-news"
          className="block p-4 bg-yellow-100 hover:bg-yellow-200 rounded"
        >
          📢 Post Tech News
        </Link>

        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
