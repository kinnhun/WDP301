import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Bookings from "../pages/bookings/Bookings";
import EWUsage from "../pages/EWUsage/EWUsage";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import UserList from "../pages/Manager/ManageUser/UserList";
import News from "../pages/news/news";
import PaymentHistory from "../pages/paymentHistory/PaymentHistory";
import Requests from "../pages/requests/Requests";
import ResidentHistories from "../pages/residentHistories/ResidentHistories";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-user" element={<UserList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News></News>} />
        <Route path="/ResidentHistories" element={<ResidentHistories></ResidentHistories>} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/EWUsage" element={<EWUsage />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/Requests" element={<Requests />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
