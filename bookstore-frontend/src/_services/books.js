import { API } from "../_api";

// Mengambil semua buku
export const getBooks = async (params) => {
  return await API.get("/books", { params });
};

// Mengambil detail buku
export const getBook = async (id) => {
  return await API.get(`/books/${id}`);
};

// Menambahkan buku
export const createBook = async (formData) => {
  return await API.post("/books", formData);
};

// Memperbarui buku
export const updateBook = async (id, formData) => {
  formData.set("_method", "PUT");

  return await API.post(`/books/${id}`, formData);
};


// Menghapus buku
export const deleteBook = async (id) => {
  return await API.delete(`/books/${id}`);
};
