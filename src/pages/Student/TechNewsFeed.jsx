import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const TechNewsFeed = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/technews/")
      .then((res) => setNews(res.data))
      .catch((err) => console.error("Failed to fetch news", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md px-6 py-3 mb-6">
        <h1 className="text-xl font-semibold text-blue-700">CampusLink</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tech News List */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Tech News & Opportunities
        </h2>

        {news.length === 0 ? (
          <p className="text-center text-gray-500">No tech news found.</p>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={item.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md inline-block"
                >
                  Apply Here
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechNewsFeed;
