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



const getAllSemesters = async (req, res) => {
    try {
        // Gọi model để lấy tất cả các kỳ học
        const { recordset } = await Semester.getAllSemesters();
        
        if (!recordset || recordset.length === 0) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không có kỳ học nào trong hệ thống',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin tất cả kỳ học thành công',
            data: recordset,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lấy thông tin kỳ học thất bại',
            errors: error.message,
        });
    }
};


// Tạo kỳ học mới
const createSemester = async (req, res) => {
    const { semester_name, start_date, end_date, status } = req.body; 
  
    // Kiểm tra dữ liệu đầu vào
    if (!semester_name || !start_date || !end_date || !status) {
      return errorResponse({
        res,
        status: 400,
        message: 'Thiếu thông tin kỳ học',
      });
    }
  
    try {
      // Gọi model để tạo kỳ học mới
      const result = await Semester.createSemester(semester_name, start_date, end_date, status);
  
      if (result === 0) {
        return errorResponse({
          res,
          status: 500,
          message: 'Tạo kỳ học mới thất bại',
        });
      }
  
      return successResponse({
        res,
        message: 'Tạo kỳ học mới thành công',
        data: { semester_name, start_date, end_date, status },
      });
    } catch (error) {
      return errorResponse({
        res,
        status: 500,
        message: 'Lỗi khi tạo kỳ học mới',
        errors: error.message,
      });
    }
  };



  const deleteSemester = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL

    try {
        const result = await Semester.deleteSemester(id);

        if (result === 0) {
            return res.status(404).json({ message: "Semester not found" });
        }

        return res.status(200).json({ message: "Semester deleted successfully" });
    } catch (err) {
        console.error("Error deleting semester:", err);
        return res.status(500).json({ message: "Error deleting semester" });
    }
};
  

// Cập nhật trạng thái kỳ học
const updateSemesterStatus = async (req, res) => {
    const { id } = req.params;  // Lấy ID của kỳ học từ tham số URL
    const { status } = req.body; // Lấy trạng thái mới từ body request

    try {
       
        // Cập nhật trạng thái kỳ học
        const updateResult = await Semester.updateSemesterStatus(id, status);  // Gọi phương thức model để cập nhật trạng thái

        if (updateResult === 0) {
            return errorResponse({
                res,
                status: 400,
                message: "Không thay đổi trạng thái kỳ học",
            });
        }

        return successResponse({
            res,
            message: "Trạng thái kỳ học đã được cập nhật thành công",
            data: { id, status },
        });
    } catch (error) {
        console.error("Error updating semester status:", error);
        return errorResponse({
            res,
            status: 500,
            message: "Lỗi khi cập nhật trạng thái kỳ học",
            errors: error.message,
        });
    }
};



const getNextSemester = async (req, res) => {
    try {
        // Fetch the next semester with status 'Coming' and earliest created_at
        const { recordset } = await Semester.getSemesterByStatusWithEarliestCreatedAt();

        const nextSemester = recordset?.[0]; // Get the first result (smallest created_at)

        if (!nextSemester) {
            return errorResponse({
                res,
                status: 404,
                message: 'Không có kỳ học nào có trạng thái "Coming"',
            });
        }

        return successResponse({
            res,
            message: 'Lấy thông tin kỳ học tiếp theo thành công',
            data: nextSemester,
        });
    } catch (error) {
        return errorResponse({
            res,
            status: 500,
            message: 'Lỗi khi lấy thông tin kỳ học tiếp theo',
            errors: error.message,
        });
    }
};


module.exports = {
    getSemesterActive,
    getAllSemesters,
    createSemester,
    deleteSemester,
    updateSemesterStatus,
    getNextSemester
};
