const sql = require("mssql");

const Booking = {
    // Lấy tất cả các booking
    getAllBookings: async () => {
        return sql.query`
            SELECT TOP (1000) 
                b.[booking_id],
                b.[user_id],
                u.[email] AS user_email,
                b.[room_id],
                r.[room_number] AS RoomName,
                r.[floor_number],
                r.[dorm],
                b.[start_date],
                b.[end_date],
                b.[total_amount],
                b.[payment_status],
                b.[booking_status],
                b.[created_at],
                b.[updated_at],
                b.[bed_id],
                bd.[bed_number]
            FROM [dbo].[Bookings] b
            JOIN [dbo].[Users] u ON b.[user_id] = u.[user_id]
            JOIN [dbo].[Rooms] r ON b.[room_id] = r.[room_id]
            JOIN [dbo].[Beds] bd ON b.[bed_id] = bd.[bed_id]
        `;
    },
    

    // Lấy booking theo ID
    getBookingById: async (bookingId) => {
        return sql.query`
            SELECT 
                [booking_id],
                [user_id],
                [room_id],
                [start_date],
                [end_date],
                [total_amount],
                [payment_status],
                [booking_status],
                [created_at],
                [updated_at],
                [bed_id]
            FROM [dbo].[Bookings]
            WHERE [booking_id] = ${bookingId}
            ORDER BY [booking_id] DESC;
        `;
    },

  // Hàm tạo booking trong model
createBooking: async (roomId, userId, startDate, endDate, totalAmount, paymentStatus, bookingStatus, bedId, semesterName) => {
    return sql.query`
        INSERT INTO [dbo].[Bookings]
            ([room_id], [user_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester])
        VALUES
            (${roomId}, ${userId}, ${startDate}, ${endDate}, ${totalAmount}, ${paymentStatus}, ${bookingStatus}, SYSDATETIME(), SYSDATETIME(), ${bedId}, ${semesterName})
    `;
},
    

    // Cập nhật thông tin booking
    updateBooking: async (bookingId, updates) => {
        const { roomId, userId, startDate, endDate, totalAmount, paymentStatus, bookingStatus, bedId } = updates;

        return sql.query`
            UPDATE [dbo].[Bookings]
            SET 
                [room_id] = ${roomId},
                [user_id] = ${userId},
                [start_date] = ${startDate},
                [end_date] = ${endDate},
                [total_amount] = ${totalAmount},
                [payment_status] = ${paymentStatus},
                [booking_status] = ${bookingStatus},
                [updated_at] = SYSDATETIME(),
                [bed_id] = ${bedId}
            WHERE [booking_id] = ${bookingId}
        `;
    },

    // Xóa booking
    deleteBooking: async (bookingId) => {
        return sql.query`
            DELETE FROM [dbo].[Bookings]
            WHERE [booking_id] = ${bookingId}
        `;
    },

    // Lấy booking theo User ID
    getBookingsByUserId: async (userId) => {
        return sql.query`
          SELECT 
            b.[booking_id],
            b.[user_id],
            b.[room_id],
            r.[room_number],
            r.[room_type_id],
            rc.[category_name],  
            bd.[bed_id],
            bd.[bed_number],
            b.[start_date],
            b.[end_date],
            b.[total_amount],
            b.[payment_status],
            b.[booking_status],
            b.[created_at],
            b.[updated_at],
            r.[price],
            r.[availability_status] ,
            r.[floor_number],
            r.[dorm],
            r.[created_at] ,
            r.[updated_at] ,
            bd.[availability_status] 
        FROM 
            [dbo].[Bookings] b
        JOIN 
            [dbo].[Rooms] r ON b.[room_id] = r.[room_id]
        JOIN 
            [dbo].[Beds] bd ON b.[bed_id] = bd.[bed_id]
        JOIN 
            [wdp3].[dbo].[RoomCategories] rc ON r.[room_type_id] = rc.[room_type_id]

        WHERE b.[user_id] = ${userId}
        `;
    },

    getAllFloor: async () => {
        return sql.query`
            SELECT DISTINCT [floor_number]
            FROM [dbo].[Rooms]
            WHERE [floor_number] IS NOT NULL;
        `;
    },
    
   // Lấy booking theo trạng thái
   getBookingsByStatus: async (status) => {
    return sql.query`
        SELECT 
            b.[booking_id],
            b.[user_id],
            u.[email] AS user_email,
            b.[room_id],
            r.[room_number] AS RoomName,
            r.[floor_number],
            r.[dorm],
            b.[start_date],
            b.[end_date],
            b.[total_amount],
            b.[payment_status],
            b.[booking_status],
            b.[created_at],
            b.[updated_at],
            b.[bed_id],
            bd.[bed_number]
        FROM [dbo].[Bookings] b
        JOIN [dbo].[Users] u ON b.[user_id] = u.[user_id]
        JOIN [dbo].[Rooms] r ON b.[room_id] = r.[room_id]
        JOIN [dbo].[Beds] bd ON b.[bed_id] = bd.[bed_id]
        WHERE b.[booking_status] = ${status};
    `;
},
updateBookingStatus: async (bookingId, statusName) => {
    return sql.query`
        UPDATE [dbo].[Bookings]
        SET [booking_status] = ${statusName},
            [updated_at] = SYSDATETIME()
        WHERE [booking_id] = ${bookingId}
    `;
},



updateMultipleStatuses: async (bookingIds, newStatus) => {
    try {
        // Ensure the booking IDs are integers
        const ids = bookingIds
            .map(id => parseInt(id, 10))
            .filter(id => !isNaN(id));

        if (ids.length === 0) {
            throw new Error("No valid booking IDs provided.");
        }

        console.log("Updating booking statuses for IDs:", ids);

        // Create a new SQL request
        const request = new sql.Request();

        // Add the parameter for the new status
        request.input('newStatus', sql.NVarChar, newStatus);

        // Build the query string with placeholders for the booking IDs
        const query = `
            UPDATE [dbo].[Bookings]
            SET [booking_status] = @newStatus,
                [updated_at] = SYSDATETIME()
            WHERE [booking_id] IN (${ids.join(", ")});
        `;

        // Execute the query with parameters
        const result = await request.query(query);

        return {
            success: true,
            message: 'Booking statuses updated successfully.',
            affectedRows: result.rowsAffected,
        };
    } catch (error) {
        console.error('Error in updateMultipleStatuses:', error.message);
        throw new Error('Failed to update booking statuses');
    }
},




    
};




module.exports = Booking;
