import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Confirmation from "../pages/Confirmation";
import LoginPage from "../features/user/LoginPage";
import AdminDashboard from "../features/admin/AdminDashboard";
import CartPage from "../features/cart/CartPage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../features/user/ProtectedRoute";
import ProductDetail from "../features/products/ProductDetail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product-detail"
        element={
          <ProductDetail />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
