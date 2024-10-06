const express = require('express');
const app = express();
const connectToDB = require('./conectSqlServer'); // Import the connection function
const userController = require('./userController');

// Connect to SQL Server when the server starts
connectToDB();

// Define routes
app.get('/users', userController.getUsers);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
