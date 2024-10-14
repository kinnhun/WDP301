const sql = require("mssql");

const MaintenanceRequest = {
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
    createRequest: async (roomId, userId, description, status, requestType, semester) => {
        return sql.query`
            INSERT INTO [dbo].[MaintenanceRequests]
                ([room_id]
                ,[user_id]
                ,[description]
                ,[status]
                ,[created_at]
                ,[updated_at]
                ,[request_type]
                ,[reply]
                ,[semester])
            VALUES
                (${roomId}
                ,${userId}
                ,${description}
                ,${status}
                ,SYSDATETIME()
                ,SYSDATETIME()
                ,${requestType}
                ,NULL
                ,${semester})
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
    }
};

module.exports = MaintenanceRequest;
