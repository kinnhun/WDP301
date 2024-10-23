const Room = require('../models/room.js'); // Mô hình cho phòng
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy tất cả phòng
const getAllRooms = async (req, res) => {
    try {
        const result = await Room.getAllRooms();
        const rooms = result.recordset; // Lấy danh sách phòng

        console.log('Danh sách phòng:', rooms); // Kiểm tra dữ liệu ở đây

        return successResponse({
            res,
            message: 'Lấy danh sách phòng thành công',
            data: rooms,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy danh sách phòng thất bại',
            errors: error.message,
        });
    }
};

// Lấy thông tin phòng theo ID
const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Room.getRoomById(id);
        const room = result;

        if (!room) {
            return errorResponse({
                res,
                status: 404,
                message: 'Phòng không tồn tại',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin phòng thành công',
            data: room,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin phòng thất bại',
            errors: error.message,
        });
    }
};

// Tạo phòng mới
const createRoom = async (req, res) => {
    try {
        const { room_number, room_type_id, price, availability_status } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!room_number || !room_type_id || !price || !availability_status) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin cần thiết để tạo phòng',
            });
        }

        await Room.createRoom(room_number, room_type_id, price, availability_status);

        return successResponse({
            res,
            message: 'Tạo phòng mới thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Tạo phòng mới thất bại',
            errors: error.message,
        });
    }
};

// Cập nhật thông tin phòng
const updateRoom = async (req, res) => {
    try {
        const { id } = req.params; // Lấy roomId từ tham số URL
        const { room_number, room_type_id, price, availability_status } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!room_number || !room_type_id || !price || !availability_status) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin cần thiết để cập nhật phòng',
            });
        }

        // Cập nhật thông tin phòng vào cơ sở dữ liệu
        await Room.updateRoom(id, { room_number, room_type_id, price, availability_status });

        return res.status(200).json({
            success: true,
            message: 'Cập nhật phòng thành công',
        });
    } catch (error) {
        console.error('Error updating room:', error);
        return res.status(500).json({
            success: false,
            message: 'Cập nhật phòng thất bại',
            errors: error.message,
        });
    }
};

// Xóa phòng
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await Room.deleteRoom(id);

        return successResponse({
            res,
            message: 'Xóa phòng thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Xóa phòng thất bại',
            errors: error.message,
        });
    }
};


// Lấy danh sách phòng khả dụng
const getAvailableRooms = async (req, res) => {
    try {
        const result = await Room.getAvailableRooms(); // Gọi phương thức từ mô hình
        const availableRooms = result.recordset; // Lấy danh sách phòng khả dụng

        return successResponse({
            res,
            message: 'Lấy danh sách phòng khả dụng thành công',
            data: availableRooms,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy danh sách phòng khả dụng thất bại',
            errors: error.message,
        });
    }
};
module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getAvailableRooms, 
};
