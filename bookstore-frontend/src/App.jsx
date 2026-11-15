import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/public/Home";
import Books from "./pages/public/books/Books";
import About from "./pages/public/info/About";
import Contact from "./pages/public/info/Contact";
import Cart from "./pages/public/cart/Cart";
import Checkout from "./pages/public/cart/Checkout";
import PaymentResult from "./pages/public/orders/PaymentResult";
import Orders from "./pages/public/orders/Orders";
import OrderDetail from "./pages/public/orders/OrderDetail";
import Profile from "./pages/public/profile/Profile";
import EditProfile from "./pages/public/profile/EditProfile";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminBooks from "./pages/admin/Books";
import CreateBook from "./pages/admin/Books/create";
import EditBook from "./pages/admin/Books/edit";
import AdminAuthors from "./pages/admin/Authors";
import CreateAuthor from "./pages/admin/Authors/create";
import EditAuthor from "./pages/admin/Authors/edit";
import AdminGenres from "./pages/admin/Genres";
import CreateGenre from "./pages/admin/Genres/create";
import EditGenre from "./pages/admin/Genres/edit";
import AdminUsers from "./pages/admin/Users";
import UserDetail from "./pages/admin/Users/detail";
import AdminTransactions from "./pages/admin/Transactions";
import TransactionDetail from "./pages/admin/Transactions/detail";
import AdminContactMessages from "./pages/admin/ContactMessages";
import ContactMessageDetail from "./pages/admin/ContactMessages/detail";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Navigate to="/books" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

            {/* Guest Routes */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="books" element={<AdminBooks />} />
              <Route path="books/create" element={<CreateBook />} />
              <Route path="books/:id/edit" element={<EditBook />} />

              <Route path="genres" element={<AdminGenres />} />
              <Route path="genres/create" element={<CreateGenre />} />
              <Route path="genres/:id/edit" element={<EditGenre />} />

              <Route path="authors" element={<AdminAuthors />} />
              <Route path="authors/create" element={<CreateAuthor />} />
              <Route path="authors/:id/edit" element={<EditAuthor />} />

              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<UserDetail />} />

              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="transactions/:id" element={<TransactionDetail />} />

              <Route path="contact-messages" element={<AdminContactMessages />} />
              <Route path="contact-messages/:id" element={<ContactMessageDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
