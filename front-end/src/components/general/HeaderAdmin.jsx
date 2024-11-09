
const HeaderAdmin = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_URL;
  return (
    <div>
        {/* Topbar Start */}
        <div className="navbar-custom">
            <ul className="list-unstyled topbar-menu float-end mb-0">
                {/* Search Bar for Mobile */}
                <li className="dropdown notification-list d-lg-none">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="dripicons-search noti-icon"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                        <form className="p-3">
                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Search"></input>
                        </form>
                    </div>
                </li>

                {/* Language Selector */}
                <li className="dropdown notification-list topbar-dropdown">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <img src={`${baseUrl}/assets/images/flags/us.jpg`} alt="user-image" className="me-0 me-sm-1" height="12" />
                        <span className="align-middle d-none d-sm-inline-block">English</span> <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu">
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <img src={`${baseUrl}/assets/images/flags/germany.jpg`} alt="German" className="me-1" height="12" /> <span className="align-middle">German</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <img src={`${baseUrl}/assets/images/flags/italy.jpg`} alt="Italian" className="me-1" height="12" /> <span className="align-middle">Italian</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <img src={`${baseUrl}/assets/images/flags/spain.jpg`} alt="Spanish" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <img src={`${baseUrl}/assets/images/flags/russia.jpg`} alt="Russian" className="me-1" height="12" /> <span className="align-middle">Russian</span>
                        </a>
                    </div>
                </li>

                {/* Notification Dropdown */}
                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="dripicons-bell noti-icon"></i>
                        <span className="noti-icon-badge"></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg">
                        <div className="dropdown-item noti-title px-3">
                            <h5 className="m-0">
                                <span className="float-end">
                                    <a href="javascript: void(0);" className="text-dark">
                                        <small>Clear All</small>
                                    </a>
                                </span>
                                Notification
                            </h5>
                        </div>
                        <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item border-top border-light py-2">
                            View All
                        </a>
                    </div>
                </li>

                {/* App Links Dropdown */}
                <li className="dropdown notification-list d-none d-sm-inline-block">
                    <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i className="dripicons-view-apps noti-icon"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
                        <div className="p-2">
                            <div className="row g-0">
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/slack.png`} alt="slack" />
                                        <span>Slack</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/github.png`} alt="Github" />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/dribbble.png`} alt="dribbble" />
                                        <span>Dribbble</span>
                                    </a>
                                </div>
                            </div>
                            <div className="row g-0">
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/bitbucket.png`} alt="bitbucket" />
                                        <span>Bitbucket</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/dropbox.png`} alt="dropbox" />
                                        <span>Dropbox</span>
                                    </a>
                                </div>
                                <div className="col">
                                    <a className="dropdown-icon-item" href="#">
                                        <img src={`${baseUrl}/assets/images/brands/g-suite.png`} alt="G Suite" />
                                        <span>G Suite</span>
                                    </a>
                                </div>
                            </div>  {/* end row */}
                        </div>
                    </div>
                </li>

                {/* Settings Icon */}
                <li className="notification-list">
                    <a className="nav-link end-bar-toggle" href="javascript: void(0);">
                        <i className="dripicons-gear noti-icon"></i>
                    </a>
                </li>

                {/* User Profile Dropdown */}
                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                        aria-expanded="false">
                        <span className="account-user-avatar">
                            <img src={`${baseUrl}/assets/images/users/avatar-1.jpg`} alt="user-image" className="rounded-circle" />
                        </span>
                        <span>
                            <span className="account-user-name">Dominic Keller</span>
                            <span className="account-position">Founder</span>
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                        <div className="dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome !</h6>
                        </div>
                        <a href="/profile/account" className="dropdown-item notify-item">
                            <i className="mdi mdi-account-circle me-1"></i>
                            <span>My Account</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-account-edit me-1"></i>
                            <span>Settings</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-lifebuoy me-1"></i>
                            <span>Support</span>
                        </a>
                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-lock-outline me-1"></i>
                            <span>Lock Screen</span>
                        </a>
                        <a href="login" className="dropdown-item notify-item">
                            <i className="mdi mdi-logout me-1"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
            <button className="button-menu-mobile open-left">
                <i className="mdi mdi-menu"></i>
            </button>
            {/* Search Bar for Desktop */}
            <div className="app-search dropdown d-none d-lg-block">
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control dropdown-toggle" placeholder="Search..." id="top-search" />
                        <span className="input-group-text" id="basic-addon2">
                            <i className="mdi mdi-magnify"></i>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        {/* Topbar End */}
    </div>
);
};

export default HeaderAdmin
