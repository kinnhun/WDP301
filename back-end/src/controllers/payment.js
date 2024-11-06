const { successResponse, errorResponse } = require('../utils/response.js');
const Payment = require('../models/payment.js'); 

// Lấy lịch sử thanh toán của người dùng
const paymentHistory = async (req, res) => {
    try {
        const { userId } = req.params; 

        const result = await Payment.getPaymentById(userId);
        
        if (!result || result.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không tìm thấy lịch sử thanh toán cho người dùng này',
            });
        }

        return successResponse({
            res,
            message: 'Lấy lịch sử thanh toán thành công',
            data: result,
        });
    } catch (error) {
        console.error('Lỗi khi lấy lịch sử thanh toán:', error.message); 
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy lịch sử thanh toán thất bại',
            errors: error.message,
        });
    }
};

module.exports = {
    paymentHistory,
};
