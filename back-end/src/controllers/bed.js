const Bed = require('../models/Bed.js'); // Mô hình cho bảng Beds
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy tất cả giường
const getAllBeds = async (req, res) => {
    try {
        const result = await Bed.getAllBeds(); // Gọi model để lấy tất cả giường
        const beds = result.recordset;

        if (beds.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy giường nào',
            });
        }

        return successResponse({
            res,
            message: 'Lấy tất cả giường thành công',
            data: beds,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy giường thất bại',
            errors: error.message,
        });
    }
};

// Lấy giường theo ID
const getBedById = async (req, res) => {
    try {
        const { bed_id } = req.params; // Lấy bed_id từ URL
        const result = await Bed.getBedById(bed_id); // Gọi model để lấy giường theo ID
        const bed = result.recordset[0];

        if (!bed) {
            return errorResponse({
                res,
                status: 404,
                message: 'Giường không tồn tại',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin giường thành công',
            data: bed,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin giường thất bại',
            errors: error.message,
        });
    }
};

// Tạo giường mới
const createBed = async (req, res) => {
    try {
        const { room_id, bed_number, availability_status } = req.body; // Lấy thông tin từ body request

        if (!room_id || !bed_number || !availability_status) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin cần thiết để tạo giường',
            });
        }

        await Bed.createBed(room_id, bed_number, availability_status); // Gọi model để tạo giường mới

        return successResponse({
            res,
            status: 201,
            message: 'Tạo giường thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Tạo giường thất bại',
            errors: error.message,
        });
    }
};

// Cập nhật giường
const updateBed = async (req, res) => {
    try {
        const { bed_id } = req.params; // Lấy bed_id từ URL
        const updates = req.body; // Lấy dữ liệu cập nhật từ body request

        await Bed.updateBed(bed_id, updates); // Gọi model để cập nhật giường

        return successResponse({
            res,
            message: 'Cập nhật giường thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Cập nhật giường thất bại',
            errors: error.message,
        });
    }
};

// Xóa giường
const deleteBed = async (req, res) => {
    try {
        const { bed_id } = req.params; // Lấy bed_id từ URL

        await Bed.deleteBed(bed_id); // Gọi model để xóa giường

        return successResponse({
            res,
            message: 'Xóa giường thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Xóa giường thất bại',
            errors: error.message,
        });
    }
};

module.exports = {
    getAllBeds,
    getBedById,
    createBed,
    updateBed,
    deleteBed,
};
