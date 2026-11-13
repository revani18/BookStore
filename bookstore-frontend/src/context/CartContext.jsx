import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./cart-context";
import { API } from "../services/api";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Mengambil keranjang dari database Laravel
  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCart([]);
      return;
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
      alert("Silakan masuk terlebih dahulu.");
      return false;
    }

    const bookId = book.id ?? book._id;

    if (!bookId) {
      alert("Data buku tidak valid.");
      return false;
    }

    const existingBook = cart.find(
      (item) => item.book_id === bookId
    );

    const currentQuantity = existingBook
      ? existingBook.quantity
      : 0;

    if (currentQuantity >= Number(book.stock)) {
      alert("Stok buku tidak mencukupi.");
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
      alert(
        error.response?.data?.message ||
          "Gagal menambahkan buku ke keranjang."
      );

      return false;
    }
  };

  // Menghapus buku dari keranjang
  const removeFromCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      await refreshCart();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Gagal menghapus buku dari keranjang."
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
      alert(
        error.response?.data?.message ||
          "Gagal memperbarui jumlah buku."
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