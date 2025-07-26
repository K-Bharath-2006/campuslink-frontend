import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TechNewsForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    application_link: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/technews/create/", form);
      toast.success("Tech news posted successfully!");
      setForm({ title: "", description: "", application_link: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.application_link?.[0] || "Failed to post tech news."
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CampusLink</h1>
        <div className="space-x-4">
          <a
            href="/admin/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </a>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Form */}
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
            Post Tech News
          </h2>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border border-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border border-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <input
            type="url"
            name="application_link"
            value={form.application_link}
            onChange={handleChange}
            placeholder="Application Link (https://...)"
            required
            className="w-full border border-gray-300 p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Post News
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default TechNewsForm;
