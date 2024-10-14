import { Navigate, Route, Routes } from "react-router-dom";
import Bookings from "../pages/bookings/Bookings";
import EWUsage from "../pages/EWUsage/EWUsage";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/profile";
import Login from "../pages/login/Login";
import News from "../pages/news/news";
import PaymentHistory from "../pages/paymentHistory/PaymentHistory";
import Report from "../pages/report/Report";
import Requests from "../pages/requests/Requests";
import ResidentHistories from "../pages/residentHistories/ResidentHistories";


const publicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/news" element={<News></News>} />
      <Route path="/ResidentHistories" element={<ResidentHistories></ResidentHistories>} />
      <Route path="/Bookings" element={<Bookings />} />
      <Route path="/EWUsage" element={<EWUsage />} />
      <Route path="/PaymentHistory" element={<PaymentHistory />} />
      <Route path="/Requests" element={<Requests />} />
      <Route path="/Report" element={<Report />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} /> */}
    </Routes>
  );
};

export default publicRouter;
