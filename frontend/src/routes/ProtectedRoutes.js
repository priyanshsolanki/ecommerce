import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Roles } from "../constants/AccessConstants";
import PrivateRoute from "../components/PrivateRoute";
import { CustomerDashboard } from "../pages/CustomerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";
import Home from "../pages/Home";
import { useAuth } from "../context/AuthContext";
import { getRole } from "../utils/CheckRoles";

const ProtectedRoutes = () => {
  const { token } = useAuth();
  const userRole = token ? getRole(token) : null;

  // Redirect root path based on user role
  const defaultRedirect = userRole === Roles.ADMIN ? "/admin/shop" : "/user/shop";

  return (
    <Routes>
     
      {/* User/Customer Routes */}
      <Route element={<PrivateRoute allowedRoles={[Roles.USER]} />}>
        <Route path="/user/shop" element={<CustomerDashboard component={Home} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CustomerDashboard component={Checkout} />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/orders" element={<CustomerDashboard component={Orders} />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={[Roles.ADMIN]} />}>
        <Route path="/admin/shop" element={<AdminDashboard />} />
      </Route>

      {/* Shared Routes - Accessible by both user types */}
      <Route element={<PrivateRoute allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
        {/* Add any shared routes here if needed */}
      </Route>

      {/* Catch all - redirect unknown routes to default */}
      <Route path="*" element={<Link to={defaultRedirect} replace />} />
    </Routes>
  );
};

export default ProtectedRoutes;