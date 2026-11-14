import { API } from "../_api";

// Register pengguna
export const register = async (formData) => {
  return await API.post("/register", formData);
};

// Login pengguna
export const login = async (formData) => {
  return await API.post("/login", formData);
};

// Logout pengguna
export const logout = async () => {
  return await API.post("/logout");
};

// Mengambil profil pengguna
export const getProfile = async () => {
  return await API.get("/profile");
};

// Memperbarui profil pengguna
export const updateProfile = async (formData) => {
  return await API.put("/profile", formData);
};
