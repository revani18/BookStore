import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./cart-context";
import { useModal } from "./useModal";
import { API } from "../_api";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { showModal, confirmModal } = useModal();

  // Mengambil keranjang dari database Laravel
  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCart([]);
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);

        if (user?.role === "admin") {
          setCart([]);
          return;
        }
      } catch (error) {
        console.error("Gagal membaca data pengguna:", error);
      }
    }

    try {
      const response = await API.get("/cart");

      const cartItems = response.data.map((cartItem) => {
        const book = cartItem.book || {};

        return {
          ...book,
          _id: cartItem.id,
          cart_item_id: cartItem.id,
          book_id: cartItem.book_id ?? book.id,
          quantity: Number(cartItem.quantity),
        };
      });

      setCart(cartItems);
    } catch (error) {
      console.error(
        "Gagal mengambil keranjang:",
        error.response?.data || error.message
      );
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, [refreshCart]);

  // Menambahkan buku ke keranjang
  const addToCart = async (book) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      showModal("Silakan masuk terlebih dahulu.", "warning", {
        title: "Silakan masuk",
      });
      return false;
    }

    const bookId = book.id ?? book._id;

    if (!bookId) {
      showModal("Data buku tidak valid.", "error", {
        title: "Buku tidak dapat ditambahkan",
      });
      return false;
    }

    const existingBook = cart.find(
      (item) => item.book_id === bookId
    );

    const currentQuantity = existingBook
      ? existingBook.quantity
      : 0;

    if (currentQuantity >= Number(book.stock)) {
      showModal("Stok buku tidak mencukupi.", "warning", {
        title: "Stok tidak mencukupi",
      });
      return false;
    }

    try {
      await API.post("/cart", {
        book_id: bookId,
        quantity: 1,
      });

      await refreshCart();

      return true;
    } catch (error) {
      showModal(
        error.response?.data?.message ||
          "Gagal menambahkan buku ke keranjang.",
        "error",
        { title: "Gagal menambahkan buku" },
      );

      return false;
    }
  };

  // Menghapus buku dari keranjang
  const removeFromCart = async (id) => {
    const item = cart.find((cartItem) => cartItem.cart_item_id === id);
    const bookTitle = item?.title ?? item?.judul;
    const confirmed = await confirmModal({
      title: "Hapus buku dari keranjang?",
      message: bookTitle
        ? `Buku "${bookTitle}" akan dihapus dari keranjang.`
        : "Buku ini akan dihapus dari keranjang.",
      icon: "fa-trash-can",
      confirmText: "Hapus",
      confirmButtonClass: "btn-danger",
    });

    if (!confirmed) return;

    try {
      await API.delete(`/cart/${id}`);
      await refreshCart();
      showModal(
        bookTitle
          ? `Buku "${bookTitle}" berhasil dihapus dari keranjang.`
          : "Buku berhasil dihapus dari keranjang.",
        "success",
        {
          title: "Buku dihapus",
          icon: "fa-trash-can",
          tone: "danger",
        },
      );
    } catch (error) {
      showModal(
        error.response?.data?.message ||
          "Gagal menghapus buku dari keranjang.",
        "error",
        { title: "Gagal menghapus buku" },
      );
    }
  };

  // Mengubah jumlah buku
  const updateQuantity = async (id, quantity) => {
    const item = cart.find((book) => book._id === id);

    if (!item) return;

    const newQuantity = Math.max(
      1,
      Math.min(Number(quantity), Number(item.stock))
    );

    try {
      await API.put(`/cart/${id}`, {
        quantity: newQuantity,
      });

      await refreshCart();
    } catch (error) {
      showModal(
        error.response?.data?.message ||
          "Gagal memperbarui jumlah buku.",
        "error",
        { title: "Gagal memperbarui keranjang" },
      );
    }
  };

  // Menghitung jumlah seluruh buku
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Menghitung total harga belanja
  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        cartTotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}