import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Adjust if needed

// Get all announcements (for students & admin)
export const getAnnouncements = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/announcements/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create a new announcement (admin only)
export const createAnnouncement = async (announcementData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/announcements/create/`,
      announcementData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
