import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";
import { getGenres } from "../../../_services/genres";

export default function CreateBook() {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    author_id: "",
    genre_id: "",
    isbn: "",
    description: "",
    price: "",
    stock: "",
    cover_image: null,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [authorResponse, genreResponse] = await Promise.all([
          getAuthors(),
          getGenres(),
        ]);

        setAuthors(authorResponse.data);
        setGenres(genreResponse.data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data penulis dan genre.");
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("author_id", form.author_id);
      formData.append("genre_id", form.genre_id);
      formData.append("isbn", form.isbn);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);

      if (form.cover_image) {
        formData.append("cover_image", form.cover_image);
      }

      await createBook(formData);

      alert("Buku berhasil ditambahkan.");
      navigate("/admin/books");
    } catch (err) {
      console.error(err);

      const errors = err.response?.data?.errors;

      setError(
        errors
          ? Object.values(errors).flat().join(" ")
          : err.response?.data?.message || "Gagal menambahkan buku."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Tambah Buku
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Lengkapi informasi buku yang ingin ditambahkan ke BookStore.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            <i className="fa-solid fa-circle-exclamation mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informasi utama */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-gray-900">
              Informasi Buku
            </h3>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Judul Buku</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan judul buku"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Penulis</label>
                  <select
                    name="author_id"
                    value={form.author_id}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Pilih penulis</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Genre</label>
                  <select
                    name="genre_id"
                    value={form.genre_id}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Pilih genre</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  placeholder="Masukkan ISBN (opsional)"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Deskripsi</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tuliskan deskripsi atau ringkasan buku..."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </div>

          {/* Harga dan stok */}
          <div className="pt-2">
            <h3 className="mb-5 text-base font-semibold text-gray-900">
              Harga dan Persediaan
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Harga (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  required
                  placeholder="Contoh: 95000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Stok Buku</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  placeholder="Masukkan jumlah stok"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Sampul */}
          <div className="pt-2">
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              Sampul Buku
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Pilih gambar sampul untuk buku ini.
            </p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <i className="fa-solid fa-cloud-arrow-up text-xl" />
              </span>

              <span className="text-sm font-semibold text-gray-700">
                {form.cover_image
                  ? form.cover_image.name
                  : "Klik untuk memilih gambar sampul"}
              </span>

              <span className="mt-2 text-xs text-gray-400">
                JPG, JPEG, PNG, atau WEBP · Maksimal 2 MB
              </span>

              <input
                type="file"
                name="cover_image"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Tombol */}
          <div className="flex flex-wrap items-center justify-end gap-5 pt-5">
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="!rounded-full !border !border-gray-300 !bg-white !px-6 !py-3 !text-sm !font-semibold !text-gray-600 !shadow-none transition hover:!bg-gray-50 active:scale-95"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="!inline-flex !items-center !gap-2 !rounded-full !border-0 !bg-blue-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-none transition-all hover:!bg-blue-700 hover:!shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save" />
                  Simpan Buku
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
