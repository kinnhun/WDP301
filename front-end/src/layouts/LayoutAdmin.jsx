import HeaderAdmin from "../components/general/HeaderAdmin";
import SidebarAdmin from "../components/general/Sidebar/SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <div>
      <div className="container-scroller">
        <HeaderAdmin></HeaderAdmin>
        <div className="container-fluid page-body-wrapper">
          <SidebarAdmin></SidebarAdmin>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
