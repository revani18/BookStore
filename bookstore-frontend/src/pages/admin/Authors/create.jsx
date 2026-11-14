import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../_services/authors";

export default function CreateAuthor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    photo: null,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      formData.append("name", form.name);
      formData.append("bio", form.bio);

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      await createAuthor(formData);

      alert("Penulis berhasil ditambahkan.");
      navigate("/admin/authors");
    } catch (err) {
      console.error(err);

      const errors = err.response?.data?.errors;

      setError(
        errors
          ? Object.values(errors).flat().join(" ")
          : err.response?.data?.message ||
              "Gagal menambahkan penulis."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="max-w-4xl">
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Tambah Penulis
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tambahkan informasi penulis baru ke BookStore.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            <i className="fa-solid fa-circle-exclamation mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="mb-5 text-base font-semibold text-gray-900">
              Informasi Penulis
            </h3>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Nama Penulis
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama penulis"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Biografi
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tuliskan biografi atau informasi tentang penulis..."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              Foto Penulis
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Pilih foto untuk profil penulis.
            </p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <i className="fa-solid fa-cloud-arrow-up text-xl" />
              </span>

              <span className="text-sm font-semibold text-gray-700">
                {form.photo
                  ? form.photo.name
                  : "Klik untuk memilih foto penulis"}
              </span>

              <span className="mt-2 text-xs text-gray-400">
                JPG, JPEG, PNG, atau WEBP
              </span>

              <input
                type="file"
                name="photo"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
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
                  Simpan Penulis
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
