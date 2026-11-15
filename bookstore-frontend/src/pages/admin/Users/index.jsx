import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../_services/users";
import { profileImageStorage } from "../../../_api";

let cachedUsers = null;

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState(cachedUsers || []);
  const [loading, setLoading] = useState(!cachedUsers);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      if (!cachedUsers) {
        setLoading(true);
      }

      const response = await getUsers();

      cachedUsers = response.data;
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data pelanggan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword) ||
      user.phone?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Data Pelanggan
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Informasi pelanggan yang terdaftar di BookStore.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau telepon pelanggan..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total{" "}
          <span className="font-semibold text-gray-800">
            {filteredUsers.length}
          </span>{" "}
          pelanggan
        </p>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-5 py-4">Foto</th>
              <th className="px-5 py-4">Nama Pelanggan</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Telepon</th>
              <th className="px-5 py-4">Kota</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-spinner fa-spin mr-2" />
                  Memuat data pelanggan...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <i className="fa-solid fa-users mb-2 block text-2xl text-gray-300" />
                  Data pelanggan tidak ditemukan.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 transition-colors hover:bg-blue-50/40"
                >
                  {/* Foto */}
                  <td className="px-5 py-3">
                    {user.profile_photo ? (
                      <img
                        src={`${profileImageStorage}/${user.profile_photo.split("/").pop()}`}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <i className="fa-solid fa-user" />
                      </div>
                    )}
                  </td>

                  {/* Nama */}
                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-900">
                      {user.name}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3">
                    {user.email}
                  </td>

                  {/* Telepon */}
                  <td className="px-5 py-3">
                    {user.phone || "-"}
                  </td>

                  {/* Kota */}
                  <td className="px-5 py-3">
                    {user.city || "-"}
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/users/${user.id}`)
                        }
                        title="Lihat detail pelanggan"
                        className="border-0! bg-transparent! p-0! text-blue-600! shadow-none! transition hover:text-blue-800!"
                      >
                        <i className="fa-solid fa-eye text-lg" />
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
