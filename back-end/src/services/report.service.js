// Xuất các hàm điều khiển
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

  
  createReport: async (roomNumber, userId, content, reportStatus = "Pending", reply = null, assignedStaffId) => {
    try {
      const report = await Report.createReport(roomNumber, userId, content, reportStatus, reply, assignedStaffId);
      return report.recordset[0];  // Trả về báo cáo đã được tạo
    } catch (error) {
      console.error("Error in createReport service:", error);
      throw error;
    }
  },
  
  getReportsByUserId: async (userId) => {
    try {
      const reports = await Report.getReportsByUserId(userId);
      console.log("User ID:", userId); // Xem giá trị userId

      console.log("Reports:", reports);

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

  // updateReport: async (reportId, reportStatus, reply, assignedStaffId) => {
  //   try {
  //     const result = await Report.updateReport(reportId, reportStatus, reply, assignedStaffId);
  //     if (result.rowsAffected[0] === 0) {
  //       throw new Error("Cập nhật báo cáo thất bại");
  //     }
  //     return "Cập nhật báo cáo thành công";
  //   } catch (error) {
  //     console.error("Error in updateReport service:", error);
  //     throw error;
  //   }
  // },
  updateReport: async (reportId, assignedStaffId) => {
    try {
      // Kiểm tra giá trị assignedStaffId và đặt lại nếu không có
      const updatedAssignedStaffId = assignedStaffId || null;
  
      // Gọi hàm updateReport để chỉ cập nhật assigned_staff_id
      const result = await Report.updateReport(reportId, updatedAssignedStaffId);
      if (result.rowsAffected[0] === 0) {
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
      return "Xóa báo cáo thành công";
    } catch (error) {
      console.error("Error in deleteReport service:", error);
      throw error;
    }
  },

  getReportsByStaffId: async (staffId) => {
    try {
        const reports = await Report.getReportsByStaffId(staffId);

        // Kiểm tra xem reports có dữ liệu không
        if (!reports || reports.length === 0) {
            console.log("No reports found for staff ID:", staffId);
            return []; // Trả về mảng rỗng nếu không có báo cáo
        }

        return reports;
    } catch (error) {
        console.error("Error in getReportsByStaffId service:", error);
        throw error;
    }
},
updateReportReplyAndStatus: async (reportId, reply, status) => {
  try {
    const result = await Report.updateReportReplyAndStatus(reportId, reply, status);
    return result;
  } catch (error) {
    console.error("Error in updateReportReplyAndStatus service:", error);
    throw error;
  }
},

  
};


