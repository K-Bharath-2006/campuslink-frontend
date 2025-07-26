import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Navbar() {

    const location = useLocation();
    const hideNavbarOnPaths = [
      "/admin/dashboard",
      "/student/dashboard",
      "/student/announcements",
      "/admin/announcements",
      "/student/timetable",
      "/admin/tech-news",
      "/student/tech-news"
    ];

    if (hideNavbarOnPaths.includes(location.pathname)) return null;

    return (
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CampusLink</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/student/register"
            className="text-gray-600 hover:text-blue-600"
          >
            Student Register
          </Link>
          <Link
            to="/student/login"
            className="text-gray-600 hover:text-blue-600"
          >
            Student Login
          </Link>
          <Link to="/admin/login" className="text-gray-600 hover:text-blue-600">
            Admin Login
          </Link>
        </div>
      </nav>
    );
}
