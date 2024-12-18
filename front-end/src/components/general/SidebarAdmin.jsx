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
                <i className="fas fa-users"></i> {/* Manage User icon */}
                <span> Manage User </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/new`} className="side-nav-link">
                <i className="fas fa-newspaper"></i> {/* Manage News icon */}
                <span> Manage News </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/manager-booking`} className="side-nav-link">
                <i className="fas fa-calendar-alt"></i> {/* Manage Booking icon */}
                <span> Manage Booking </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/requests`} className="side-nav-link">
                <i className="fas fa-clipboard-list"></i> {/* Manage Requests icon */}
                <span> Manage requests </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/reports`} className="side-nav-link">
                <i className="fas fa-file-alt"></i> {/* Manage Reports icon */}
                <span> Manage reports </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/semester`} className="side-nav-link">
                <i className="fas fa-calendar-check"></i> {/* Manage Semester icon */}
                <span> Manage semester </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <Link to={`/admin/invoices`} className="side-nav-link">
                <i className="fas fa-file-invoice"></i> {/* Manage Invoices icon */}
                <span> Manage invoices </span>
              </Link>
            </li>

            <li className="side-nav-item">
              <a
                data-bs-toggle="collapse"
                href="#sidebarManageRoom"
                aria-expanded="false"
                aria-controls="sidebarManageRoom"
                className="side-nav-link"
              >
                <i className="fas fa-bed"></i> {/* Icon giường ngủ */}
                <span> Manage Room </span>
              </a>
              <div className="collapse" id="sidebarManageRoom">
                <ul className="side-nav-second-level">
                  <li>
                    <Link to={`/admin/manager-room`} className="nav-link">
                      <i className="fas fa-cogs"></i> <span> Manager Room </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/admin/list-room`} className="nav-link">
                      <i className="fas fa-list-ul"></i> <span>List All Room</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/admin/create-room`} className="nav-link">
                      <i className="fas fa-plus-circle"></i> <span>Create A New Room</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/admin/create-many-rooms`} className="nav-link">
                      <i className="fas fa-layer-group"></i> <span>Create Many New Room</span>
                    </Link>
                  </li>
                </ul>
              </div>
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
