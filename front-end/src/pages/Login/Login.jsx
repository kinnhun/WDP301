import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../utils/axios";
import { verifyAccessToken } from "../../utils/jwt";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/login", data);
      console.log(response);
      if (response.data.success) {
        const accessToken = response.data.data;
        if (!accessToken) {
          setIsLoading(false);
          toast.error("Token not found");
          return;
        }
        const user = verifyAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(accessToken));
        toast.success("Login successfully");
        if (!user.status) {
          setIsLoading(false);
          reset();
          navigate("/verify");
          return;
        }

        setIsLoading(false);
        reset();
        if (user.role === 1) {
          navigate("/student");
        } else if (user.role === 2) {
          navigate("/manager");
        } else if (user.role === 4) {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      if (e.status === 404 || e.status === 401) {
        toast.error("Sai email hoặc mật khẩu");
      } else {
        toast.error("Đã có lỗi xảy ra");
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const userInfo = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then((res) => res.data);
        // console.log(userInfo);

        // const genderResponse = await axios
        //   .get(`https://people.googleapis.com/v1/people/me?&personFields=genders`, {
        //     headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        //   })
        //   .then((res) => res.data);

        const response = await axios.post("/auth/google-login", {
          email: userInfo.email,
        });

        const accessToken = response.data.data;
        const user = verifyAccessToken(accessToken);

        localStorage.setItem("token", JSON.stringify(accessToken));
        toast.success("Đăng nhập thành công");

        setIsLoading(false);

        if (user.role === 4) {
          navigate("/student");
        } else if (user.role === 2) {
          navigate("/manager");
        } else if (user.role === 1) {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error during Google login:", error);
        toast.error("Tài khoản Google chưa được liên kết với hệ thống");
      }
    },
    onError: () => {
      toast.error("Đăng nhập bằng Google thất bại");
    },
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="authentication-bg pb-0"
      data-layout-config='{"darkMode":false}'
      style={{ height: "100vh" }}
    >
      <div className="auth-fluid">
        <div className="auth-fluid-form-box">
          <div className="align-items-center d-flex h-100">
            <div className="card-body">
              <div className="auth-brand text-center text-lg-start">
                <a href="index.html" className="logo-dark">
                  <span>
                    <img src="assets/images/logo-dark.png" alt="Logo Dark" height="18" />
                  </span>
                </a>
                <a href="index.html" className="logo-light">
                  <span>
                    <img src="assets/images/logo.png" alt="Logo Light" height="18" />
                  </span>
                </a>
              </div>

              <h4 className="mt-0">Sign In</h4>
              <p className="text-muted mb-4">
                Enter your email address and password to access your account.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="emailaddress" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="emailaddress"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email cannot be empty",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Email is not valid",
                      },
                    })}
                  />
                  {errors && errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-3">
                  <a href="pages-recoverpw-2.html" className="text-muted float-end">
                    <small>Forgot your password?</small>
                  </a>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password cannot be empty",
                      },
                    })}
                  />
                  {errors && errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                    <label className="form-check-label" htmlFor="checkbox-signin">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-grid mb-0 text-center">
                  <button className="btn btn-primary" type="submit">
                    <i className="mdi mdi-login"></i> Log In
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p className="text-muted font-16">Sign in with</p>
                  <ul className="social-list list-inline mt-3">
                    <li className="list-inline-item" onClick={() => googleLogin()}>
                      <a
                        href="javascript:void(0);"
                        className="social-list-item border-danger text-danger"
                      >
                        <i className="mdi mdi-google"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </form>

              <footer className="footer footer-alt">
                <p className="text-muted">
                  Do not have an account?
                  <a href="pages-register-2.html" className="text-muted ms-1">
                    <b>Sign Up</b>
                  </a>
                </p>
              </footer>
            </div>
          </div>
        </div>

        <div className="auth-fluid-right text-center">
          <div className="auth-user-testimonial">
            <h2 className="mb-3">I love the color!</h2>
            <p className="lead">
              <i className="mdi mdi-format-quote-open"></i>
              It is an elegant template. I love it very much!{" "}
              <i className="mdi mdi-format-quote-close"></i>
            </p>
            <p>- Hyper Admin User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
