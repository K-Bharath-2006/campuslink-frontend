import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("❌ You must be logged in as admin to post.");
      return;
    }

    try {
      await axiosInstance.post("/api/announcements/create/", {
        title: title,
        message: message,
      });

      toast.success("✅ Announcement posted successfully!");
      setTitle("");
      setMessage("");
      navigate("/admin/dashboard");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("❌ You are not authorized (admin only).");
      } else {
        toast.error("❌ Failed to post announcement.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-blue-600 font-medium hover:underline"
        >
          🏠 Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:underline"
        >
          🚪 Logout
        </button>
      </div>

      {/* Form section */}
      <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-10">
        <h2 className="text-xl font-bold mb-4">Create Announcement</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
