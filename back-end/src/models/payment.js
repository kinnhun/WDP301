const sql = require("mssql");

const Payment = {
    // Lấy lịch sử thanh toán theo userId
    getPaymentById: async (userId) => {
        return sql.query`
            SELECT 
                b.[bed_id],
                b.[created_at],
                b.[payment_status],
                b.[total_amount],
                r.[room_id],
                r.[room_number]
            FROM [dbo].[Rooms] r
            JOIN [dbo].[Bookings] b ON r.[room_id] = b.[room_id]
            WHERE b.[user_id] = ${userId}
            ORDER BY b.[created_at] DESC;
        `;
    },
    
    // Thêm một giao dịch thanh toán mới (nếu cần)
    createPayment: async (userId, bedId, roomId, totalAmount, paymentStatus) => {
        return sql.query`
            INSERT INTO [dbo].[Payments]
                ([user_id], [bed_id], [room_id], [total_amount], [payment_status], [created_at])
            VALUES
                (${userId}, ${bedId}, ${roomId}, ${totalAmount}, ${paymentStatus}, SYSDATETIME());
        `;
    },

    // Cập nhật trạng thái thanh toán
    updatePaymentStatus: async (paymentId, newStatus) => {
        return sql.query`
            UPDATE [dbo].[Payments]
            SET [payment_status] = ${newStatus}, [updated_at] = SYSDATETIME()
            WHERE [payment_id] = ${paymentId};
        `;
    },

    // Xóa giao dịch thanh toán (nếu cần)
    deletePayment: async (paymentId) => {
        return sql.query`
            DELETE FROM [dbo].[Payments]
            WHERE [payment_id] = ${paymentId};
        `;
    },
};

module.exports = Payment;
