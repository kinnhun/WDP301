import Login from "../pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} /> */}
    </Routes>
  );
};

export default publicRouter;
