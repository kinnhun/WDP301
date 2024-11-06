import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";
import UserList from "../pages/Manager/ManageUser/UserList";
import News from "../pages/Student/news/news";
import PaymentHistory from "../pages/Student/paymentHistory/PaymentHistory";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import OTPPage from "../pages/Login/Verify";
import RequestDetail from "../pages/Manager/RequestManagement/RequestDetail";
import RequestManagement from "../pages/Manager/RequestManagement/RequestManagement";
import StaffRequestManagement from "../pages/Staff/RequestManagement/StaffRequestManagement";
import Profile from "../pages/profile/profile";
import Bookings from "../pages/Student/bookings/Bookings";
import Book from "../pages/Student/bookings/CreateBooking";
import EWUsage from "../pages/Student/ewUsage/EWUsage";
import Home from "../pages/Student/home/Home";
import NewsDetail from "../pages/Student/news/newDetails";
import Requests from "../pages/student/requests/Requests";
import ResidentHistories from "../pages/Student/residentHistories/ResidentHistories";
import Report from "../pages/Student/report/Report";
import ReportManager from "../pages/Manager/ReportManagement/ReportManager";
import ManagerHome from "../pages/Manager/Home/Home";
import StaffRequestDetail from "../pages/Staff/RequestManagement/StaffRequestDetail";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<OTPPage />} />

      <Route element={<Layout />}>
        {/* Manager */}
        <Route path="/manager" element={<Navigate to={"/manager/home"} />} />
        <Route path="/manager/manage-users" element={<UserList />} />
        <Route path="/manager/requests" element={<RequestManagement />} />
        <Route path="/manager/request/:id" element={<RequestDetail />} />
        <Route path="/manager/reports" element={<ReportManager />} />
        <Route path="/manager/home" element={<ManagerHome />} />
        {/* student */}
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/requests" element={<Requests />} />
        <Route path="/student/news" element={<News />} />
        <Route path="/student/news/view/:id" element={<NewsDetail />} />
        <Route path="/student/residentHistories" element={<ResidentHistories />} />
        <Route path="/student/bookings" element={<Bookings />} />
        <Route path="/student/booking/create-booking" element={<Book />} />
        <Route path="/student/EWUsage" element={<EWUsage />} />
        <Route path="/student/paymentHistory" element={<PaymentHistory />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/student/reports" element={<Report />} />
        <Route path="/admin/manage-users" element={<UserManagement />} />
        {/* staff */}
        <Route path="/staff" element={<Navigate to={"/staff/home"} />} />
        <Route path="/staff/home" element={<Home />} />
        <Route path="/staff/requests" element={<StaffRequestManagement />} />
        <Route path="/staff/request/:id" element={<StaffRequestDetail />} />
      </Route>

      <Route element={<LayoutAdmin />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
