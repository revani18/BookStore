import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API, profileImageStorage } from "../../../_api";

export default function EditProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/profile");
        const user = response.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          city: user.city || "",
          province: user.province || "",
          postal_code: user.postal_code || "",
        });

        if (user.profile_photo) {
          const photoUrl = user.profile_photo.startsWith("http")
            ? user.profile_photo
            : `${profileImageStorage}/${user.profile_photo.split("/").pop()}`;

          setPreview(photoUrl);
        }

        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        setError(err.response?.data?.message || "Gagal mengambil data profil.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getProfile();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Format foto harus JPG, PNG, atau WEBP.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal 2 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Laravel menggunakan method spoofing untuk upload file.
      data.append("_method", "PUT");

      if (photo) {
        data.append("profile_photo", photo);
      }

      const response = await API.post("/profile", data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess("Profil berhasil diperbarui.");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        setError(Object.values(validationErrors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Gagal memperbarui profil.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Edit Akun</h3>
                <p className="text-muted">
                  Perbarui informasi akun BookStore kamu.
                </p>

                {preview ? (
                  <img
                    src={preview}
                    alt="Pratinjau foto profil"
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i className="fa-solid fa-circle-user fa-5x text-primary d-block mb-3" />
                )}

                <div className="mt-2">
                  <label
                    htmlFor="profile_photo"
                    className="form-label fw-semibold"
                  >
                    Foto Profil
                  </label>
                  <input
                    type="file"
                    id="profile_photo"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handlePhotoChange}
                  />
                  <small className="text-muted">
                    JPG, PNG, atau WEBP. Maksimal 2 MB.
                  </small>
                </div>
              </div>

              <hr />

              {error && <div className="alert alert-danger">{error}</div>}

              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold mb-3">Informasi Pengguna</h5>

                <div className="mb-3">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nomor Telepon</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <hr />

                <h5 className="fw-bold mb-3">Informasi Alamat</h5>

                <div className="mb-3">
                  <label className="form-label">Alamat</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Kota</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Provinsi</label>
                  <input
                    type="text"
                    name="province"
                    className="form-control"
                    value={formData.province}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Kode Pos</label>
                  <input
                    type="text"
                    name="postal_code"
                    className="form-control"
                    value={formData.postal_code}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-fill"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>

                  <Link
                    to="/profile"
                    className="btn btn-outline-secondary flex-fill"
                  >
                    Batal
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
