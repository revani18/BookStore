import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../../../_services/authors";
import { storageUrl } from "../../../_api";

let cachedAuthors = null;

export default function AdminAuthors() {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState(cachedAuthors || []);
  const [loading, setLoading] = useState(!cachedAuthors);
  const [search, setSearch] = useState("");

  const fetchAuthors = useCallback(async () => {
    try {
      if (!cachedAuthors) {
        setLoading(true);
      }

      const response = await getAuthors();

      cachedAuthors = response.data;
      setAuthors(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data penulis.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadAuthors = async () => {
      await fetchAuthors();
    };

    loadAuthors();
  }, [fetchAuthors]);

  const handleDelete = async (author) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus penulis "${author.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteAuthor(author.id);

      alert("Penulis berhasil dihapus.");

      cachedAuthors = null;
      await fetchAuthors();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Gagal menghapus penulis. Pastikan penulis tidak sedang digunakan oleh data buku."
      );
    }
  };

  const filteredAuthors = authors.filter((author) => {
    const keyword = search.toLowerCase();

    return (
      author.name?.toLowerCase().includes(keyword) ||
      author.bio?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Data Penulis
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data penulis buku yang tersedia di BookStore.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/authors/create")}
          className="inline-flex! items-center! gap-2! rounded-full! border-0! bg-blue-600! px-6! py-3! text-sm! font-semibold! text-white! shadow-none! transition-all hover:bg-blue-700! hover:shadow-md! active:scale-95"
        >
          <i className="fa-solid fa-plus" />
          Tambah Penulis
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
            placeholder="Cari nama atau biografi penulis..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total{" "}
          <span className="font-semibold text-gray-800">
            {filteredAuthors.length}
          </span>{" "}
          penulis
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">Foto</th>
              <th className="px-5 py-4">Nama Penulis</th>
              <th className="px-5 py-4">Biografi</th>
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
                  Memuat data penulis...
                </td>
              </tr>
            ) : filteredAuthors.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-users mb-2 block text-2xl text-gray-300" />
                  Data penulis tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredAuthors.map((author) => (
                <tr
                  key={author.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  {/* Foto */}
                  <td className="px-5 py-3">
                    {author.photo ? (
                      <img
                        src={`${storageUrl}/${author.photo}`}
                        alt={author.name}
                        className="h-16 w-12 rounded-lg object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <i className="fa-solid fa-user" />
                      </div>
                    )}
                  </td>

                  {/* Nama */}
                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-900">
                      {author.name}
                    </p>
                  </td>

                  {/* Biografi */}
                  <td className="px-5 py-3">
                    <p className="max-w-md text-sm text-gray-600 line-clamp-2">
                      {author.bio || "-"}
                    </p>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/authors/${author.id}/edit`)
                        }
                        title="Edit penulis"
                        className="border-0! bg-transparent! p-0! text-blue-600! shadow-none! transition hover:text-blue-800!"
                      >
                        <i className="fa-solid fa-pen-to-square text-lg" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(author)}
                        title="Hapus penulis"
                        className="border-0! bg-transparent! p-0! text-red-500! shadow-none! transition hover:text-red-700!"
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
