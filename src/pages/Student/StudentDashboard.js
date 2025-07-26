import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/student/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">👨‍🎓 Student Dashboard</h1>
        <div className="space-y-4">
          <Link
            to="/student/announcements"
            className="block p-4 bg-blue-100 hover:bg-blue-200 rounded"
          >
            📢 View Campus Announcements
          </Link>
          <Link
            to="/student/timetable"
            className="block p-4 bg-green-100 hover:bg-green-200 rounded"
          >
            📅 Timetable Scheduler
          </Link>
          <Link
            to="/student/lost-and-found"
            className="block p-4 bg-yellow-100 hover:bg-yellow-200 rounded"
          >
            🧳 Lost & Found
          </Link>
          <Link
            to="/student/hostel-complaints"
            className="block p-4 bg-red-100 hover:bg-red-200 rounded"
          >
            🛠️ Hostel Complaints
          </Link>
          <Link
            to="/student/tech-news"
            className="block p-4 bg-yellow-100 hover:bg-yellow-200 rounded"
          >
            📰 View Tech News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
