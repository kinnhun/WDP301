const ReportService = require("../services/report.service.js");
const { successResponse, errorResponse } = require("../utils/response.js");

// Lấy tất cả báo cáo
// Lấy tất cả báo cáo
const getAllReports = async (req, res) => {
  try {
      const reports = await ReportService.getAllReports();
      // Chỉ lấy thông tin cần thiết
      const formattedReports = reports.map(report => ({
          user_room_id: report.user_room_id, // Thêm trường user_room_id
          room_number: report.room_number,
          content: report.content,
          report_status: report.report_status,
          reply: report.reply,
          created_at: report.created_at, // Thêm trường created_at
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
const createReport = async (req, res) => {
  try {
    const { room_number, user_id, content, report_status = "Pending", reply = null } = req.body;

    console.log("Request body for creating report:", req.body);

    if (!room_number || !user_id || !content) {
      return errorResponse({
        res,
        status: 400,
        message: "Thiếu các trường bắt buộc: room_number, user_id, content",
      });
    }

    // Đảm bảo rằng roomId được lấy từ room_number mà người dùng nhập vào
    const newReport = await ReportService.createReport(room_number, user_id, content, report_status, reply);
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
  const { userId } = req.params;

  try {
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

// Lấy báo cáo theo ID
const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await ReportService.getReportById(id);
    if (!report) {
      return errorResponse({
        res,
        status: 404,
        message: "Báo cáo không tìm thấy",
      });
    }
    return successResponse({
      res,
      message: "Lấy báo cáo theo ID thành công",
      data: report,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy báo cáo theo ID thất bại",
      errors: error.message,
    });
  }
};

// Cập nhật báo cáo
const updateReport = async (req, res) => {
  const { id } = req.params;
  const { report_status, reply } = req.body;

  try {
    const updated = await ReportService.updateReport(report_status, reply, id);
    if (!updated) {
      return errorResponse({
        res,
        status: 404,
        message: "Báo cáo không tìm thấy để cập nhật",
      });
    }
    return successResponse({
      res,
      message: "Cập nhật báo cáo thành công",
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
  const { id } = req.params;

  try {
    const deleted = await ReportService.deleteReport(id);
    if (!deleted) {
      return errorResponse({
        res,
        status: 404,
        message: "Báo cáo không tìm thấy để xóa",
      });
    }
    return successResponse({
      res,
      message: "Xóa báo cáo thành công",
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

module.exports = {
  getAllReports,
  createReport,
  getReportsByUserId,
  getReportById,
  updateReport,
  deleteReport,
}