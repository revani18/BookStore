import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../_api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak sesuai.");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/register", formData);
      const { token, user } = response.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Registrasi berhasil!");
      navigate("/");
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        setError(Object.values(validationErrors).flat().join(" "));
      } else {
        setError(
          err.response?.data?.message ||
            "Registrasi gagal. Silakan coba kembali."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i className="fa-solid fa-user-plus fa-3x text-primary mb-3" />
                <h3 className="fw-bold">Daftar Akun</h3>
                <p className="text-muted">
                  Buat akun BookStore untuk mulai menjelajahi koleksi buku.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Minimal 8 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    placeholder="Ulangi password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Daftar"}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Sudah memiliki akun?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}