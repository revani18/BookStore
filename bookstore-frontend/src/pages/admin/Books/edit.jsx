import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";
import { getGenres } from "../../../_services/genres";
import { storageUrl } from "../../../_api";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const [currentCover, setCurrentCover] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [bookResponse, authorResponse, genreResponse] =
          await Promise.all([
            getBook(id),
            getAuthors(),
            getGenres(),
          ]);

        const book = bookResponse.data;

        setAuthors(authorResponse.data);
        setGenres(genreResponse.data);

        setForm({
          title: book.title || "",
          author_id: book.author_id || "",
          genre_id: book.genre_id || "",
          isbn: book.isbn || "",
          description: book.description || "",
          price: book.price ?? "",
          stock: book.stock ?? "",
          cover_image: null,
        });

        setCurrentCover(book.cover_image || "");
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data buku.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

      await updateBook(id, formData);

      alert("Buku berhasil diperbarui.");
      navigate("/admin/books");
    } catch (err) {
      console.error(err);

      const errors = err.response?.data?.errors;

      setError(
        errors
          ? Object.values(errors).flat().join(" ")
          : err.response?.data?.message || "Gagal memperbarui buku."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <i className="fa-solid fa-spinner fa-spin mb-3 text-2xl text-blue-600" />
        <p className="text-sm">Memuat data buku...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Edit Buku
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Perbarui informasi buku yang tersedia di BookStore.
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
              Kamu bisa mempertahankan atau mengganti sampul buku.
            </p>

            {currentCover && (
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <img
                  src={`${storageUrl}/${currentCover}`}
                  alt="Sampul buku saat ini"
                  className="h-28 w-20 rounded-lg object-cover shadow-sm"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Sampul saat ini
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Sampul ini akan tetap digunakan jika kamu tidak memilih gambar baru.
                  </p>
                </div>
              </div>
            )}

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <i className="fa-solid fa-cloud-arrow-up text-xl" />
              </span>

              <span className="text-sm font-semibold text-gray-700">
                {form.cover_image
                  ? form.cover_image.name
                  : "Klik untuk memilih sampul baru"}
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
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
