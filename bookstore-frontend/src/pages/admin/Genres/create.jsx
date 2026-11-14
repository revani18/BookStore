import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/genres";

export default function CreateGenre() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createGenre(formData);

      alert("Genre berhasil ditambahkan.");
      navigate("/admin/genres");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Gagal menambahkan genre."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Tambah Genre
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tambahkan kategori buku baru ke BookStore.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Genre */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Nama Genre
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama genre"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi genre"
              rows="5"
              className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Tombol */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="!rounded-full !border !border-gray-300 !bg-white !px-6 !py-3 !text-sm !font-semibold !text-gray-600 !shadow-none transition hover:!bg-gray-50 active:scale-95"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="!inline-flex !items-center !gap-2 !rounded-full !border-0 !bg-blue-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-none transition-all hover:!bg-blue-700 hover:!shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save" />
                  Simpan Genre
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
