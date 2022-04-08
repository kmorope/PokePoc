import { useAuth } from "context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRouter = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouter;
