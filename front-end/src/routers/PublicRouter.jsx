import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";
import UserList from "../pages/Manager/ManageUser/UserList";

const PublicRouter = () => {
  return (
    <Routes>
              <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-user" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
