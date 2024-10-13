import Login from "../pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ManageUser from "../pages/Manager/ManageUser/ManageUser";
import UserList from "../pages/Manager/ManageUser/UserList";
import Layout from "../layouts/Layout";

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/manage-user" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
