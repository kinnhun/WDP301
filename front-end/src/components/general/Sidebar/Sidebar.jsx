import "./Sidebar.scss";
import StudentSidebar from "./StudentSidebar";
import ManagerSidebar from "./ManagerSidebar";
import StaffSideBar from "./StaffSideBar";
import { verifyAccessToken } from "../../../utils/jwt";

const Sidebar = () => {
  // const baseUrl = import.meta.env.VITE_PUBLIC_URL;
  const token = localStorage.getItem("token");
  const user = verifyAccessToken(token);
  return (
    <div>
      {user.role === 4 && <StudentSidebar />}
      {user.role === 3 && <StaffSideBar />}
      {user.role === 2 && <ManagerSidebar />}
    </div>
  );
};

export default Sidebar;
