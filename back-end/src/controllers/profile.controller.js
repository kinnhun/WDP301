const UserProfile = require('../models/profile.model.js'); // Mô hình cho thông tin người dùng
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const result = await UserProfile.getAllUsers();
        const users = result.recordset; // Lấy danh sách người dùng

        console.log('Danh sách người dùng:', users); // Kiểm tra dữ liệu ở đây

        return successResponse({
            res,
            message: 'Lấy danh sách người dùng thành công',
            data: users,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy danh sách người dùng thất bại',
            errors: error.message,
        });
    }
};


// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UserProfile.getUserById(id);
        const user = result;

        if (!user) {
            return errorResponse({
                res,
                status: 404,
                message: 'Người dùng không tồn tại',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin người dùng thành công',
            data: user,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin người dùng thất bại',
            errors: error.message,
        });
    }
};

// Tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const { username, password, email, role_id } = req.body;
        await UserProfile.createUser(username, password, email, role_id);

        return successResponse({
            res,
            message: 'Tạo người dùng mới thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Tạo người dùng mới thất bại',
            errors: error.message,
        });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        await UserProfile.updateUser(id, updates);

        return successResponse({
            res,
            message: 'Cập nhật thông tin người dùng thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Cập nhật thông tin người dùng thất bại',
            errors: error.message,
        });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserProfile.deleteUser(id);

        return successResponse({
            res,
            message: 'Xóa người dùng thành công',
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Xóa người dùng thất bại',
            errors: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
