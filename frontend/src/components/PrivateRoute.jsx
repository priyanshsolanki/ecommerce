import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRole } from "../utils/CheckRoles";


const PrivateRoute = ({ allowedRoles }) => {
  const { token } = useAuth();
  
  if (!token) {
    return <Link to="/login/user" replace />;
  }

  const role = getRole(token);
  if (!role)     
   return <Link to="/login/user" replace />;
   
  if (!allowedRoles.includes(role))
    return <Link to="/unauthorized" replace />;
 

  return <Outlet />; // This renders the nested routes inside the private route
};

export default PrivateRoute;
