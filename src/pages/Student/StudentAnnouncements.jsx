import React, { useEffect, useState, useCallback } from "react";
import { getAnnouncements } from "../../api/announcement";
import { Link, useNavigate } from "react-router-dom";


const StudentAnnouncements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      console.warn("⛔ No access token found in localStorage.");
      setError("You must be logged in to view announcements.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔐 Fetching announcements with token:", token);
      const data = await getAnnouncements(token);
      setAnnouncements(data);
    } catch (err) {
      console.error("❌ Axios Error:", err);
      setError("Failed to fetch announcements. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
  };
   const goToDashboard = () => {
     navigate("/student/dashboard");
   };

     return (
       <div className="p-4">
         <div className="flex justify-start gap-4 mb-6">
           <button
             onClick={handleLogout}
             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
           >
             Logout
           </button>
           <button
             onClick={goToDashboard}
             className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
           >
             Dashboard
           </button>
         </div>

         <div className="p-6 max-w-3xl mx-auto">
           <h2 className="text-2xl font-bold mb-4">📢 Campus Announcements</h2>

           {loading && <p className="text-gray-500">Loading...</p>}
           {error && <p className="text-red-500">{error}</p>}

           {!loading && announcements.length === 0 && !error && (
             <p className="text-gray-600">No announcements found.</p>
           )}

           {!loading &&
             announcements.map((ann, idx) => (
               <div
                 key={idx}
                 className="bg-white shadow-md p-4 mb-4 rounded-lg"
               >
                 <h3 className="font-semibold text-lg text-blue-800">
                   {ann.title}
                 </h3>
                 <p className="text-gray-700 mt-1">{ann.message}</p>
                 <p className="text-xs text-gray-400 mt-2 text-right">
                   Posted on {new Date(ann.created_at).toLocaleString()}
                 </p>
               </div>
             ))}
         </div>
       </div>
     );
};

export default StudentAnnouncements;
