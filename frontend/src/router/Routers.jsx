import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../Components/Layout/Layout";
import AdminLayout from "../admin/layout/AdminLayout";
import RequireAdmin from "../admin/auth/RequireAdmin";

// Public pages
import Home from "../pages/Home";
import Tour from "../pages/Tour";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";

// Admin pages
import AdminDashboard from "../admin/pages/AdminDashboard";
import ManageTours from "../admin/pages/ManageTours";
import TourForm from "../admin/pages/TourForm";
import ManageBookings from "../admin/pages/ManageBookings";
import ManageCustomers from "../admin/pages/ManageCustomers";

const Routers = () => {
  return (
    <Routes>
      {/* ---------- PUBLIC SITE (Header + Footer) ---------- */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/tours" element={<Tour />} />
        <Route path="/tours/:id" element={<TourDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Route>

      {/* ---------- ADMIN AUTH REDIRECT ---------- */}
      <Route
        path="/admin/login"
        element={<Navigate to="/login?role=admin" replace />}
      />

      {/* ---------- ADMIN (protected) ---------- */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tours" element={<ManageTours />} />
        <Route path="tours/new" element={<TourForm />} />
        <Route path="tours/:id/edit" element={<TourForm />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="customers" element={<ManageCustomers />} />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default Routers;
