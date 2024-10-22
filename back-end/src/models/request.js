const sql = require("mssql");

module.exports = {
  // Lấy tất cả các yêu cầu bảo trì
  getAllRequests: async () => {
    return sql.query`
            SELECT [request_id]
                ,[room_id]
                ,[user_id]
                ,[description]
                ,[status]
                ,[created_at]
                ,[updated_at]
                ,[request_type]
                ,[reply]
                ,[semester]
            FROM [dbo].[MaintenanceRequests]
        `;
  },

  // Lấy yêu cầu bảo trì theo ID
  getRequestById: async (requestId) => {
    return sql.query`
            SELECT [request_id]
                ,[room_id]
                ,[user_id]
                ,[description]
                ,[status]
                ,[created_at]
                ,[updated_at]
                ,[request_type]
                ,[reply]
                ,[semester]
            FROM [dbo].[MaintenanceRequests]
            WHERE [request_id] = ${requestId}
        `;
  },

  // Tạo yêu cầu bảo trì mới
  createRequest: async (
    roomId,
    userId,
    requestType,
    description,
    status = "Pending",
    reply = null
  ) => {
    return sql.query`
            INSERT INTO [dbo].[Requests]
           ([room_id]
           ,[user_id]
           ,[request_type]
           ,[description]
           ,[reply]
           ,[status]
           ,[created_at]
           ,[updated_at])
     VALUES
           (${roomId}
           ,${userId}
           ,${requestType}
           ,${description}
           ,${reply}
           ,${status}
           ,SYSDATETIME()
           ,SYSDATETIME())
        `;
  },

  getNewestRequest: async () => {
    return sql.query`
    SELECT TOP 1 [request_id]
          ,[room_id]
          ,[user_id]
          ,[request_type]
          ,[description]
          ,[reply]
          ,[status]
          ,[created_at]
          ,[updated_at]
      FROM [wdp2].[dbo].[Requests]
      ORDER BY [Requests].[request_id] DESC
        `;
  },

  // Cập nhật yêu cầu bảo trì
  updateRequest: async (requestId, updates) => {
    const { roomId, userId, description, status, requestType, reply, semester } = updates;

    return sql.query`
            UPDATE [dbo].[MaintenanceRequests]
            SET 
                [room_id] = ${roomId},
                [user_id] = ${userId},
                [description] = ${description},
                [status] = ${status},
                [updated_at] = SYSDATETIME(),
                [request_type] = ${requestType},
                [reply] = ${reply},
                [semester] = ${semester}
            WHERE [request_id] = ${requestId}
        `;
  },

  // Xóa yêu cầu bảo trì
  deleteRequest: async (requestId) => {
    return sql.query`
            DELETE FROM [dbo].[MaintenanceRequests]
            WHERE [request_id] = ${requestId}
        `;
  },
};
