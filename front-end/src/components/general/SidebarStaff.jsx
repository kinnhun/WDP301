import React from 'react'
import "./Sidebar.scss";
import { Link } from 'react-router-dom';

const SidebarStaff = () => {
    return (
        <div>
            {/* <!-- ========== Left Sidebar Start ========== --> */}
            <div className="leftside-menu">
                {/* <!-- LOGO --> */}

                <Link to={`/student/home`} className="logo text-center logo-light">
                    <span className="logo-lg">
                        <img src={`/assets/images/logo.png`} alt="Logo Light" height="48" />
                    </span>
                    <span className="logo-sm">
                        <img src={`/assets/images/logo_sm.png`} alt="Logo Light Small" height="16" />
                    </span>
                </Link>

                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    {/* <!--- Sidemenu --> */}
                    <ul className="side-nav" style={{ backgroundColor: "#313A46" }}>



                        <li className="side-nav-item">
                            <Link to={`/staff/home`} className="side-nav-link">
                                <i className="uil-store"></i>
                                <span> Staff home </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={`/staff/requests`} className="side-nav-link">
                                <i className="uil-store"></i>
                                <span> Staff requests </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={`/staff/reports`} className="side-nav-link">
                                <i className="uil-store"></i>
                                <span> Staff reports </span>
                            </Link>
                        </li>




                    </ul>

                    {/* <!-- Help Box --> */}

                    {/* <!-- end Help Box --> */}
                    {/* <!-- End Sidebar --> */}

                    <div className="clearfix"></div>
                </div>
                {/* <!-- Sidebar -left --> */}
            </div>
            {/* <!-- Left Sidebar End --> */}
        </div>
    )
}

export default SidebarStaff
