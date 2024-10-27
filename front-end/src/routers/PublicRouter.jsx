import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";

import UserList from "../pages/Manager/ManageUser/UserList";

import News from "../pages/Student/news/news";
import PaymentHistory from "../pages/Student/paymentHistory/PaymentHistory";

import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import OTPPage from "../pages/Login/Verify";
import RequestManagement from "../pages/Manager/RequestManagement/RequestManagement";
import Profile from "../pages/profile/profile";
import Bookings from "../pages/Student/bookings/Bookings";
import Book from "../pages/Student/bookings/CreateBooking";
import EWUsage from "../pages/Student/ewUsage/EWUsage";
import Home from "../pages/Student/home/Home";
import NewsDetail from "../pages/Student/news/newDetails";
import Requests from "../pages/student/requests/Requests";
import ResidentHistories from "../pages/Student/residentHistories/ResidentHistories";
import RequestDetail from "../pages/Manager/RequestManagement/RequestDetail";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";

const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<OTPPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-users" element={<UserList />} />
        <Route path="/manager/requests" element={<RequestManagement />} />
        <Route path="/manager/requests/:id" element={<RequestDetail />} />
        <Route path="/admin/manage-users" element={<UserManagement />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/requests" element={<Requests />} />
        <Route path="/student/news" element={<News></News>} />
        <Route path="/student/news/view/:id" element={<NewsDetail></NewsDetail>} />
        <Route
          path="/student/residentHistories"
          element={<ResidentHistories></ResidentHistories>}
        />
        <Route path="/student/bookings" element={<Bookings />} />
        <Route path="/student/booking/create-booking" element={<Book />} />
        <Route path="/student/EWUsage" element={<EWUsage />} />
        <Route path="/student/paymentHistory" element={<PaymentHistory />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route element={<LayoutAdmin />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default publicRouter;
