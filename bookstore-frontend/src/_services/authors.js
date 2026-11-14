import { API } from "../_api";

// Mengambil semua penulis
export const getAuthors = async () => {
  return await API.get("/authors");
};

// Mengambil detail penulis
export const getAuthor = async (id) => {
  return await API.get(`/authors/${id}`);
};

// Menambahkan penulis
export const createAuthor = async (formData) => {
  return await API.post("/authors", formData);
};

// Memperbarui data penulis
export const updateAuthor = async (id, formData) => {
  formData.set("_method", "PUT");

  return await API.post(`/authors/${id}`, formData);
};


// Menghapus penulis
export const deleteAuthor = async (id) => {
  return await API.delete(`/authors/${id}`);
};
