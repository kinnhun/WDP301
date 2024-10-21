import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import Spinner from "../components/Spinner/Spinner";
import { verifyAccessToken } from "../utils/jwt";

const AuthMiddleware = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          return navigate("/login");
        }
        const user = verifyAccessToken(token);

        if (!user) {
          return navigate("/login");
        }
        if (user.status === 0) {
          return navigate("/verify");
        }

        if (path.startsWith("/student") && user.role === "student") {
          setIsVerified(true);
        } else if (path.startsWith("/manager") && user.role === "manager") {
          setIsVerified(true);
        } else if (path.startsWith("/admin") && user.role === "admin") {
          setIsVerified(true);
        } else if (path.startsWith("/chatbot") && user.status === 1) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (e) {
        console.error(e);
        setIsVerified(false);
      } finally {
        setIsLoading(false); // Loading is done
      }
    };

    verifyUser();
  }, [path, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return <div className="auth-wrapper h-100">{isVerified ? <Outlet /> : <NotFound />}</div>;
};

export default AuthMiddleware;
