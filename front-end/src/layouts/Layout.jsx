import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main flex-grow-1">
        <Header />
        <div className="container mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
