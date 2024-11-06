const sql = require("mssql");

const Semester = {
    // Lấy thông tin kỳ học theo trạng thái
    getSemesterByStatus: async (status) => {
        try {
            const result = await sql.query`
                SELECT 
                    [semester_id],
                    [semester_name],
                    [start_date],
                    [end_date],
                    [status],
                    [created_at],
                    [updated_at]
                FROM [dbo].[Semester]
                WHERE [status] = ${status}
            `;
            return result; // Trả về kết quả từ truy vấn
        } catch (err) {
            console.error("Lỗi khi lấy thông tin kỳ học theo trạng thái:", err);
            throw err;
        }
    },

    // Lấy tất cả các kỳ học
    getAllSemesters: async () => {
        try {
            const result = await sql.query`
                SELECT 
                    [semester_id],
                    [semester_name],
                    [start_date],
                    [end_date],
                    [status],
                    [created_at],
                    [updated_at]
                FROM [dbo].[Semester]
            `;
            return result; // Trả về kết quả từ truy vấn
        } catch (err) {
            console.error("Lỗi khi lấy tất cả kỳ học:", err);
            throw err;
        }
    },

    // Tạo kỳ học mới
    createSemester: async (semesterName, startDate, endDate, status) => {
        try {
            const result = await sql.query`
                INSERT INTO [dbo].[Semester] 
                    ([semester_name], [start_date], [end_date], [status], [created_at], [updated_at])
                VALUES 
                    (${semesterName}, ${startDate}, ${endDate}, ${status}, SYSDATETIME(), SYSDATETIME())
            `;
            return result.rowsAffected; // Trả về số bản ghi đã thêm
        } catch (err) {
            console.error("Lỗi khi tạo kỳ học mới:", err);
            throw err;
        }
    },

    // Cập nhật thông tin kỳ học
    updateSemester: async (semesterId, updates) => {
        const { semester_name, start_date, end_date, status } = updates;
        try {
            const result = await sql.query`
                UPDATE [dbo].[Semester]
                SET 
                    [semester_name] = ${semester_name},
                    [start_date] = ${start_date},
                    [end_date] = ${end_date},
                    [status] = ${status},
                    [updated_at] = SYSDATETIME()
                WHERE [semester_id] = ${semesterId}
            `;
            return result.rowsAffected; // Trả về số bản ghi đã cập nhật
        } catch (err) {
            console.error("Lỗi khi cập nhật kỳ học:", err);
            throw err;
        }
    },

    // Xóa kỳ học
    deleteSemester: async (semesterId) => {
        try {
            const result = await sql.query`
                DELETE FROM [dbo].[Semester]
                WHERE [semester_id] = ${semesterId}
            `;
            return result.rowsAffected; // Trả về số bản ghi đã xóa
        } catch (err) {
            console.error("Lỗi khi xóa kỳ học:", err);
            throw err;
        }
    }
};

module.exports = Semester;