import React, { useState } from "react";

const OTPPage = () => {
  const [otp, setOtp] = useState("");

  // Hàm xử lý khi nhấn nút Clear All
  const handleClearAll = () => {
    setOtp(""); // Xóa toàn bộ giá trị OTP
  };

  // Hàm xử lý khi nhấn nút Submit
  const handleSubmit = () => {
    if (otp.length === 6) {
      alert(`OTP Submitted: ${otp}`);
    } else {
      alert("Vui lòng nhập đầy đủ mã OTP (6 ký tự)");
    }
  };

  // Hàm xử lý khi nhấn nút Resend
  const handleResend = () => {
    alert("OTP Resent");
  };

  // Hàm xử lý khi nhấn nút Back
  const handleBack = () => {
    alert("Go Back");
  };

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
