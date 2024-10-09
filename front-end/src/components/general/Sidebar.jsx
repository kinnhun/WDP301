import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div >
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="sidebar-brand-text align-middle">
                                AdminKit
                                <sup><small className="badge bg-primary text-uppercase">Pro</small></sup>
                            </span>

                        </a>

                        <div className="sidebar-user">
                            <div className="d-flex justify-content-center">
                                <div className="flex-shrink-0">
                                    <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1" alt="Charles Hall" />
                                </div>
                                <div className="flex-grow-1 ps-2">
                                    <a className="sidebar-user-title dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Charles Hall
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-start">
                                        <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
                                        <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="pages-settings.html"><i className="align-middle me-1" data-feather="settings"></i> Settings &
                                            Privacy</a>
                                        <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Log out</a>
                                    </div>

                                    <div className="sidebar-user-subtitle">Designer</div>
                                </div>
                            </div>
                        </div>

                        <ul className="sidebar-nav">
                            <li className="sidebar-header">
                                Pages
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/home">
                                    <i className="align-middle" data-feather="user"></i>
                                    <span className="align-middle">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/news">
                                    <i className="align-middle" data-feather="lock"></i>
                                    <span className="align-middle">News</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/ResidentHistories">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Resident Histories</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/Bookings">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/EWUsage">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Electricity water usage</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/PaymentHistory">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Payment History</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/Requests">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Requests</span>
                                </Link>
                            </li>
                            <li>
                            <Link className="sidebar-link" to="/about">
                                <i className="align-middle" data-feather="grid"></i>
                                <span className="align-middle">About</span>
                            </Link>
                            </li>
                            <li>
                                <Link className="sidebar-link" to="/Report">
                                    <i className="align-middle" data-feather="message-square"></i>
                                    <span className="align-middle">Report</span>
                                </Link>
                            </li>


                           
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="pages-profile.html">
                                    <i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link" href="pages-invoice.html">
                                    <i className="align-middle" data-feather="credit-card"></i> <span className="align-middle">Invoice</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link" href="pages-tasks.html">
                                    <i className="align-middle" data-feather="list"></i> <span className="align-middle">Tasks</span>
                                    <span className="sidebar-badge badge bg-primary">Pro</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a className="sidebar-link" href="calendar.html">
                                    <i className="align-middle" data-feather="calendar"></i> <span className="align-middle">Calendar</span>
                                    <span className="sidebar-badge badge bg-primary">Pro</span>
                                </a>
                            </li>

                            <li className="sidebar-item">
                                <a href="#auth" data-bs-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle" data-feather="users"></i> <span className="align-middle">Auth</span>
                                </a>
                                <ul id="auth" className="sidebar-dropdown list-unstyled collapse " data-bs-parent="#sidebar">
                                    <li className="sidebar-item"><a className="sidebar-link" href="pages-sign-in.html">Sign In</a></li>
                                    <li className="sidebar-item"><a className="sidebar-link" href="pages-sign-up.html">Sign Up</a></li>
                                    <li className="sidebar-item"><a className="sidebar-link" href="pages-reset-password.html">Reset Password <span
                                        className="sidebar-badge badge bg-primary">Pro</span></a></li>
                                    <li className="sidebar-item"><a className="sidebar-link" href="pages-404.html">404 Page <span
                                        className="sidebar-badge badge bg-primary">Pro</span></a></li>
                                    <li className="sidebar-item"><a className="sidebar-link" href="pages-500.html">500 Page <span
                                        className="sidebar-badge badge bg-primary">Pro</span></a></li>
                                </ul>
                            </li>


                        </ul>


                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Sidebar
