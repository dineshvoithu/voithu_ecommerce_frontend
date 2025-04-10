import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  const role = user.role?.toUpperCase(); // Normalize role format

  const isAuthorized = allowedRoles.some(
    (allowedRole) =>
      role === allowedRole.toUpperCase() ||
      `ROLE_${role}` === allowedRole.toUpperCase()
  );

  if (!isAuthorized) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
