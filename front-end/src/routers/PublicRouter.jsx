import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import Login from "../pages/Login/Login";
import OTPPage from "../pages/Login/Verify";
import ManagerSemester from "../pages/Manager/ManagerSemester/ManagerSemester";
import UserList from "../pages/Manager/ManageUser/UserList";
import RequestDetail from "../pages/Manager/RequestManagement/RequestDetail";
import RequestManagement from "../pages/Manager/RequestManagement/RequestManagement";
import Profile from "../pages/profile/profile";
import StaffRequestManagement from "../pages/Staff/RequestManagement/StaffRequestManagement";
import Bookings from "../pages/Student/bookings/Bookings";
import Book from "../pages/Student/bookings/CreateBooking";
import EWUsage from "../pages/Student/ewUsage/EWUsage";
import Home from "../pages/Student/home/Home";
import NewsDetail from "../pages/Student/news/newDetails";
import News from "../pages/Student/news/news";
import PaymentHistory from "../pages/Student/paymentHistory/PaymentHistory";
import Requests from "../pages/student/requests/Requests";
import ResidentHistories from "../pages/Student/residentHistories/ResidentHistories";

import AdminNew from "../pages/Student/news/AdminNew";

import ManagerHome from "../pages/Manager/Home/Home";
import ReportManager from "../pages/Manager/ReportManagement/ReportManager";
import StaffRequestDetail from "../pages/Staff/RequestManagement/StaffRequestDetail";
import Report from "../pages/Student/report/Report";

import CreateInvoice from "../pages/Admin/InvoiceManagement/CreateInvoice";
import InvoiceManagement from "../pages/Admin/InvoiceManagement/InvoiceManagement";
import BookingManager from "../pages/Manager/ManagerBooking/BookingManager";

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
        <Route path="/manager/request/:id" element={<RequestDetail />} />
        <Route path="/manager/reports" element={<ReportManager />} />
        <Route path="/manager/home" element={<ManagerHome />} />

        {/* student */}
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
        <Route path="/student/reports" element={<Report />} />
        {/* staff */}
        <Route path="/staff" element={<Navigate to={"/staff/home"} />} />
        <Route path="/staff/home" element={<Home />} />
        <Route path="/staff/requests" element={<StaffRequestManagement />} />
        <Route path="/staff/request/:id" element={<StaffRequestDetail />} />
      </Route>

      <Route element={<LayoutAdmin />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/manage-users" element={<UserManagement />} />
        <Route path="/admin/new" element={<AdminNew />} />

        <Route path="/admin/manager-booking" element={<BookingManager />} />
        <Route path="/admin/manage-users" element={<UserList />} />
        <Route path="/admin/requests" element={<RequestManagement />} />
        <Route path="/admin/request/:id" element={<RequestDetail />} />
        <Route path="/admin/reports" element={<ReportManager />} />
        <Route path="/admin/home" element={<Dashboard />} />
        <Route path="/admin/semester" element={<ManagerSemester />} />
        <Route path="/admin/invoices" element={<InvoiceManagement />} />
        <Route path="/admin/invoices/create" element={<CreateInvoice />} />
      </Route>
    </Routes>
  );
};

export default publicRouter;
