import { Link } from "react-router-dom";
import "./Sidebar.scss";
const SidebarAdmin = () => {
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
            <li className="side-nav-title side-nav-item">Navigation</li>

            <li className="side-nav-item">
              <a
                data-bs-toggle="collapse"
                href="#sidebarDashboards"
                aria-expanded="false"
                aria-controls="sidebarDashboards"
                className="side-nav-link"
              >
                <i className="uil-home-alt"></i>
                <span className="badge bg-success float-end">4</span>
                <span> Dashboards </span>
              </a>
              <div className="collapse" id="sidebarDashboards">
                <ul className="side-nav-second-level">
                  <li>
                    <Link to={`/admin/dashboard`}>Dashboard</Link>
                  </li>
                  <li>
                    <a href="dashboard-wallet.html">
                      E-Wallet{" "}
                      <span className="badge rounded bg-danger font-10 float-end">New</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="side-nav-title side-nav-item">Apps</li>

            <li className="side-nav-item">
              <Link to={`/admin/manage-users`} className="side-nav-link">
                <i className="uil-store"></i>
                <span> Manage User </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/manager-booking`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> Manage Booking </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/admin/new`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> Manage news </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/admin/requests`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> Manage requests </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/semester`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> Manage semester </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/admin/invoices`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> Manage invoices </span>
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
  );
};
export default SidebarAdmin;
