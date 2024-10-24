const sql = require("mssql");

const Booking = {
    // Lấy tất cả các booking
    getAllBookings: async () => {
        return sql.query`
            SELECT TOP (1000) 
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
        `;
    },

    // Tạo booking mới
    createBooking: async (roomId, userId, startDate, endDate, totalAmount, paymentStatus, bookingStatus, bedId) => {
        return sql.query`
            INSERT INTO [dbo].[Bookings]
                ([room_id],
                [user_id],
                [start_date],
                [end_date],
                [total_amount],
                [payment_status],
                [booking_status],
                [created_at],
                [updated_at],
                [bed_id])
            VALUES
                (${roomId},
                ${userId},
                ${startDate},
                ${endDate},
                ${totalAmount},
                ${paymentStatus},
                ${bookingStatus},
                SYSDATETIME(),
                SYSDATETIME(),
                ${bedId})
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
    }
    
};

module.exports = Booking;
