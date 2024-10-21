import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../utils/axios";
import { verifyAccessToken } from "../../utils/jwt";

const OTPPage = () => {
  const [otp, setOtp] = useState();
  const [seconds, setSeconds] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn nút Clear All
  const handleClearAll = () => {
    setOtp(""); // Xóa toàn bộ giá trị OTP
  };

  // Hàm xử lý khi nhấn nút Submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("token"));
      const user = verifyAccessToken(token);
      if (!user) {
        console.log("User not found");
        toast.error("User not found");
      }
      const data = {
        id: user.id,
        email: user.email,
        otp: otp,
      };
      setIsLoading(true);
      const response = await axios.post("/auth/verify", data);
      toast.success("Xác thực thành công");
      if (response.data.success) {
        const token = response.data.data;
        localStorage.setItem("token", JSON.stringify(token));
        setIsLoading(false);
        navigate("/student");
        return;
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);

      toast.error("Xác thực thất bại");
    }
  };

  // Hàm xử lý khi nhấn nút Resend
  const handleResend = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = verifyAccessToken(token);
      if (!user) {
        console.error("User not found");
      }
      const data = {
        id: user.id,
        email: user.email,
      };
      const response = await axios.post("/auth/otp", data);
      if (response.data.success) {
        setSeconds(10);
        toast.success("Gửi mã OTP thành công");
        return;
      }
    } catch (e) {
      console.error(e);
      toast.error("Gửi mã OTP thất bại");
    }
  };

  // Hàm xử lý khi nhấn nút Back
  const handleBack = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>Nhập OTP</h2>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
        placeholder="Nhập mã OTP"
        style={{
          width: "200px",
          padding: "10px",
          fontSize: "1.5rem",
          textAlign: "center",
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={handleClearAll}>Clear All</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleResend}>Resend</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default OTPPage;
