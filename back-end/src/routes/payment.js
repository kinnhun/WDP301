const express = require("express");
const paymentController = require("../controllers/payment");
const paymentRouter = express.Router();

// lấy lịch sử thanh toán theo user
paymentRouter.get("/history/:userId", paymentController.paymentHistory);



module.exports = paymentRouter;
