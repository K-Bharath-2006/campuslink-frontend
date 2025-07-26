import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const timeSlots = ["5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const StudentTimetable = () => {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTimetable = async () => {
    try {
      const res = await axiosInstance.get("/timetable/");
      setSchedule(res.data.schedule);
    } catch (err) {
      console.log("No existing timetable, initializing blank.");
      const initialSchedule = {};
      days.forEach((day) => {
        initialSchedule[day] = {};
        timeSlots.forEach((slot) => {
          initialSchedule[day][slot] = "";
        });
      });
      setSchedule(initialSchedule);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (day, slot, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: value },
    }));
  };

  const saveTimetable = async () => {
    try {
      await axiosInstance.post("/timetable/save/", { schedule });
      alert("Timetable saved successfully!");
    } catch (err) {
      alert("Failed to save timetable.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading timetable...</div>;

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-md text-white flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">CampusLink</div>
        <div className="flex items-center gap-6">
          <Link
            to="/student/dashboard"
            className="text-lg hover:text-yellow-300 transition duration-200"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white font-medium transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Timetable Editor
        </h2>
        <div className="overflow-auto border rounded-lg">
          <table className="w-full table-auto text-sm text-center border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="p-2 border">Day / Time</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="p-2 border">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="even:bg-gray-100">
                  <td className="p-2 font-semibold capitalize border">{day}</td>
                  {timeSlots.map((slot) => (
                    <td key={slot} className="border">
                      <input
                        type="text"
                        value={schedule[day][slot] || ""}
                        onChange={(e) =>
                          handleChange(day, slot, e.target.value)
                        }
                        className="w-full p-1 border rounded text-sm focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={saveTimetable}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Save Timetable
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentTimetable;
