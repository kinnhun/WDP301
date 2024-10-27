const express = require("express");
const bookingController = require("../controllers/booking");
const bookingRouter = express.Router();

// Lấy tất cả booking
bookingRouter.get("/", bookingController.getAllBookings);

// Tạo booking mới
bookingRouter.post("/create", bookingController.createBooking);

// Lấy booking theo ID
bookingRouter.get("/:id", bookingController.getBookingById);

// Cập nhật booking
bookingRouter.put("/:id", bookingController.updateBooking);

// Xóa booking
bookingRouter.delete("/:id", bookingController.deleteBooking);

// Lấy booking theo user ID
bookingRouter.get("/user/:userId", bookingController.getBookingsByUserId);


module.exports = bookingRouter;
