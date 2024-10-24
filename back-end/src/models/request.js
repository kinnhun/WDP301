const sql = require("mssql");

module.exports = {
  // Lấy tất cả các yêu cầu bảo trì
  getAllRequests: async () => {
    return sql.query`
            		  SELECT [Requests].[request_id]
                ,[Rooms].[room_number]
                ,[Users].[email]
                ,[Requests].[description]
                ,[Requests].[status]
				 ,[request_type].[type_name] as request_type
				 ,[Requests].[reply]
                ,[Requests].[created_at]
                ,[Requests].[updated_at]           
            FROM [dbo].[Requests]
			LEFT JOIN [dbo].[Users]
			ON [Users].[user_id] = [Requests].[user_id]
			LEFT JOIN [dbo].[request_type]
			ON [request_type].[id] = [Requests].[request_type]
			LEFT JOIN [dbo].[Rooms]
			ON [Rooms].[room_id] = [Requests].[room_id]
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
   SELECT TOP 1 [Requests].[request_id]
                ,[Requests].[room_id]
                ,[Requests].[user_id]
                ,[Requests].[description]
                ,[Requests].[status]
                ,[Requests].[created_at]
                ,[Requests].[updated_at]
                ,[request_type].[type_name]
                ,[Requests].[reply]
            FROM [dbo].[Requests]
			LEFT JOIN [dbo].[request_type]
			ON [Requests].[request_type] = [request_type].[id]
      ORDER BY [Requests].[request_id] DESC
        `;
  },
  getRequestByUserId: async (userId) => {
    return sql.query`
 SELECT [Requests].[request_id]
                ,[Requests].[room_id]
                ,[Requests].[user_id]
                ,[Requests].[description]
                ,[Requests].[status]
                ,[Requests].[created_at]
                ,[Requests].[updated_at]
                ,[request_type].[type_name] as request_type
                ,[Requests].[reply]
            FROM [dbo].[Requests]
			LEFT JOIN [dbo].[request_type]
			ON [Requests].[request_type] = [request_type].[id]
      WHERE [Requests].[user_id] = ${userId}
      ORDER BY [Requests].[request_id] DESC
    `;
  },

  getRequestTypes: async () => {
    return sql.query`
        SELECT [id]
      ,[type_name]
      ,[description]
  FROM [dbo].[request_type]
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
