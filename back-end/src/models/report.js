const sql = require("mssql");

module.exports = {
  // Lấy tất cả báo cáo
  getAllReports: async () => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Rooms].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id]
      LEFT JOIN [dbo].[Rooms] ON [Rooms].[room_id] = [Reports].[room_id];
    `;
  },

  // Lấy báo cáo theo ID
  getReportById: async (reportId) => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Rooms].[room_number],       
          [Users].[email],
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Users] ON [Users].[user_id] = [Reports].[user_id]
      LEFT JOIN [dbo].[Rooms] ON [Rooms].[room_id] = [Reports].[room_id]
      WHERE [Reports].[report_id] = ${reportId};
    `;
  },

  // Tạo báo cáo mới
  createReport: async (roomId, userId, content, reportStatus = "Pending", reply = null) => {
    return sql.query`
      INSERT INTO [dbo].[Reports]
      ([room_id], [user_id], [content], [report_status], [reply], [created_at], [updated_at])
      VALUES
      (${roomId}, ${userId}, ${content}, ${reportStatus}, ${reply}, SYSDATETIME(), SYSDATETIME());
    `;
  },

  // Lấy báo cáo mới nhất
  getNewestReport: async () => {
    return sql.query`
      SELECT TOP 1 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Rooms].[room_number],       
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Rooms] ON [Rooms].[room_id] = [Reports].[room_id]
      ORDER BY [Reports].[report_id] DESC;
    `;
  },

  // Lấy báo cáo theo user_id
  getReportsByUserId: async (userId) => {
    return sql.query`
      SELECT 
          [Reports].[report_id],
          [Reports].[user_id],
          [Reports].[room_id],
          [Rooms].[room_number],       
          [Reports].[content],
          [Reports].[reply],
          [Reports].[report_status],
          [Reports].[created_at],
          [Reports].[updated_at]
      FROM [dbo].[Reports]
      LEFT JOIN [dbo].[Rooms] ON [Rooms].[room_id] = [Reports].[room_id]
      WHERE [Reports].[user_id] = ${userId}
      ORDER BY [Reports].[report_id] DESC;
    `;
  },

  // Cập nhật báo cáo (bao gồm cập nhật reply)
  updateReport: async (reportStatus, reply, reportId) => {
    return sql.query`
      UPDATE [dbo].[Reports]
      SET 
          [report_status] = ${reportStatus},
          [reply] = ${reply},
          [updated_at] = SYSDATETIME()
      WHERE [report_id] = ${reportId};
    `;
  },

  // Xóa báo cáo
  deleteReport: async (reportId) => {
    return sql.query`
      DELETE FROM [dbo].[Reports]
      WHERE [report_id] = ${reportId};
    `;
  },
};
