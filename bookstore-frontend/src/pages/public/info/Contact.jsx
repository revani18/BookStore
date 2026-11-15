import { useState } from "react";
import { createContactMessage } from "../../../_services/contactMessages";
import { useModal } from "../../../context/useModal";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { showModal } = useModal();
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createContactMessage(formData);
      setFormData(emptyForm);
      showModal(
        "Pesan berhasil dikirim. Terima kasih telah menghubungi BookStore!",
        "success",
        { title: "Pesan berhasil dikirim", icon: "fa-envelope-circle-check" },
      );
    } catch (error) {
      console.error(error);
      const validationErrors = error.response?.data?.errors;
      const firstValidationError = validationErrors
        ? Object.values(validationErrors).flat()[0]
        : null;

      showModal(
        firstValidationError ||
          error.response?.data?.message ||
          "Pesan gagal dikirim. Silakan coba kembali.",
        "error",
        {
          title: "Pesan gagal dikirim",
          icon: "fa-circle-xmark",
        },
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      {/* Judul Halaman */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Kontak BookStore</h2>
        <p className="text-muted">
          Hubungi kami jika kamu memiliki pertanyaan atau membutuhkan bantuan.
        </p>
      </div>

      <div className="row g-4">
        {/* Informasi Kontak */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Informasi Kontak</h5>

              <div className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-book text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">BookStore</h6>
                  <p className="text-muted mb-0 small">
                    Toko buku online yang menyediakan berbagai pilihan buku
                    untuk menambah wawasan dan menemani waktu membaca.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-envelope text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0 small">booksales@bookstore.id</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="fa-solid fa-phone text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Telepon</h6>
                  <p className="text-muted mb-0 small">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <i className="fa-solid fa-location-dot text-primary fs-5 me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold mb-1">Alamat</h6>
                  <p className="text-muted mb-0 small">
                    Jl. Literasi No. 10, Jakarta Selatan, Indonesia. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Pesan */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Kirim Pesan</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Masukkan nama kamu"
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
                    placeholder="Masukkan email kamu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subjek</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Masukkan subjek pesan"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pesan</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Tuliskan pesan kamu"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  <i
                    className={`fa-solid ${submitting ? "fa-spinner fa-spin" : "fa-paper-plane"} me-2`}
                  />
                  {submitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
