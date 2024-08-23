import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};
export default PrivateRoute;
