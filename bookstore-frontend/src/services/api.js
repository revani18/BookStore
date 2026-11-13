
import axios from "axios";

const url =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL: `${url}/api`,
});

// Mengambil token login dari localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const bookImageStorage = `${url}/storage/books`;

// URL untuk foto profil
export const profileImageStorage = `${url}/storage`;