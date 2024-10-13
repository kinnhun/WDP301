import { Navigate, Outlet } from "react-router-dom";
import { verifyAccessToken } from "../utils/jwt";
import NotFound from "../components/NotFound";

// Middleware to block access to routes when user is authenticated (has token)
const AuthRedirectMiddleware = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return <Outlet />;
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return <Outlet />;
  }

  return <NotFound />;
};

export default AuthRedirectMiddleware;
