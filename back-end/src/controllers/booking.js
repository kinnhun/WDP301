const Booking = require('../models/Booking.js'); // Mô hình cho bảng Booking
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy tất cả booking của một user dựa vào user_id
const getUserBookings = async (req, res) => {
    try {
        const { user_id } = req.params; // Lấy user_id từ tham số URL

        // Gọi model để lấy tất cả booking của user dựa trên user_id
        const result = await Booking.getBookingsByUserId(user_id);
        const bookings = result.recordset; // Truy xuất danh sách booking từ kết quả truy vấn SQL

        if (bookings.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Người dùng không có booking nào',
            });
        }

        return successResponse({
            res,
            message: 'Lấy booking thành công',
            data: bookings,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy booking thất bại',
            errors: error.message,
        });
    }
};



const createBooking = async (req, res) => {
    try {
        const { room_id, user_id, start_date, end_date, total_amount, payment_status, booking_status, bed_id, semester_name } = req.body;

        // Kiểm tra dữ liệu đầu vào
        const missingFields = [];
        if (!room_id) missingFields.push('room_id');
        if (!user_id) missingFields.push('user_id');
        if (!start_date) missingFields.push('start_date');
        if (!end_date) missingFields.push('end_date');
        if (!total_amount) missingFields.push('total_amount');
        if (!payment_status) missingFields.push('payment_status');
        if (!booking_status) missingFields.push('booking_status');
        if (!bed_id) missingFields.push('bed_id');
        if (!semester_name) missingFields.push('semester_name');

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin cần thiết để tạo booking',
                missingFields: missingFields,
            });
        }

        // Gọi model để tạo booking mới
        await Booking.createBooking(room_id, user_id, start_date, end_date, total_amount, payment_status, booking_status, bed_id, semester_name);


        await Booking.updateBedStatus(bed_id, 'Occupied');


        return res.status(201).json({
            success: true,
            message: 'Tạo booking thành công',
        });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Tạo booking thất bại',
            errors: error.message,
        });
    }
};


// Lấy chi tiết booking theo ID
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy booking ID từ tham số URL
        const result = await Booking.getBookingById(id);
        const booking = result.recordset[0]; // Truy xuất booking đầu tiên (vì tìm theo ID chỉ trả về 1 kết quả)

        if (!booking) {
            return errorResponse({
                res,
                status: 404,
                message: 'Booking không tồn tại',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin booking thành công',
            data: booking,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin booking thất bại',
            errors: error.message,
        });
    }
};

// Cập nhật booking theo ID
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params; // Lấy booking ID từ tham số URL
        const updates = req.body; // Dữ liệu cập nhật từ body request

        // Gọi model để cập nhật booking
        await Booking.updateBooking(id, updates);

        return successResponse({
            res,
            message: 'Cập nhật booking thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Cập nhật booking thất bại',
            errors: error.message,
        });
    }
};

// Xóa booking theo ID
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params; // Lấy booking ID từ tham số URL

        // Gọi model để xóa booking theo ID
        await Booking.deleteBooking(id);

        return successResponse({
            res,
            message: 'Xóa booking thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Xóa booking thất bại',
            errors: error.message,
        });
    }
};

// Hàm mới để lấy tất cả booking của một user dựa vào user_id
const getBookingsByUserId = async (req, res) => {
    try {
        // Lấy userId từ tham số URL và chuyển đổi sang kiểu số nguyên
        const { userId } = req.params; // Sử dụng userId thay vì user_id
        console.log(`userId received: "${userId}"`); // In giá trị của userId
        const userIdInt = parseInt(userId, 10);

        // Kiểm tra nếu userIdInt không phải là một số hợp lệ
        if (isNaN(userIdInt)) {
            return errorResponse({
                res,
                status: 400,
                message: 'user_id không hợp lệ',
            });
        }

        // Gọi model để lấy tất cả booking của user
        const result = await Booking.getBookingsByUserId(userIdInt);
        const bookings = result.recordset; // Truy xuất danh sách booking từ kết quả truy vấn SQL

        if (bookings.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy booking cho người dùng này',
            });
        }

        return successResponse({
            res,
            message: 'Lấy booking thành công',
            data: bookings,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy booking thất bại',
            errors: error.message,
        });
    }
};



