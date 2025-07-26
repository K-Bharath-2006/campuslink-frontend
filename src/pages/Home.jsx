import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h2 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to CampusLink 🎓
      </h2>
      <p className="text-lg text-gray-600">
        Your one-stop hub for campus utilities like announcements, lost & found,
        timetables, complaints, and more!
      </p>
    </div>
  );
}

