import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { getRole } from "./utils/CheckRoles";

function AppWrapper() {
  const { authUser, token } = useAuth();
  const userRole = token ? getRole(token) : null;
  
  // Conditionally render routes based on authentication
  const isAuthenticated = !!token;

  return (
    <>
      {isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;