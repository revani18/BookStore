import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useModal } from "../context/useModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { confirmModal } = useModal();
  const { totalItems } = useCart();

  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  const handleLogout = async () => {
    const confirmed = await confirmModal({
      title: "Apakah Anda yakin ingin keluar?",
      icon: "fa-right-from-bracket",
      tone: "info",
      confirmText: "Ya, Keluar",
      cancelText: "Batal",
      confirmButtonClass: "btn-primary",
    });

    if (!confirmed) return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <i
              className="fa-solid fa-book fa-2xl"
              style={{ color: "#309ff7ff" }}
            />
            <span className="ms-2 fs-4">BookStore</span>
          </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 custom-nav">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link custom-nav-link ${isActive ? "active" : ""}`
              }
            >
              Beranda
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `nav-link custom-nav-link ${isActive ? "active" : ""}`
              }
            >
              Buku
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link custom-nav-link ${isActive ? "active" : ""}`
              }
            >
              Tentang
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link custom-nav-link ${isActive ? "active" : ""}`
              }
            >
              Kontak
            </NavLink>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {isLoggedIn ? (
            <>

              <Link to="/cart" className="btn btn-outline-primary btn-sm me-1">
                <i className="fa-solid fa-cart-shopping me-1" />
                {totalItems}
              </Link>

              <Link to="/orders" className="btn btn-outline-primary btn-sm me-1">
                <i className="fa-solid fa-receipt me-1" />
                Riwayat
              </Link>

              <Link to="/profile" className="btn btn-outline-primary btn-sm me-1">
                <i className="fa-solid fa-user me-1" />
                Profil
              </Link>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket me-1" />
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Masuk
              </Link>

              <Link to="/register" className="btn btn-primary">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
