import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../_services/users";
import { profileImageStorage } from "../../../_api";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getUser(id);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Gagal mengambil detail pelanggan."
      );
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };

    loadUser();
  }, [fetchUser]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center text-gray-500">
        <i className="fa-solid fa-spinner fa-spin mr-2" />
        Memuat detail pelanggan...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Detail Pelanggan
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Informasi lengkap pelanggan yang terdaftar di BookStore.
        </p>
      </div>

      {/* Detail Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {/* Profile */}
        <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-6 sm:flex-row">
          {user.profile_photo ? (
            <img
              src={`${profileImageStorage}/${user.profile_photo.split("/").pop()}`}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-400">
              <i className="fa-solid fa-user" />
            </div>
          )}

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-6">
          <h3 className="mb-5 text-base font-semibold text-gray-900">
            Informasi Pelanggan
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">ID Pelanggan</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 break-all font-medium text-gray-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.address || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Kota/Kabupaten</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.city || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Provinsi</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.province || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Kode Pos</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.postal_code || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tanggal Bergabung</p>
              <p className="mt-1 font-medium text-gray-900">
                {formatDate(user.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="rounded-full! border! border-gray-300! bg-white! px-6! py-3! text-sm! font-semibold! text-gray-600! shadow-none! transition hover:bg-gray-50! active:scale-95"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
