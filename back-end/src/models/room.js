const sql = require("mssql");

const Room = {
  // Lấy tất cả phòng
  getAllRooms: async () => {
    return sql.query`
      SELECT 
          r.[room_id],
          r.[room_number],
          r.[room_type_id],
          r.[price],
          r.[availability_status],
          r.[created_at],
          r.[updated_at],
          r.[floor_number],
          r.[dorm],
          r.[gender],
          rc.[category_name] AS room_category_name
      FROM [dbo].[Rooms] r
      LEFT JOIN [dbo].[RoomCategories] rc
          ON r.[room_type_id] = rc.[room_type_id]
          
    `;
  },
  
  getRoomsByDorm: async (dorm) => {
    return sql.query`
      SELECT 
          r.[room_id],
          r.[room_number],
          r.[room_type_id],
          r.[price],
          r.[availability_status],
          r.[created_at],
          r.[updated_at],
          r.[floor_number],
          r.[dorm],
          r.[gender],
          rc.[category_name] AS room_category_name
      FROM [dbo].[Rooms] r
      LEFT JOIN [dbo].[RoomCategories] rc
          ON r.[room_type_id] = rc.[room_type_id]
      WHERE r.dorm = ${dorm}    
    `;
  },
  getRoomsByDormAndFloor: async (dorm, floor) => {
    return sql.query`
      SELECT 
          r.[room_id],
          r.[room_number],
          r.[room_type_id],
          r.[price],
          r.[availability_status],
          r.[created_at],
          r.[updated_at],
          r.[floor_number],
          r.[dorm],
          r.[gender],
          rc.[category_name] AS room_category_name
      FROM [dbo].[Rooms] r
      LEFT JOIN [dbo].[RoomCategories] rc
          ON r.[room_type_id] = rc.[room_type_id]
      WHERE r.dorm = ${dorm}    AND r.floor_number = ${floor}
    `;
  },


  getRoomByStatus: async (status) => {
    console.log(status);
    return sql.query`
     SELECT 
    r.[room_id],
    r.[room_number],
    r.[room_type_id],
    r.[price],
    r.[availability_status],
    r.[created_at],
    r.[updated_at],
    r.[floor_number],
    r.[dorm],
    r.[gender],
    rc.[category_name] AS room_category_name
FROM [dbo].[Rooms] r
LEFT JOIN [dbo].[RoomCategories] rc
    ON r.[room_type_id] = rc.[room_type_id]
WHERE r.[availability_status] = ${status};

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
            DELETE FROM [dbo].[Rooms]
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
  getRoomsByDormRoomTypeFloor: async (roomTypeId, floorNumber, dormName,gender) => {
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
        [availability_status] = 'available' AND
        [gender] = ${gender}
    `;
  },
  getRoomCategory: async () => {
    return sql.query`
    SELECT  [room_type_id]
      ,[category_name]
  FROM [dbo].[RoomCategories]

    `;
  },
  getDorm: async () => {
    return sql.query`
      SELECT DISTINCT [dorm]
              FROM [dbo].[Rooms]
              WHERE [dorm] IS NOT NULL;
              `;
  },

  // Cập nhật trạng thái phòng
  updateRoomStatus: async (roomId, availability_status) => {
    return sql.query`
      UPDATE [dbo].[Rooms]
      SET availability_status = ${availability_status}
      WHERE room_id = ${roomId}
    `;
  },

  
  getRoomsWithFilters: async (filters) => {
    let query = `
      SELECT 
        r.[room_id],
        r.[room_number],
        r.[room_type_id],
        r.[price],
        r.[availability_status],
        r.[created_at],
        r.[updated_at],
        r.[floor_number],
        r.[dorm],
        r.[gender],
        rc.[category_name] AS room_category_name
      FROM [dbo].[Rooms] r
      LEFT JOIN [dbo].[RoomCategories] rc
        ON r.[room_type_id] = rc.[room_type_id]
      WHERE 1 = 1  -- Điều kiện mặc định, dễ dàng thêm điều kiện sau này
    `;
  
    // Kiểm tra từng filter và bổ sung điều kiện vào câu truy vấn
    if (filters.dorm) {
      query += ` AND r.dorm = '${filters.dorm}'`;  // Thêm dấu nháy đơn cho giá trị dorm
    }
    if (filters.floor) {
      query += ` AND r.floor_number = ${filters.floor}`;  // Giả sử floor_number là số
    }
    if (filters.status) {
      query += ` AND r.availability_status = '${filters.status}'`;  // Thêm dấu nháy đơn cho giá trị status
    }
  
    return sql.query(query); // Thực hiện truy vấn với điều kiện động
  },
  
  
};



module.exports = Room;
