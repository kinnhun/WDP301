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
          
            WHERE [room_id] = ${id}
        `;
    return result.recordset[0]; // Trả về phòng đầu tiên nếu tìm thấy
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


   updateRoomStatus1 : async (roomId, availability_status) => {
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
  


  createRoom: async ({ room_number, room_type_id, price, availability_status, floor_number, dorm, gender }) => {
    try {
      // Tạo phòng mới và lấy room_id
      const result = await sql.query`
        INSERT INTO [dbo].[Rooms] 
          ([room_number], [room_type_id], [price], [availability_status], [floor_number], [dorm], [gender], [created_at], [updated_at])
        VALUES
          (${room_number}, ${room_type_id}, ${price}, ${availability_status}, ${floor_number}, ${dorm}, ${gender}, SYSDATETIME(), SYSDATETIME())
        SELECT SCOPE_IDENTITY() AS room_id;
      `;
    
      // Kiểm tra xem có room_id không
      if (result.recordset && result.recordset.length > 0) {
        const room_id = result.recordset[0].room_id;  // Lấy room_id của phòng vừa tạo
        console.log("Room ID: ", room_id);
    
        // Xác định số lượng giường cần tạo dựa trên room_type_id
        let bedCount = 0;
        if (room_type_id == 1) {
          bedCount = 6; // Tạo 6 giường
        } else if (room_type_id == 2) {
          bedCount = 4; // Tạo 4 giường
        } else if (room_type_id == 3) {
          bedCount = 3; // Tạo 3 giường
        }

        console.log("bedCount : ", bedCount);

  
        // Tạo giường mới nếu cần
        if (bedCount > 0) {
          const bedPromises = [];
          for (let i = 1; i <= bedCount; i++) {
            console.log(`Creating bed ${i} for room_id ${room_id}`);
            // Tạo giường mới với room_id và bed_number
            console.log("id: " , i)
            bedPromises.push(
              sql.query`
                INSERT INTO [dbo].[Beds] 
                  ([room_id], [bed_number], [availability_status])
                VALUES
                  (${room_id}, ${i}, 'Available');
              `
            );
          }
  
          // Đợi tất cả các giường được tạo thành công
          await Promise.all(bedPromises);
        }
  
        return {
          success: true,
          message: "Tạo phòng mới và giường thành công",
          room_id: room_id,
        };
      } else {
        throw new Error("Không thể lấy room_id sau khi chèn");
      }
    } catch (error) {
      console.error("Lỗi tạo phòng:", error);
      throw new Error("Tạo phòng mới thất bại");
    }
  },
   

  getRoomIdBooking : async () => {
    return sql.query`
      SELECT DISTINCT [room_id]
      FROM [dbo].[Bookings]
      WHERE [end_date] < GETDATE();
    `;
  },




  getUserIdByRoomNumber: async (roomNumber) => {
    return sql.query`
  SELECT B.user_id
    ,B.room_id
  FROM Bookings B
  LEFT JOIN Rooms R ON B.room_id = R.room_id
  LEFT JOIN Semester S ON B.semester = S.semester_name
  WHERE R.room_number = ${roomNumber}
  AND S.status = 'Active'
    `;
  },
  getRoomIdByRoomNumber: async (roomNumber) => {
    return sql.query`
    SELECT room_id
    FROM Rooms
    WHERE room_number = ${roomNumber}
    `;
  },
  getRoomIdByEmail: async (email) => {
    return sql.query`
   SELECT R.room_id
  FROM Rooms R
  LEFT JOIN Bookings B
  ON R.room_id = B.room_id
  LEFT JOIN Users U
  ON U.user_id = B.user_id
  LEFT JOIN Semester S
  ON S.semester_name = B.semester
  WHERE U.email = ${email}
  AND S.status = 'Active'
    `;
  },



  
  
};






module.exports = Room;
