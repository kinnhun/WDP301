import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Bookings from "../pages/bookings/Bookings";
import EWUsage from "../pages/EWUsage/EWUsage";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import Verify from "../pages/Login/Verify";
import UserList from "../pages/Manager/ManageUser/UserList";

import News from "../pages/news/news";
import PaymentHistory from "../pages/paymentHistory/PaymentHistory";
import Profile from "../pages/profile/Profile";
import Requests from "../pages/requests/Requests";
import ResidentHistories from "../pages/residentHistories/ResidentHistories";


import ResidentHistories from "../pages/residentHistories/ResidentHistories";
import OTPPage from "../pages/Login/Verify";
import UserList from "../pages/Manager/ManageUser/UserList";
const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<OTPPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-user" element={<UserList />} />
        <Route path="/student/request" element={<Requests />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/news" element={<News></News>} />
        <Route path="/ResidentHistories" element={<ResidentHistories></ResidentHistories>} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/EWUsage" element={<EWUsage />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/student/Requests" element={<Requests />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default publicRouter;
