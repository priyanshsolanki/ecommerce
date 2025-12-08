import React from "react";
import { BrowserRouter} from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import { getRole } from "./utils/CheckRoles";

function AppWrapper() {
 
  return (
    <>
      <PublicRoutes />
      <ProtectedRoutes/>
    </>
  );
}

function App() {
  const {authUser,token} = useAuth();

  const userRole = token ? getRole(token) : null;

  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <AppWrapper />
        {/* </AuthProvider> */}
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;

