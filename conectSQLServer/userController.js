// userController.js
const sql = require('mssql');

// Function to get the list of users
const getUsers = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getUsers,
};
