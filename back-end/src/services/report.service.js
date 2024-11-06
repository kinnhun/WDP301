const Report = require("../models/report");

module.exports = {
  getAllReports: async () => {
    try {
      const reports = await Report.getAllReports();
      return reports.recordsets[0];
    } catch (error) {
      console.error("Error in getAllReports service:", error);
      throw new Error("Lỗi khi lấy tất cả báo cáo");
    }
  },

  createReport: async (roomNumber, userId, content, reportStatus = "Pending", reply = null) => {
    try {
      console.log("Creating report with:", {
        roomNumber,  // Sử dụng roomNumber thay vì roomId
        userId,
        content,
        reportStatus,
        reply,
      });
  
      const report = await Report.createReport(roomNumber, userId, content, reportStatus, reply);
      console.log("Report creation result:", report);
      // Logic xử lý tiếp theo...
    } catch (error) {
      console.error("Error in createReport service:", error);
      throw error;
    }
  },
  

  getReportsByUserId: async (userId) => {
    try {
      const reports = await Report.getReportsByUserId(userId);
      return reports.recordsets[0];
    } catch (error) {
      console.error("Error in getReportsByUserId service:", error);
      throw error;
    }
  },

  getReportById: async (id) => {
    try {
      const report = await Report.getReportById(id);
      if (!report.recordsets[0].length) {
        throw new Error("Không tìm thấy báo cáo");
      }
      return report.recordsets[0][0];
    } catch (error) {
      console.error("Error in getReportById service:", error);
      throw error;
    }
  },

  updateReport: async (reportStatus, reply, id) => {
    try {
      const report = await Report.updateReport(reportStatus, reply, id);
      if (report.rowsAffected[0] === 0) {
        throw new Error("Cập nhật báo cáo thất bại");
      }
      return "Cập nhật báo cáo thành công";
    } catch (error) {
      console.error("Error in updateReport service:", error);
      throw error;
    }
  },

  deleteReport: async (id) => {
    try {
      const report = await Report.deleteReport(id);
      if (report.rowsAffected[0] === 0) {
        throw new Error("Xóa báo cáo thất bại");
      }
    } catch (error) {
      console.error("Error in deleteReport service:", error);
      throw error;
    }
  },
};
