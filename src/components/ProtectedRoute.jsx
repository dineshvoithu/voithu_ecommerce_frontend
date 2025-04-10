import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = localStorage.getItem("user");
  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user JSON:", error);
    localStorage.removeItem("user"); // Clean up bad data
    return <Navigate to="/login" />;
  }

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
