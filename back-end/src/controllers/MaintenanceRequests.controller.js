const MaintenanceRequest = require('../models/MaintenanceRequest.js'); // Mô hình cho yêu cầu bảo trì
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy tất cả yêu cầu bảo trì
const getAllRequests = async (req, res) => {
    try {
        const result = await MaintenanceRequest.getAllRequests(); // Gọi đúng hàm getAllRequests từ model
        const requests = result.recordset; // Truy xuất dữ liệu từ kết quả truy vấn SQL
        return successResponse({
            res,
            message: 'Lấy yêu cầu bảo trì thành công',
            data: requests,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy yêu cầu bảo trì thất bại',
            errors: error.message,
        });
    }
};


// Tạo yêu cầu bảo trì mới
const createRequest = async (req, res) => {
    try {
        const { room_id, user_id, description, request_type, semester } = req.body;
        const status = 'Pending'; // Trạng thái mặc định
        await MaintenanceRequest.createRequest(room_id, user_id, description, status, request_type, semester);

        return successResponse({
            res,
            message: 'Tạo yêu cầu bảo trì thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Tạo yêu cầu bảo trì thất bại',
            errors: error.message,
        });
    }
};


// Lấy yêu cầu bảo trì theo ID
const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MaintenanceRequest.getRequestById(id);
        const request = result.recordset[0]; // Truy xuất yêu cầu bảo trì đầu tiên (vì truy vấn theo ID chỉ trả về 1 kết quả)

        if (!request) {
            return errorResponse({
                res,
                status: 404,
                message: 'Yêu cầu bảo trì không tồn tại',
            });
        }

        return successResponse({
            res,
            message: 'Lấy yêu cầu bảo trì thành công',
            data: request,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy yêu cầu bảo trì thất bại',
            errors: error.message,
        });
    }
};


// Cập nhật yêu cầu bảo trì
const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        await MaintenanceRequest.updateRequest(id, updates);

        return successResponse({
            res,
            message: 'Cập nhật yêu cầu bảo trì thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Cập nhật yêu cầu bảo trì thất bại',
            errors: error.message,
        });
    }
};


// Xóa yêu cầu bảo trì
const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await MaintenanceRequest.deleteRequest(id);

        return successResponse({
            res,
            message: 'Xóa yêu cầu bảo trì thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Xóa yêu cầu bảo trì thất bại',
            errors: error.message,
        });
    }
};


module.exports = {
    getAllRequests,
    createRequest,
    getRequestById,
    updateRequest,
    deleteRequest,
};
