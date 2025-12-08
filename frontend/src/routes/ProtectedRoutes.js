import React from "react";
import { Route, Routes } from "react-router-dom";
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


const ProtectedRoutes = () => {
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
    </Routes>
  );
};

export default ProtectedRoutes;