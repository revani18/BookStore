import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { API, profileImageStorage } from "../../../_api";
import { useModal } from "../../../context/useModal";

export default function Profile() {
  const { showModal } = useModal();
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/profile");
        const userData = response.data.user;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        const message =
          err.response?.data?.message || "Gagal mengambil informasi profil.";
        setError(message);
        showModal(message, "error", {
          title: "Gagal memuat profil",
          onOk: () => setError(""),
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getProfile();
    }
  }, [showModal, token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Memuat profil...</p>
      </div>
    );
  }

  if (error) {
    return null;
  }

  const profilePhoto = user?.profile_photo
    ? user.profile_photo.startsWith("http")
      ? user.profile_photo
      : `${profileImageStorage}/${user.profile_photo.split("/").pop()}`
    : null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Foto Profil"
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i
                    className="fa-solid fa-circle-user fa-5x mb-3"
                    style={{ color: "#309ff7" }}
                  />
                )}

                <h3 className="fw-bold">{user?.name || "Pengguna"}</h3>
              </div>

              <hr />

              <h5 className="fw-bold mb-3">Informasi Pengguna</h5>

              <div className="mb-3">
                <label className="form-label text-muted">Nama</label>
                <p className="fw-semibold">{user?.name || "-"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Email</label>
                <p className="fw-semibold">{user?.email || "-"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Nomor Telepon</label>
                <p className="fw-semibold">{user?.phone || "-"}</p>
              </div>

              <hr />

              <h5 className="fw-bold mb-3">Informasi Alamat</h5>

              <div className="mb-3">
                <label className="form-label text-muted">Alamat</label>
                <p className="fw-semibold">{user?.address || "-"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Kota</label>
                <p className="fw-semibold">{user?.city || "-"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Provinsi</label>
                <p className="fw-semibold">{user?.province || "-"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Kode Pos</label>
                <p className="fw-semibold">{user?.postal_code || "-"}</p>
              </div>

              <div className="d-flex gap-2 mt-4">
                <Link to="/profile/edit" className="btn btn-primary flex-fill">
                  <i className="fa-solid fa-pen-to-square me-2" />
                  Edit Akun
                </Link>

                <Link to="/" className="btn btn-outline-secondary flex-fill">
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
