const sql = require("mssql");

const Room = {
    // Lấy tất cả phòng
    getAllRooms: async () => {
        return sql.query`
            SELECT TOP (1000) 
                [room_id],
                [room_number],
                [room_type_id],
                [price],
                [availability_status],
                [created_at],
                [updated_at]
            FROM [dbo].[Rooms]
        `;
    },

    // Lấy phòng theo ID
    getRoomById: async (id) => {
        const result = await sql.query`
            SELECT 
                [room_id],
                [room_number],
                [room_type_id],
                [price],
                [availability_status],
                [created_at],
                [updated_at]
            FROM [dbo].[Rooms]
            WHERE [room_id] = ${id}
        `;
        return result.recordset[0]; // Trả về phòng đầu tiên nếu tìm thấy
    },

    // Tạo phòng mới
    createRoom: async (room_number, room_type_id, price, availability_status) => {
        return sql.query`
            INSERT INTO [dbo].[Rooms]
                ([room_number],
                [room_type_id],
                [price],
                [availability_status],
                [created_at],
                [updated_at])
            VALUES
                (${room_number},
                ${room_type_id},
                ${price},
                ${availability_status},
                SYSDATETIME(),
                SYSDATETIME())
        `;
    },

    // Cập nhật phòng
    updateRoom: async (id, { room_number, room_type_id, price, availability_status }) => {
        return sql.query`
            UPDATE [dbo].[Rooms]
            SET 
                [room_number] = ${room_number},
                [room_type_id] = ${room_type_id},
                [price] = ${price},
                [availability_status] = ${availability_status},
                [updated_at] = SYSDATETIME()
            WHERE [room_id] = ${id}
        `;
    },

    // Xóa phòng
    deleteRoom: async (id) => {
        return sql.query`
            DELETE FROM [wdp3].[dbo].[Rooms]
            WHERE [room_id] = ${id}
        `;
    },

    getAvailableRooms: async () => {
        return sql.query`
            SELECT 
                [room_id],
                [room_number],
                [room_type_id],
                [price],
                [availability_status],
                [created_at],
                [updated_at]
            FROM [dbo].[Rooms]
            WHERE [availability_status] = 'Available'
        `;
    },

};

module.exports = Room;
