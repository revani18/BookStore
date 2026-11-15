import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContactMessages } from "../../../_services/contactMessages";

export default function AdminContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      setError("");
      const response = await getContactMessages();
      setMessages(response.data.data);
    } catch (requestError) {
      console.error(requestError);
      setError(
        requestError.response?.data?.message ||
          "Gagal mengambil daftar pesan masuk.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };

    loadMessages();
  }, [fetchMessages]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Pesan Masuk</h2>
        <p className="mt-1 text-sm text-gray-500">
          Pesan yang dikirim melalui halaman Kontak BookStore.
        </p>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">Nama Pengirim</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Subjek</th>
              <th className="px-5 py-4">Tanggal</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Memuat pesan...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-gray-500">
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr
                  key={message.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {message.name}
                  </td>
                  <td className="px-5 py-3">{message.email}</td>
                  <td className="px-5 py-3">{message.subject}</td>
                  <td className="px-5 py-3">{formatDate(message.created_at)}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/contact-messages/${message.id}`)
                      }
                      className="border-0! bg-transparent! p-0! text-blue-600! shadow-none! transition hover:text-blue-800!"
                    >
                      Baca pesan
                    </button>
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
