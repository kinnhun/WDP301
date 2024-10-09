import Login from "../pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ManageUser from "../pages/Manager/ManageUser/ManageUser";
import UserList from "../pages/Manager/ManageUser/UserList";

const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manager/manage-user" element={<UserList />} />
      {/* <Route path="/verify" element={<Verify />} /> */}
    </Routes>
  );
};

export default publicRouter;
