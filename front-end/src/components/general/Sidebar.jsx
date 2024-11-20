import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  // const baseUrl = import.meta.env.VITE_PUBLIC_URL;

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
                <span> News </span>
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
                <span> EWUsages </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/paymentHistory`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> PaymentHistories </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/invoices`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> Invoices </span>
              </Link>
            </li>
            <li className="side-nav-item">
              <Link to={`/student/requests`} className="side-nav-link">
                <i className="uil-rss"></i>
                <span> Requests </span>
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

export default Sidebar;
