import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="loading"
      data-layout-color="light"
      data-leftbar-theme="dark"
      data-layout-mode="fluid"
      data-rightbar-onstart="true"
    >
      <div className="wrapper">
        <Sidebar />
        <div className="content-page">
          <div className="content">
            <Header />
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
