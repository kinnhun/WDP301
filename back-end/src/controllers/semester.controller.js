const Semester = require('../models/semester.js'); // Model for the Semester table
const { successResponse, errorResponse } = require('../utils/response.js');

// Lấy thông tin kỳ học hiện tại đang active
const getSemesterActive = async (req, res) => {
    try {
        // Gọi model để lấy kỳ học có trạng thái 'Active'
        const { recordset } = await Semester.getSemesterByStatus('Active');
        const semester = recordset?.[0]; // Truy xuất kỳ học đầu tiên (chỉ một kỳ học active)

        if (!semester) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không có kỳ học nào đang active',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin kỳ học active thành công',
            data: semester,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin kỳ học active thất bại',
            errors: error.message,
        });
    }
};

module.exports = {
    getSemesterActive,
};
