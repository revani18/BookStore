import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../_api";
import { useModal } from "../../context/useModal";

export default function Login() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/login", formData);

      const { token, user } = response.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      API.defaults.headers.common.Authorization = `Bearer ${token}`;

      showModal("Login berhasil!", "success", {
        title: "Login berhasil",
        icon: "fa-user-check",
      });

      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      showModal(
        err.response?.data?.message ||
          "Email atau password tidak sesuai.",
        "error",
        { title: "Login gagal", icon: "fa-circle-xmark" },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i
                  className="fa-solid fa-book fa-3x mb-3"
                  style={{ color: "#309ff7ff" }}
                />
                <h3 className="fw-bold">Masuk ke BookStore</h3>
                <p className="text-muted">
                  Silakan masuk untuk melanjutkan belanja buku.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Sedang masuk..." : "Masuk"}
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">
                  Belum punya akun?{" "}
                </span>
                <Link
                  to="/register"
                  className="text-decoration-none"
                >
                  Daftar sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}