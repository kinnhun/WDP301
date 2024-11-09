const express = require('express');
const ResidentRouter = express.Router();

const getResident = require('../controllers/residentHistory');

// Định nghĩa route để lấy thông tin booking theo user_id
ResidentRouter.get('/:user_id', getResident.getResident);
ResidentRouter.get('/userbed/:userId',getResident.getUserBed);




// Route để lấy thông tin theo phòng và theo kỳ
ResidentRouter.get('/roommates/roomates', getResident.getRoommatesByRoomAndSemester);



module.exports = ResidentRouter;
