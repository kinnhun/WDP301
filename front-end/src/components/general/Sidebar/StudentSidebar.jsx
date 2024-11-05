import { Link } from "react-router-dom";

const StudentSidebar = () => {
  return (
    <div>
      {/* <!-- ========== Left Sidebar Start ========== --> */}
      <div className="leftside-menu">
        {/* <!-- LOGO --> */}

        <Link to={`/student/home`} className="logo text-center logo-light">
          <span className="logo-lg">
            <img src={`/assets/images/logo.png`} alt="Logo Light" height="16" />
          </span>
          <span className="logo-sm">
            <img src={`/assets/images/logo_sm.png`} alt="Logo Light Small" height="16" />
          </span>
        </Link>

        <div className="h-100" id="leftside-menu-container" data-simplebar>
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
                    <a href="dashboard-analytics.html">Analytics</a>
                  </li>
                  <li>
                    <a href="index.html">Ecommerce</a>
                  </li>
                  <li>
                    <a href="dashboard-projects.html">Projects</a>
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
              <Link to={`/student/home`} className="side-nav-link">
                <i className="uil-store"></i>
                <span> Home </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/student/news`} className="side-nav-link">
                <i className="uil-calender"></i>
                <span> news </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/student/residentHistories`} className="side-nav-link">
                <i className="uil-comments-alt"></i>
                <span> ResidentHistories </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/student/bookings`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> Bookings </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/EWUsage`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> EWUsage </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/paymentHistory`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> PaymentHistory </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/requests`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> Requests </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/reports`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> Reports </span>
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

export default StudentSidebar;
