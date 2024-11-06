import HeaderAdmin from "../components/general/HeaderAdmin";
import SidebarAdmin from "../components/general/SidebarAdmin";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./Layout.scss";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token từ localStorage
    const token = localStorage.getItem("token");

    // Nếu không có token, hiển thị thông báo và chuyển hướng về trang đăng nhập
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! You are not logged in.",
        backdrop: `
          rgba(0, 0, 0, 0.7) 
          left top
          no-repeat
        `,

        allowOutsideClick: false, // Không cho phép đóng popup khi click ra ngoài
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }, [navigate]);

  return (
    <div
      className="loading"
      data-layout-color="light"
      data-leftbar-theme="dark"
      data-layout-mode="fluid"
      data-rightbar-onstart="true"
    >
      <div className="wrapper">
        <SidebarAdmin />
        <div className="content-page">
          <div className="content">
            <HeaderAdmin />
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

