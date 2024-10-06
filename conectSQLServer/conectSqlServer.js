const sql = require('mssql');

// SQL Server configuration
const config = {
    user: 'sa',    // SQL Server username
    password: '123', // Your password
    server: 'DESKTOP-NUJ2V4U',     // Server name or IP address
    database: 'DemoDB', // Database name
    options: {
        encrypt: true,          // Set to true if you're using SQL Azure
        trustServerCertificate: true // Set to true for local development with self-signed certs
    }
};

// Function to connect to SQL Server
async function connectToDB() {
    try {
        await sql.connect(config);
        console.log('Successfully connected to SQL Server');
    } catch (err) {
        console.error('Connection error:', err);
    }
}

module.exports = connectToDB;
