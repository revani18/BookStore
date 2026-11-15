import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalProvider";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
const Home = lazy(() => import("./pages/public/Home"));
const Books = lazy(() => import("./pages/public/books/Books"));
const About = lazy(() => import("./pages/public/info/About"));
const Contact = lazy(() => import("./pages/public/info/Contact"));
const Cart = lazy(() => import("./pages/public/cart/Cart"));
const Checkout = lazy(() => import("./pages/public/cart/Checkout"));
const PaymentResult = lazy(() => import("./pages/public/orders/PaymentResult"));
const Orders = lazy(() => import("./pages/public/orders/Orders"));
const OrderDetail = lazy(() => import("./pages/public/orders/OrderDetail"));
const Profile = lazy(() => import("./pages/public/profile/Profile"));
const EditProfile = lazy(() => import("./pages/public/profile/EditProfile"));

// Auth Pages
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

// Admin Pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminBooks = lazy(() => import("./pages/admin/Books"));
const CreateBook = lazy(() => import("./pages/admin/Books/create"));
const EditBook = lazy(() => import("./pages/admin/Books/edit"));
const AdminAuthors = lazy(() => import("./pages/admin/Authors"));
const CreateAuthor = lazy(() => import("./pages/admin/Authors/create"));
const EditAuthor = lazy(() => import("./pages/admin/Authors/edit"));
const AdminGenres = lazy(() => import("./pages/admin/Genres"));
const CreateGenre = lazy(() => import("./pages/admin/Genres/create"));
const EditGenre = lazy(() => import("./pages/admin/Genres/edit"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const UserDetail = lazy(() => import("./pages/admin/Users/detail"));
const AdminTransactions = lazy(() => import("./pages/admin/Transactions"));
const TransactionDetail = lazy(
  () => import("./pages/admin/Transactions/detail"),
);
const AdminContactMessages = lazy(
  () => import("./pages/admin/ContactMessages"),
);
const ContactMessageDetail = lazy(
  () => import("./pages/admin/ContactMessages/detail"),
);

export default function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route
                path="/books/:id"
                element={<Navigate to="/books" replace />}
              />
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
                <Route
                  path="transactions/:id"
                  element={<TransactionDetail />}
                />

                <Route
                  path="contact-messages"
                  element={<AdminContactMessages />}
                />
                <Route
                  path="contact-messages/:id"
                  element={<ContactMessageDetail />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ModalProvider>
  );
}
