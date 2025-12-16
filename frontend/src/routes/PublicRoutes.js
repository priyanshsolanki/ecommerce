import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Register } from "../pages/Authentication/RegisterPage";
import { Login } from "../pages/Authentication/LoginPage";
import UnauthorizedPage from "../pages/Authentication/UnauthorizedPage";
import VerificationEmail from "../pages/Authentication/VerifyEmailPage";
import DalScooterLanding from "../pages/Landing";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DalScooterLanding />} />
      <Route path="/login/:type" element={<Login />} />
      <Route path="/verify" element={<VerificationEmail />} />
      <Route path="/register/:type" element={<Register />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Link to="/" replace />} />
    </Routes>
  );
};

export default PublicRoutes;