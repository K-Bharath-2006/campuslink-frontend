import { useState } from "react";
import axios from "axios";

export default function StudentRegister() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register/",
        form
      );
      alert(res.data.message);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} placeholder="Username" required className="w-full p-2 border rounded" />
        <input name="email" onChange={handleChange} placeholder="Email (@sece.ac.in)" required className="w-full p-2 border rounded" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}
