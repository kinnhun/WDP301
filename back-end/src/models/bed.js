const sql = require('mssql'); // Thư viện kết nối với SQL Server

// Lấy tất cả giường
const getAllBeds = async () => {
    try {
        const query = 'SELECT * FROM Beds';
        const pool = await sql.connect(); // Kết nối với cơ sở dữ liệu
        const result = await pool.request().query(query); // Thực thi truy vấn
        return result; // Trả về kết quả truy vấn
    } catch (error) {
        throw new Error('Lỗi khi lấy tất cả giường: ' + error.message);
    }
};

// Lấy giường theo ID
const getBedById = async (bed_id) => {
    try {
        const query = 'SELECT * FROM Beds WHERE bed_id = @bed_id';
        const pool = await sql.connect();
        const result = await pool.request()
            .input('bed_id', sql.Int, bed_id) // Truyền tham số bed_id
            .query(query);
        return result;
    } catch (error) {
        throw new Error('Lỗi khi lấy giường theo ID: ' + error.message);
    }
};

// Tạo giường mới
const createBed = async (room_id, bed_number, availability_status) => {
    try {
        const query = `
            INSERT INTO Beds (room_id, bed_number, availability_status) 
            VALUES (@room_id, @bed_number, @availability_status)
        `;
        const pool = await sql.connect();
        await pool.request()
            .input('room_id', sql.Int, room_id)
            .input('bed_number', sql.Int, bed_number)
            .input('availability_status', sql.VarChar, availability_status) // Sử dụng kiểu dữ liệu tương ứng
            .query(query);
    } catch (error) {
        throw new Error('Lỗi khi tạo giường: ' + error.message);
    }
};

// Cập nhật giường theo ID
const updateBed = async (bed_id, updates) => {
    try {
        const query = `
            UPDATE Beds 
            SET room_id = @room_id, bed_number = @bed_number, availability_status = @availability_status 
            WHERE bed_id = @bed_id
        `;
        const pool = await sql.connect();
        await pool.request()
            .input('room_id', sql.Int, updates.room_id)
            .input('bed_number', sql.Int, updates.bed_number)
            .input('availability_status', sql.VarChar, updates.availability_status)
            .input('bed_id', sql.Int, bed_id)
            .query(query);
    } catch (error) {
        throw new Error('Lỗi khi cập nhật giường: ' + error.message);
    }
};

// Xóa giường theo ID
const deleteBed = async (bed_id) => {
    try {
        const query = 'DELETE FROM Beds WHERE bed_id = @bed_id';
        const pool = await sql.connect();
        await pool.request()
            .input('bed_id', sql.Int, bed_id)
            .query(query);
    } catch (error) {
        throw new Error('Lỗi khi xóa giường: ' + error.message);
    }
};

module.exports = {
    getAllBeds,
    getBedById,
    createBed,
    updateBed,
    deleteBed,
};
