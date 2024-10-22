import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";

import UserList from "../pages/Manager/ManageUser/UserList";

import News from "../pages/Student/news/news";
import PaymentHistory from "../pages/Student/paymentHistory/PaymentHistory";

import OTPPage from "../pages/Login/Verify";
import RequestManagement from "../pages/Manager/RequestManagement/RequestManagement";
import Profile from "../pages/profile/profile";
import Book from "../pages/Student/bookings/Book";
import Bookings from "../pages/Student/bookings/Bookings";
import EWUsage from "../pages/Student/ewUsage/EWUsage";
import Home from "../pages/Student/home/Home";
import NewsDetail from "../pages/Student/news/newDetails";
import Requests from "../pages/student/requests/Requests";
import ResidentHistories from "../pages/Student/residentHistories/ResidentHistories";

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
        <Route path="/student/booking/book" element={<Book />} />
        <Route path="/student/EWUsage" element={<EWUsage />} />
        <Route path="/student/paymentHistory" element={<PaymentHistory />} />
        <Route path="/profile/:id" element={<Profile />} />

      </Route>
    </Routes>
  );
};

export default publicRouter;
