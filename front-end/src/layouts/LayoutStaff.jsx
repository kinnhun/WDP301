import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Layout.scss";
import SidebarStaff from "../components/general/SidebarStaff";
import HeaderStaff from "../components/general/HeaderStaff";

const LayoutStaff = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! You are not logged in.",
                backdrop: `rgba(0, 0, 0, 0.7) left top no-repeat`,
                allowOutsideClick: false,
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
                <SidebarStaff className="sidebar" />
                <div className="content-page">
                    <div className="content">
                        <HeaderStaff />
                        <div className="mt-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutStaff;
