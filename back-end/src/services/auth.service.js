const User = require("../models/user");

const { createAccessToken } = require("../utils/jwt");
const sendMail = require("../utils/mail");

const sendVerifyEmail = async (email, otp) => {
  await sendMail(
    `${email}`,
    "Xác thực tài khoản",
    `<h2>Mã xác thực của bạn là: <b>${otp}</b> (Có hiệu lực trong 10 phút)</h2>`
  );
};

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10); // Tạo ra số ngẫu nhiên từ 0 đến 9
  }
  return otp;
};

const login = async (email, password) => {
  try {
    const user = await User.getUserByEmail(email);
    if (user.recordset.length === 0) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (user.recordset[0].password !== password) {
      const error = new Error("Wrong password");
      error.status = 401;
      throw error;
    }
    if (user.recordset[0].status === 0) {
      const userId = user.recordset[0].user_id;
      const verifiedUser = await User.checkAccountVerified(userId);
      const otp = generateOTP();
      if (verifiedUser.recordset.length === 0) {
        await User.createUserOtp(user.recordset[0].id, otp);
        await sendVerifyEmail(email, otp);
      } else {
        await User.updateUserOTP(email, otp);
        await sendVerifyEmail(email, otp);
      }
    }

    const accessToken = createAccessToken({
      id: user.recordset[0].user_id,
      username: user.recordset[0].username,
      email: user.recordset[0].email,
      gender: user.recordset[0].gender,
      status: user.recordset[0].status,
      role: user.recordset[0].role_id,
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const loginWithGoogle = async (email) => {
  try {
    
    const user = await User.getUserByEmail(email);
    console.log(user)
    if (user.recordset.length === 0) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    await User.updateUserStatus(email);
    const newUser = await User.getUserByEmail(email);

    const accessToken = createAccessToken({
      id: newUser.recordset[0].user_id,
      username: newUser.recordset[0].username,
      email: newUser.recordset[0].email,
      gender: newUser.recordset[0].gender,
      status: newUser.recordset[0].status,
      role: newUser.recordset[0].role_id,
    });

    return accessToken;
  } catch (error) {
    throw error;
  }
};

const sendOTP = async (email) => {
  try {
    const verifiedUser = await User.checkAccountVerified(email);
    const otp = generateOTP();
    if (verifiedUser.recordset.length === 0) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    await sendVerifyEmail(email, otp);
    await User.updateUserOTP(email, otp);
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (email, otp) => {
  try {
    const user = await User.checkAccountVerified(email);
    const currentTimeUTC = new Date();
    const timezoneOffset = 7;
    const currentTimeGMT7 = new Date(currentTimeUTC.getTime() + timezoneOffset * 60 * 60 * 1000);
    const expiredTime = new Date(user.recordset[0].expired_at);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (user.recordset[0].otp !== otp) {
      const error = new Error("Invalid OTP");
      error.status = 400;
      throw error;
    }

    if (currentTimeGMT7 > expiredTime) {
      const error = new Error("OTP expired");
      error.status = 400;
      throw error;
    }

    await User.updateUserStatus(email);

    const newUser = await User.getUserByEmail(email);

    const accessToken = createAccessToken({
      id: newUser.recordset[0].user_id,
      username: newUser.recordset[0].username,
      email: newUser.recordset[0].email,
      gender: newUser.recordset[0].gender,
      status: newUser.recordset[0].status,
      role: newUser.recordset[0].role_id,
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  verifyUser,
  sendOTP,
  loginWithGoogle,
};
