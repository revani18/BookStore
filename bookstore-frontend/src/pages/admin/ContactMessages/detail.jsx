import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContactMessage } from "../../../_services/contactMessages";

export default function ContactMessageDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await getContactMessage(id);
        setMessage(response.data.data);
      } catch (requestError) {
        console.error(requestError);
        setError(
          requestError.response?.data?.message ||
            "Gagal mengambil detail pesan.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center text-gray-500">
        <i className="fa-solid fa-spinner fa-spin mr-2" />
        Memuat detail pesan...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Detail Pesan</h2>
        <p className="mt-1 text-sm text-gray-500">
          Informasi lengkap pesan yang diterima.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">Nama Pengirim</dt>
              <dd className="mt-1 font-medium text-gray-900">{message.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="mt-1 break-all font-medium text-gray-900">
                {message.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Subjek</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {message.subject}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Tanggal Pesan</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {formatDate(message.created_at)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="text-sm font-medium text-gray-500">Isi Pesan</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-800">
              {message.message}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate("/admin/contact-messages")}
        className="mt-6! rounded-full! border! border-gray-300! bg-white! px-6! py-3! text-sm! font-semibold! text-gray-600! shadow-none! transition hover:bg-gray-50!"
      >
        Kembali ke Pesan Masuk
      </button>
    </div>
  );
}
