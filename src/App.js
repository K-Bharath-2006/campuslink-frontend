import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentAnnouncements from "./pages/Student/StudentAnnouncements";
import AdminAddAnnouncement from "./pages/Admin/AdminAddAnnouncement";
import StudentTimetable from "./pages/Student/StudentTimetable";
import TechNewsForm from "./pages/Admin/TechNewsForm";  
import TechNewsFeed from "./pages/Student/TechNewsFeed";  
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/student/announcements"
          element={<StudentAnnouncements />}
        />
        <Route path="/admin/announcements" element={<AdminAddAnnouncement />} />
        <Route path="/student/timetable" element={<StudentTimetable />} />
        <Route path="/admin/tech-news" element={<TechNewsForm />} />
        <Route path="/student/tech-news" element={<TechNewsFeed />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
