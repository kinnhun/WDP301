import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";
import Verify from "../pages/Login/Verify";
import UserList from "../pages/Manager/ManageUser/UserList";
import Bookings from "../pages/pageStudent/bookings/Bookings";
import EWUsage from "../pages/pageStudent/EWUsage/EWUsage";
import Home from "../pages/pageStudent/home/Home";
import News from "../pages/pageStudent/news/news";
import PaymentHistory from "../pages/pageStudent/paymentHistory/PaymentHistory";
import Requests from "../pages/pageStudent/requests/Requests";
import ResidentHistories from "../pages/pageStudent/residentHistories/ResidentHistories";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/manager/manage-user" element={<UserList />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
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
