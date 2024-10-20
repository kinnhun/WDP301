import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";

import UserList from "../pages/Manager/ManageUser/UserList";

import News from "../pages/Student/news/news";
import PaymentHistory from "../pages/Student/paymentHistory/PaymentHistory";

import Requests from "../pages/Student/requests/Requests";
import ResidentHistories from "../pages/Student/residentHistories/ResidentHistories";
import RequestManagement from "../pages/Manager/RequestManagement/RequestManagement";
import Home from "../pages/Student/home/Home";
import OTPPage from "../pages/Login/Verify";
import Profile from "../pages/profile/profile";
import NewsDetail from "../pages/Student/news/newDetails";
import Bookings from "../pages/Student/bookings/Bookings";
import EWUsage from "../pages/Student/ewUsage/EWUsage";

const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<OTPPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-user" element={<UserList />} />
        <Route path="/manager/requests" element={<RequestManagement />} />
        <Route path="/student/request" element={<Requests />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/news" element={<News></News>} />
        <Route path="/news/view/:id" element={<NewsDetail></NewsDetail>} />
        <Route path="/ResidentHistories" element={<ResidentHistories></ResidentHistories>} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/EWUsage" element={<EWUsage />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/student/Requests" element={<Requests />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default publicRouter;
