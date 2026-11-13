import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Books from "./pages/public/books/Books";
import BookDetail from "./pages/public/books/BookDetail";
import About from "./pages/public/info/About";
import Contact from "./pages/public/info/Contact";
import Cart from "./pages/public/cart/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/public/cart/Checkout";
import PaymentResult from "./pages/public/orders/PaymentResult";
import Orders from "./pages/public/orders/Orders";
import OrderDetail from "./pages/public/orders/OrderDetail";
import Profile from "./pages/public/Profile/Profile";
import EditProfile from "./pages/public/Profile/EditProfile";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}