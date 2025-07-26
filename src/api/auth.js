import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // adjust if your base is different

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  const res = await axiosInstance.post("/auth/login/", credentials);
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTimetable = async () => {
  const res = await axios.get(`${BASE_URL}/timetable/`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

