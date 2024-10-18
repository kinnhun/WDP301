const UserProfile = require('../models/profile.js'); // Mô hình cho thông tin người dùng
const { successResponse, errorResponse } = require('../utils/response.js');
const bcrypt = require('bcrypt'); // Nhập khẩu bcrypt

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
        const { id } = req.params; // Lấy userId từ tham số URL
        const { old_password, new_password } = req.body; // Lấy mật khẩu cũ và mới từ request body

        // Kiểm tra xem có thông tin nào cần thiết không
        if (!old_password || !new_password) {
            return res.status(400).json({
                success: false,
                message: 'Old password and new password are required.',
            });
        }

        // Tìm người dùng theo ID
        const user = await UserProfile.getUserById(id); // Thay thế hàm này bằng hàm lấy người dùng theo ID của bạn
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Kiểm tra mật khẩu cũ có đúng không
        const isMatch = await bcrypt.compare(old_password, user.password); // Sử dụng bcrypt để kiểm tra mật khẩu
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect.',
            });
        }

        // Mã hóa mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        // Cập nhật mật khẩu mới vào cơ sở dữ liệu
        await UserProfile.updateUser(id, { password: hashedNewPassword }); // Cập nhật hàm này

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully!',
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to change password',
            errors: error.message,
        });
    }
}


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
