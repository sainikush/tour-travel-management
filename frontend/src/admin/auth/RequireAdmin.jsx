import { Navigate, useLocation } from "react-router-dom";

const isAdmin = () => !!localStorage.getItem("admin_token");

export default function RequireAdmin({ children }) {
  const location = useLocation();

  if (!isAdmin()) {
    return (
      <Navigate
        to="/login?role=admin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}