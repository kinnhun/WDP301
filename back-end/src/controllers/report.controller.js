const ReportService = require("../services/report.service.js");
const { successResponse, errorResponse } = require("../utils/response.js");

// Lấy tất cả báo cáo
const getAllReports = async (req, res) => {
  try {
    const reports = await ReportService.getAllReports();
    // Chỉ lấy thông tin cần thiết
    const formattedReports = reports.map((report) => ({
      report_id: report.report_id,
      room_number: report.room_number,
      content: report.content,
      report_status: report.report_status,
      reply: report.reply,
      created_at: report.created_at,
    }));

    return successResponse({
      res,
      message: "Lấy báo cáo thành công",
      data: formattedReports,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy báo cáo thất bại",
      errors: error.message,
    });
  }
};

// Tạo báo cáo mới
// const createReport = async (req, res) => {
//   try {
//     const { room_number, user_id, content, report_status = "Pending", reply = null } = req.body;

//     console.log("Request body for creating report:", req.body);

//     if (!room_number || !user_id || !content) {
//       return errorResponse({
//         res,
//         status: 400,
//         message: "Thiếu các trường bắt buộc: room_number, user_id, content",
//       });
//     }

//     const newReport = await ReportService.createReport(room_number, user_id, content, report_status, reply);
//     return successResponse({
//       res,
//       status: 201,
//       message: "Tạo báo cáo thành công",
//       data: newReport,
//     });
//   } catch (error) {
//     console.error("Error creating report:", error);
//     return errorResponse({
//       res,
//       status: 500,
//       message: "Tạo báo cáo thất bại",
//       errors: error.message,
//     });
//   }
// };

const createReport = async (req, res) => {
  try {
    const {
      room_number,
      user_id,
      content,
      report_status = "Pending",
      reply = null,
      assigned_staff_id,
    } = req.body;

    if (!room_number || !user_id || !content) {
      return errorResponse({
        res,
        status: 400,
        message: "Thiếu các trường bắt buộc: room_number, user_id, content",
      });
    }

    const newReport = await ReportService.createReport(
      room_number,
      user_id,
      content,
      report_status,
      reply,
      assigned_staff_id
    );
    return successResponse({
      res,
      status: 201,
      message: "Tạo báo cáo thành công",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return errorResponse({
      res,
      status: 500,
      message: "Tạo báo cáo thất bại",
      errors: error.message,
    });
  }
};

// Lấy báo cáo theo user_id
const getReportsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const reports = await ReportService.getReportsByUserId(userId);
    return successResponse({
      res,
      message: "Lấy báo cáo theo user_id thành công",
      data: reports,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy báo cáo theo user_id thất bại",
      errors: error.message,
    });
  }
};

// Cập nhật báo cáo
// const updateReport = async (req, res) => {
//   try {
//     const { report_id } = req.params;
//     const { report_status, reply, assigned_staff_id } = req.body;

//     const updateMessage = await ReportService.updateReport(report_id, report_status, reply, assigned_staff_id);
//     return successResponse({
//       res,
//       message: updateMessage,
//     });
//   } catch (error) {
//     return errorResponse({
//       res,
//       status: 500,
//       message: "Cập nhật báo cáo thất bại",
//       errors: error.message,
//     });
//   }
// };

const updateReport = async (req, res) => {
  try {
    // Lấy report_id từ tham số URL
    const { id } = req.params;

    // Lấy assigned_staff_id từ body
    const { assigned_staff_id } = req.body;

    console.log('Request body:', req.body);
    console.log('Request params:', req.params);
    console.log('Assigned staff ID:', assigned_staff_id);
    console.log('Report ID:', id);

    // Chỉ cập nhật assigned_staff_id
    const updateMessage = await ReportService.updateReport(id, assigned_staff_id);

    return successResponse({
      res,
      message: updateMessage,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Cập nhật báo cáo thất bại",
      errors: error.message,
    });
  }
};


// Xóa báo cáo
const deleteReport = async (req, res) => {
  try {
    const { report_id } = req.params;

    const deleteMessage = await ReportService.deleteReport(report_id);
    return successResponse({
      res,
      message: deleteMessage,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Xóa báo cáo thất bại",
      errors: error.message,
    });
  }
};
const getReportById = async (req, res) => {
  try {
    const { report_id } = req.params; // Lấy report_id từ tham số của yêu cầu

    const report = await ReportService.getReportById(report_id); // Gọi service để lấy báo cáo
    if (!report) {
      return errorResponse({
        res,
        status: 404,
        message: "Báo cáo không tồn tại",
      });
    }

    return successResponse({
      res,
      message: "Lấy báo cáo thành công",
      data: report,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy báo cáo thất bại",
      errors: error.message,
    });
  }
};

const getReportsByStaffId = async (req, res) => {
  try {
      const { staffId } = req.params;
      console.log("reqparam:", req.params);
      console.log("staffId:", staffId);

      const reports = await ReportService.getReportsByStaffId(staffId);

      if (!reports || reports.length === 0) {
          console.log("No reports found for staff ID:", staffId);
          return successResponse({
              res,
              message: "Không tìm thấy báo cáo cho staff_id này",
              data: [] // Trả về mảng rỗng nếu không có báo cáo
          });
      }

      return successResponse({
          res,
          message: "Lấy báo cáo theo staff_id thành công",
          data: reports,
      });
  } catch (error) {
      console.error("Error fetching reports:", error);
      return errorResponse({
          res,
          status: 500,
          message: "Lấy báo cáo theo staff_id thất bại",
          errors: error.message,
      });
  }
};
const updateReportReplyAndStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { reply, status } = req.body;

    const result = await ReportService.updateReportReplyAndStatus(reportId, reply, status);
    return successResponse({
      res,
      message: "Cập nhật reply và status cho báo cáo thành công",
      data: result,
    });
  } catch (error) {
    console.error("Error updating report reply and status:", error);
    return errorResponse({
      res,
      status: 500,
      message: "Cập nhật reply và status cho báo cáo thất bại",
      errors: error.message,
    });
  }
};


// Xuất các hàm điều khiển
module.exports = {
  getAllReports,
  createReport,
  getReportsByUserId,
  updateReport,
  deleteReport,
  getReportById,
  getReportsByStaffId
  ,updateReportReplyAndStatus
};
