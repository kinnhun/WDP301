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


//lấy booking theo [booking_status]
bookingRouter.get("/booking-status/:statusName", bookingController.getBookingStatus);

//update booking status
bookingRouter.put("/booking-status/:id/:statusName", bookingController.updateBookingStatus);

// New route for bulk updating booking statuses
bookingRouter.put("/bulk-status/bulk", bookingController.bulkUpdateBookingStatus);



module.exports = bookingRouter;
