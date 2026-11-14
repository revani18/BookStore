import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../../../_services/books";
import { storageUrl } from "../../../_api";

let cachedBooks = null;

export default function AdminBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState(cachedBooks || []);
  const [loading, setLoading] = useState(!cachedBooks);
  const [search, setSearch] = useState("");

  const fetchBooks = useCallback(async () => {
    try {
      // Loading hanya muncul jika belum ada data sebelumnya
      if (!cachedBooks) {
        setLoading(true);
      }

      const response = await getBooks();

      cachedBooks = response.data;
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data buku.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      await fetchBooks();
    };

    loadBooks();
  }, [fetchBooks]);

  const handleDelete = async (book) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus buku "${book.title}"?`,
    );

    if (!confirmed) return;

    try {
      await deleteBook(book.id);
      alert("Buku berhasil dihapus.");
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus buku.");
    }
  };

  const formatRupiah = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const filteredBooks = books.filter((book) => {
    const keyword = search.toLowerCase();

    return (
      book.title?.toLowerCase().includes(keyword) ||
      book.isbn?.toLowerCase().includes(keyword) ||
      book.author?.name?.toLowerCase().includes(keyword) ||
      book.genre?.name?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Data Buku</h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data buku yang tersedia di BookStore.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/books/create")}
          className="!inline-flex !items-center !gap-2 !rounded-full !border-0 !bg-blue-600 !px-6 !py-3 !text-sm !font-semibold !text-white !shadow-none transition-all hover:!bg-blue-700 hover:!shadow-md active:scale-95"
        >
          <i className="fa-solid fa-plus" />
          Tambah Buku
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
            placeholder="Cari judul, ISBN, penulis..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total{" "}
          <span className="font-semibold text-gray-800">
            {filteredBooks.length}
          </span>{" "}
          buku
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">Sampul</th>
              <th className="px-5 py-4">Judul Buku</th>
              <th className="px-5 py-4">Penulis</th>
              <th className="px-5 py-4">Genre</th>
              <th className="px-5 py-4">Harga</th>
              <th className="px-5 py-4">Stok</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Memuat data buku...
                </td>
              </tr>
            ) : filteredBooks.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-book-open mb-2 block text-2xl text-gray-300" />
                  Data buku tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-5 py-3">
                    {book.cover_image ? (
                      <img
                        src={`${storageUrl}/${book.cover_image}`}
                        alt={book.title}
                        className="h-16 w-12 rounded-lg object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <i className="fa-solid fa-book" />
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-900">{book.title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      ISBN: {book.isbn || "-"}
                    </p>
                  </td>

                  <td className="px-5 py-3">{book.author?.name || "-"}</td>

                  <td className="px-5 py-3">{book.genre?.name || "-"}</td>

                  <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-800">
                    {formatRupiah(book.price)}
                  </td>

                  <td className="px-5 py-3">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {book.stock}
                    </span>
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/books/${book.id}/edit`)}
                        title="Edit buku"
                        className="!border-0 !bg-transparent !p-0 !text-blue-600 !shadow-none transition hover:!text-blue-800"
                      >
                        <i className="fa-solid fa-pen-to-square text-lg" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(book)}
                        title="Hapus buku"
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
