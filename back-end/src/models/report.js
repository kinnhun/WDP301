
const sql = require("mssql");

module.exports = {
  // Lấy tất cả báo cáo
  getAllReports: async () => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Reports].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id];
    `;
  },

  // Lấy báo cáo theo ID
  getReportById: async (reportId) => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Reports].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id]
      WHERE [Reports].[report_id] = ${reportId};
    `;
  },

  // Tạo báo cáo mới
  createReport: async (
    roomNumber,
    userId,
    content,
    reportStatus,
    reply,
    assignedStaffId
  ) => {
    const roomResult = await sql.query`
      SELECT [room_id]
      FROM [dbo].[Bookings]
      WHERE [user_id] = ${userId}
      ORDER BY [start_date] DESC;
    `;

    if (roomResult.recordset.length === 0) {
      throw new Error("Không tìm thấy phòng cho user này.");
    }

    const roomId = roomResult.recordset[0].room_id;

    return sql.query`
      INSERT INTO [dbo].[Reports] (room_id, room_number, user_id, content, report_status, reply, assignedStaffId)
      VALUES (${roomId}, ${roomNumber}, ${userId}, ${content}, ${reportStatus}, ${reply}, ${assignedStaffId});
      SELECT * FROM [dbo].[Reports] WHERE report_id = SCOPE_IDENTITY();
    `;
  },

  // Cập nhật báo cáo
  updateReport: async (reportId, assignedStaffId) => {
    try {
      // Cập nhật chỉ trường assignedStaffId
      const result = await sql.query`
        UPDATE [dbo].[Reports]
        SET [assignedStaffId] = ${assignedStaffId}
        WHERE [report_id] = ${reportId};
      `;
      return result;
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  },
  getReportsByStaffId: async (assignedStaffId) => {
    try {
        const result = await sql.query`
            SELECT 
                Reports.report_id,
                Reports.user_id,
                Reports.room_id,
                Reports.room_number,       
                Users.email,
                Reports.content,
                Reports.reply,
                Reports.report_status,
                Reports.created_at,
                Reports.updated_at
            FROM dbo.Reports
            LEFT JOIN dbo.Users ON Users.user_id = Reports.user_id
            WHERE Reports.assignedStaffId = ${assignedStaffId};
        `;

        // Kiểm tra nếu result.recordset không tồn tại hoặc là một mảng rỗng
        if (!result.recordset || result.recordset.length === 0) {
            console.log("No reports found for assignedStaffId:", assignedStaffId);
            return []; // Trả về mảng rỗng nếu không có dữ liệu
        }

        return result.recordset;
    } catch (error) {
        console.error("Error fetching reports for staff:", error);
        throw error;
    }
}
,
  // Xóa báo cáo
  deleteReport: async (reportId) => {
    return sql.query`
      DELETE FROM [dbo].[Reports]
      WHERE [report_id] = ${reportId};
    `;
  },

  updateReportReplyAndStatus: async (reportId, reply, status) => {
    try {
      const result = await sql.query`
        UPDATE [dbo].[Reports]
        SET [reply] = ${reply}, [report_status] = ${status}
        WHERE [report_id] = ${reportId};
      `;
      return result;
    } catch (error) {
      console.error("Error updating report reply and status:", error);
      throw error;
    }
  },
  

};

const sql = require("mssql");

module.exports = {
  // Lấy tất cả báo cáo
  getAllReports: async () => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Reports].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id];
    `;
  },

  // Lấy báo cáo theo ID
  getReportById: async (reportId) => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Reports].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id]
      WHERE [Reports].[report_id] = ${reportId};
    `;
  },

  // Tạo báo cáo mới
  createReport: async (
    roomNumber,
    userId,
    content,
    reportStatus,
    reply,
    assignedStaffId
  ) => {
    const roomResult = await sql.query`
      SELECT [room_id]
      FROM [dbo].[Bookings]
      WHERE [user_id] = ${userId}
      ORDER BY [start_date] DESC;
    `;

    if (roomResult.recordset.length === 0) {
      throw new Error("Không tìm thấy phòng cho user này.");
    }

    const roomId = roomResult.recordset[0].room_id;

    return sql.query`
      INSERT INTO [dbo].[Reports] (room_id, room_number, user_id, content, report_status, reply, assignedStaffId)
      VALUES (${roomId}, ${roomNumber}, ${userId}, ${content}, ${reportStatus}, ${reply}, ${assignedStaffId});
      SELECT * FROM [dbo].[Reports] WHERE report_id = SCOPE_IDENTITY();
    `;
  },

  // Cập nhật báo cáo
  updateReport: async (reportId, assignedStaffId) => {
    try {
      // Cập nhật chỉ trường assignedStaffId
      const result = await sql.query`
        UPDATE [dbo].[Reports]
        SET [assignedStaffId] = ${assignedStaffId}
        WHERE [report_id] = ${reportId};
      `;
      return result;
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  },
  getReportsByStaffId: async (assignedStaffId) => {
    try {
        const result = await sql.query`
            SELECT 
                Reports.report_id,
                Reports.user_id,
                Reports.room_id,
                Reports.room_number,       
                Users.email,
                Reports.content,
                Reports.reply,
                Reports.report_status,
                Reports.created_at,
                Reports.updated_at
            FROM dbo.Reports
            LEFT JOIN dbo.Users ON Users.user_id = Reports.user_id
            WHERE Reports.assignedStaffId = ${assignedStaffId};
        `;

        // Kiểm tra nếu result.recordset không tồn tại hoặc là một mảng rỗng
        if (!result.recordset || result.recordset.length === 0) {
            console.log("No reports found for assignedStaffId:", assignedStaffId);
            return []; // Trả về mảng rỗng nếu không có dữ liệu
        }

        return result.recordset;
    } catch (error) {
        console.error("Error fetching reports for staff:", error);
        throw error;
    }
}
,
  // Xóa báo cáo
  deleteReport: async (reportId) => {
    return sql.query`
      DELETE FROM [dbo].[Reports]
      WHERE [report_id] = ${reportId};
    `;
  },

  updateReportReplyAndStatus: async (reportId, reply, status) => {
    try {
      const result = await sql.query`
        UPDATE [dbo].[Reports]
        SET [reply] = ${reply}, [report_status] = ${status}
        WHERE [report_id] = ${reportId};
      `;
      return result;
    } catch (error) {
      console.error("Error updating report reply and status:", error);
      throw error;
    }
  },
  

};

