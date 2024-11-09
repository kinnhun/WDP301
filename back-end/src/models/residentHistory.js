const sql = require("mssql");


const 
   
   
    // Lấy thông tin booking theo user_id bao gồm username, bed_number, start_date, end_date, price, total_amount, và semester
    getResidentHistory= async (userId) => {
        try {
            const result = await sql.query`
                SELECT 
                    u.username,
                    b.bed_number,
                    bk.start_date,
                    bk.end_date,
                    bk.total_amount AS price,
                    bk.total_amount,
                    bk.semester
                FROM 
                    [dbo].[Bookings] AS bk
                JOIN 
                    [dbo].[Users] AS u ON bk.user_id = u.user_id
                JOIN 
                    [dbo].[Beds] AS b ON bk.bed_id = b.bed_id
                WHERE 
                    bk.user_id = ${userId}
            `;
            console.log('Kết quả truy vấn booking theo user_id:', result); // Kiểm tra kết quả ở đây
            return result; // Trả về kết quả từ truy vấn
        } catch (err) {
            console.error("Lỗi khi lấy thông tin booking theo user_id:", err);
            throw err;
        }
    }




const 
    // Lấy thông tin username và bed_number của các user có cùng bed_number với user_id được cung cấp
    getUserBed= async (userId) => {
        try {
            const result = await sql.query`
                SELECT 
                    u.username,
                    b.bed_number
                FROM 
                    [dbo].[Bookings] AS bk
                JOIN 
                    [dbo].[Users] AS u ON bk.user_id = u.user_id
                JOIN 
                    [dbo].[Beds] AS b ON bk.bed_id = b.bed_id
                WHERE 
                    bk.bed_id IN (
                        SELECT bed_id
                        FROM [dbo].[Bookings]
                        WHERE user_id = ${userId}
                    )
            `;
            console.log('Kết quả truy vấn bed_number và username:', result.recordset); // Kiểm tra kết quả ở đây
            return result.recordset; // Trả về kết quả từ truy vấn
        } catch (err) {
            console.error("Lỗi khi lấy thông tin username và bed_number:", err);
            throw err;
        }
    }



module.exports = {getResidentHistory,getUserBed};
