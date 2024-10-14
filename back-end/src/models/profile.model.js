const sql = require("mssql");

const UserProfile = {
    // Lấy danh sách tất cả người dùng (giới hạn 1000 người dùng)
    getAllUsers: async () => {
        try {
            const result = await sql.query`
                SELECT [user_id],
                    [username],
                    [email],
                    [role_id],
                    [created_at],
                    [updated_at]
                FROM [dbo].[Users]
            `;
            console.log('Kết quả truy vấn:', result); // Kiểm tra kết quả ở đây
            return result; // Trả về kết quả từ truy vấn
        } catch (err) {
            console.error("Lỗi khi lấy danh sách người dùng:", err);
            throw err;
        }
    },

    // Lấy thông tin người dùng theo ID
    getUserById: async (userId) => {
        try {
            const result = await sql.query`
                SELECT 
                    [user_id],
                    [username],
                    [password],
                    [email],
                    [role_id],
                    [created_at],
                    [updated_at]
                FROM [dbo].[Users]
                WHERE [user_id] = ${userId}
            `;
            return result.recordset[0]; // Trả về thông tin người dùng
        } catch (err) {
            console.error("Lỗi khi lấy thông tin người dùng theo ID:", err);
            throw err;
        }
    },

    // Tạo người dùng mới
    createUser: async (username, password, email, roleId) => {
        try {
            const result = await sql.query`
                INSERT INTO [dbo].[Users] 
                    ([username], [password], [email], [role_id], [created_at], [updated_at])
                VALUES 
                    (${username}, ${password}, ${email}, ${roleId}, SYSDATETIME(), SYSDATETIME())
            `;
            return result.rowsAffected; // Trả về số bản ghi đã thêm
        } catch (err) {
            console.error("Lỗi khi tạo người dùng mới:", err);
            throw err;
        }
    },

    // Cập nhật thông tin người dùng
    updateUser: async (userId, updates) => {
        const { username, password, email, roleId } = updates;
        try {
            const result = await sql.query`
                UPDATE [dbo].[Users]
                SET 
                    [username] = ${username},
                    [password] = ${password},
                    [email] = ${email},
                    [role_id] = ${roleId},
                    [updated_at] = SYSDATETIME()
                WHERE [user_id] = ${userId}
            `;
            return result.rowsAffected; // Trả về số bản ghi đã cập nhật
        } catch (err) {
            console.error("Lỗi khi cập nhật người dùng:", err);
            throw err;
        }
    },

    // Xóa người dùng
    deleteUser: async (userId) => {
        try {
            const result = await sql.query`
                DELETE FROM [dbo].[Users]
                WHERE [user_id] = ${userId}
            `;
            return result.rowsAffected; // Trả về số bản ghi đã xóa
        } catch (err) {
            console.error("Lỗi khi xóa người dùng:", err);
            throw err;
        }
    }
};

module.exports = UserProfile;
