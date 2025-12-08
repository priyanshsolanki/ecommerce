import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/Authentication/RegisterPage";
import { Login } from "../pages/Authentication/LoginPage";

import UnauthorizedPage from "../pages/Authentication/UnauthorizedPage";
import VerificationEmail from "../pages/Authentication/VerifyEmailPage";
import DalScooterLanding from "../pages/Landing";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DalScooterLanding />}/>
      <Route exact path="/login/:type" element={<Login />} />

    
      <Route exact path="/verify" element={<VerificationEmail />} />
      <Route exact path="/register/:type" element={<Register />} />
      <Route exact path="/" element={<Login />} />
      <Route exact path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default PublicRoutes;