const getAllBookings = async (req, res) => {
    try {
        // Gọi model để lấy tất cả booking
        const result = await Booking.getAllBookings();
        const bookings = result.recordset; // Truy xuất danh sách booking từ kết quả truy vấn SQL

        if (bookings.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy booking nào',
            });
        }

        return successResponse({
            res,
            message: 'Lấy tất cả booking thành công',
            data: bookings,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy booking thất bại',
            errors: error.message,
        });
    }
};

// Function to get bookings by status name
const getBookingStatus = async (req, res) => {
    try {
        const { statusName } = req.params; // Get the status name from the URL parameters

        // Validate the statusName parameter
        if (!statusName) {
            return errorResponse({
                res,
                status: 400,
                message: 'Trạng thái không được cung cấp',
            });
        }

        // Call model function to get bookings by status
        const result = await Booking.getBookingsByStatus(statusName);
        const bookings = result.recordset; // Extract the recordset from the SQL query result

        if (bookings.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy booking nào với trạng thái này',
            });
        }

        return successResponse({
            res,
            message: 'Lấy booking theo trạng thái thành công',
            data: bookings,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy booking thất bại',
            errors: error.message,
        });
    }
};
const updateBookingStatus = async (req, res) => {
    try {
        const { id, statusName } = req.params; // Get booking ID and new status from the request parameters

        // Validate that statusName is provided
        if (!statusName) {
            return errorResponse({
                res,
                status: 400,
                message: 'Trạng thái không được cung cấp',
            });
        }

        // Call the model to update the booking status
        await Booking.updateBookingStatus(id, statusName);

        return successResponse({
            res,
            message: 'Cập nhật trạng thái booking thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Cập nhật trạng thái booking thất bại',
            errors: error.message,
        });
    }
};



const bulkUpdateBookingStatus = async (req, res) => {
    try {
        const { bookingIds, newStatus } = req.body; // Extract booking IDs and new status from request body

        // Validate input
        if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
            return errorResponse({
                res,
                status: 400,
                message: 'No booking IDs provided.',
            });
        }
        if (!newStatus) {
            return errorResponse({
                res,
                status: 400,
                message: 'No status provided.',
            });
        }

        console.log("New Status:", newStatus);
        console.log("Booking IDs:", bookingIds);

        // Call model function to update statuses
        const result = await Booking.updateMultipleStatuses(bookingIds, newStatus);

        return successResponse({
            res,
            message: 'Booking statuses updated successfully.',
            data: result,
        });
    } catch (error) {
        console.error('Error updating booking statuses:', error.message);
        return errorResponse({
            res,
            status: 500,
            message: 'Failed to update booking statuses.',
            errors: error.message,
        });
    }
};


// Lấy booking mới nhất bởi user_id
const getLatestBookingById = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy user_id từ tham số URL

        // Kiểm tra nếu userId không được cung cấp hoặc không hợp lệ
        if (!userId || isNaN(parseInt(userId, 10))) {
            return errorResponse({
                res,
                status: 400,
                message: 'user_id không hợp lệ',
            });
        }

        // Gọi model để lấy booking mới nhất theo user_id
        const result = await Booking.getLatestBookingByUserId(userId);
        const latestBooking = result.recordset[0]; // Lấy booking đầu tiên (mới nhất)

        if (!latestBooking) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy booking nào cho người dùng này',
            });
        }

        return successResponse({
            res,
            message: 'Lấy booking mới nhất thành công',
            data: latestBooking,
        });
    } catch (error) {
        console.error('Error fetching latest booking:', error.message);
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy booking mới nhất thất bại',
            errors: error.message,
        });
    }
};


const createBookingByLatest = async (req, res) => {
    try {
        const { booking_id, start_date, end_date, semester } = req.body; // Retrieve input data from request body

        // Validate required fields
        if (!booking_id || !start_date || !end_date || !semester) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: booking_id, start_date, end_date, semester',
            });
        }

        // Call the model method to create a new booking
        const result = await Booking.createBookingByLatest(booking_id, start_date, end_date, semester);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'No booking found with the specified booking_id',
            });
        }

        return res.status(201).json({
            success: true,
            message: 'New booking created successfully',
        });
    } catch (error) {
        console.error('Error creating booking by latest:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to create booking by latest',
            errors: error.message,
        });
    }
};


module.exports = {
    getUserBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getAllBookings,
    getBookingStatus,
    updateBookingStatus,
    bulkUpdateBookingStatus,
    getLatestBookingById,
    createBookingByLatest
};
