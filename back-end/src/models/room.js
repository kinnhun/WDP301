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
    // Lấy danh sách loại phòng
    getAllFloor: async () => {
        return sql.query`
             
			  SELECT DISTINCT [floor_number]
FROM [dbo].[Rooms]
WHERE [floor_number] IS NOT NULL;

        `;
    },
    // Lấy danh sách giường có sẵn từ một phòng theo ID
    getBedAvailableFromRoom: async (roomId) => {
        return sql.query`
        SELECT 
            [bed_id],
            [room_id],
            [bed_number],
            [availability_status]
        FROM 
            [dbo].[Beds]
        WHERE 
            [availability_status] = 'available'
            AND [room_id] = ${roomId}
    `;
    },



    getAllAvailableRooms: async () => {
        return sql.query`
        SELECT 
        [bed_id],
        [room_id],
        [bed_number],
        [availability_status]
    FROM 
        [dbo].[Beds]
    WHERE 
        
         [availability_status] = 'available'
    `;
    },


 // Lấy danh sách phòng theo loại phòng, số tầng, và ký túc xá
getRoomsByDormRoomTypeFloor: async (roomTypeId, floorNumber, dormName) => {
    return sql.query`
        SELECT 
            [room_id],
            [room_number],
            [room_type_id],
            [price],
            [availability_status],
            [created_at],
            [updated_at],
            [floor_number],
            [dorm]
        FROM 
            [dbo].[Rooms]
        WHERE 
            [room_type_id] = ${roomTypeId} AND
            [floor_number] = ${floorNumber} AND
            [dorm] = ${dormName} AND
            [availability_status] = 'available'
    `;
},
getRoomCategory : async () =>{
    return sql.query`
    SELECT  [room_type_id]
      ,[category_name]
  FROM [wdp3].[dbo].[RoomCategories]

    `;
},
getDorm : async () =>{
    return sql.query`
      SELECT DISTINCT [dorm]
              FROM [dbo].[Rooms]
              WHERE [dorm] IS NOT NULL;
              `;
},


};



module.exports = Room;
