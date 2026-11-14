import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGenres,
  deleteGenre,
} from "../../../_services/genres";

let cachedGenres = null;

export default function AdminGenres() {
  const navigate = useNavigate();

  const [genres, setGenres] = useState(cachedGenres || []);
  const [loading, setLoading] = useState(!cachedGenres);
  const [search, setSearch] = useState("");

  const fetchGenres = useCallback(async () => {
    try {
      if (!cachedGenres) {
        setLoading(true);
      }

      const response = await getGenres();

      cachedGenres = response.data;
      setGenres(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data genre.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadGenres = async () => {
      await fetchGenres();
    };

    loadGenres();
  }, [fetchGenres]);

  const handleDelete = async (genre) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus genre "${genre.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteGenre(genre.id);

      alert("Genre berhasil dihapus.");

      cachedGenres = null;
      await fetchGenres();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Gagal menghapus genre. Pastikan genre tidak sedang digunakan oleh data buku."
      );
    }
  };

  const filteredGenres = genres.filter((genre) => {
    const keyword = search.toLowerCase();

    return (
      genre.name?.toLowerCase().includes(keyword) ||
      genre.description?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Data Genre
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data kategori buku yang tersedia di BookStore.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/genres/create")}
          className="!inline-flex !items-center !gap-2 !rounded-full !border-0 !bg-blue-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-none transition-all hover:!bg-blue-700 hover:!shadow-md active:scale-95"
        >
          <i className="fa-solid fa-plus" />
          Tambah Genre
        </button>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau deskripsi genre..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total{" "}
          <span className="font-semibold text-gray-800">
            {filteredGenres.length}
          </span>{" "}
          genre
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">No</th>
              <th className="px-5 py-4">Nama Genre</th>
              <th className="px-5 py-4">Deskripsi</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Memuat data genre...
                </td>
              </tr>
            ) : filteredGenres.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-tags mb-2 block text-2xl text-gray-300" />
                  Data genre tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredGenres.map((genre, index) => (
                <tr
                  key={genre.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  {/* Nomor */}
                  <td className="px-5 py-4 text-gray-500">
                    {index + 1}
                  </td>

                  {/* Nama Genre */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {genre.name}
                    </p>
                  </td>

                  {/* Deskripsi */}
                  <td className="px-5 py-4">
                    <p className="max-w-md text-sm text-gray-600 line-clamp-2">
                      {genre.description || "-"}
                    </p>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/genres/${genre.id}/edit`)
                        }
                        title="Edit genre"
                        className="!border-0 !bg-transparent !p-0 !text-blue-600 !shadow-none transition hover:!text-blue-800"
                      >
                        <i className="fa-solid fa-pen-to-square text-lg" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(genre)}
                        title="Hapus genre"
                        className="!border-0 !bg-transparent !p-0 !text-red-500 !shadow-none transition hover:!text-red-700"
                      >
                        <i className="fa-solid fa-trash text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
