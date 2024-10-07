import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../components/NotFound";
//phần student
import HomeStudent from "../pages/student/HomeStudent";
import News from "../pages/news/News";
import Booking from "../pages/booking/Booking";
import Current_Residence from "../pages/current_residence/Current_Residence";
import Resident_Histories from "../pages/resident_histories/Resident_Histories";
import Payment from "../pages/payment/Payment";
import Payment_History from "../pages/payment_history/Payment_History";
import Request from "../pages/request/Request";
import Response from "../pages/response/Response";
import Dormitory_Rules from "../pages/dormitory_rules/Dormitory_Rules";

import HomeManager from "../pages/manager/HomeManager";
import Layout from "../layouts/Layout";
import Verify from "../pages/OTP/Verify";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AuthRedirectMiddleware from "../middlewares/AuthRedirectMiddleWare";
import RoomManager from "../pages/room_manager/RoomManager";
import ChatBot from "../pages/ChatBot/ChatBot";

const publicRouter = () => {
  return (
    <Routes>
      <Route element={<AuthMiddleware />}>
        <Route element={<Layout />}>
          <Route path="/manager">
            <Route index element={<HomeManager />} />
            <Route path="rooms" element={<RoomManager />} />
          </Route>
          <Route path="/student">
            <Route index element={<HomeStudent />} />
            <Route path="news" element={<News />} />
            <Route path="booking" element={<Booking />} />
            <Route path="current_residence" element={<Current_Residence />} />
            <Route path="resident_histories" element={<Resident_Histories />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment_history" element={<Payment_History />} />
            <Route path="request" element={<Request />} />
            <Route path="response" element={<Response />} />
            <Route path="dormitory_rules" element={<Dormitory_Rules />} />
          </Route>
          <Route path="/chatbot" element={<ChatBot />} />
        </Route>
      </Route>

      <Route element={<AuthRedirectMiddleware />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/verify" element={<Verify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default publicRouter;
