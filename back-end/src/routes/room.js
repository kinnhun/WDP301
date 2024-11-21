const express = require("express");
const roomController = require("../controllers/room");
const roomRouter = express.Router();

// Lấy danh sách tất cả phòng
roomRouter.get("/", roomController.getAllRooms);

// Tạo một phòng mới
roomRouter.post("/", roomController.createRoom);

// Lấy thông tin chi tiết một phòng theo ID
roomRouter.get("/:id", roomController.getRoomById);

// Cập nhật thông tin một phòng theo ID
roomRouter.put("/:id", roomController.updateRoom);

// Xóa một phòng theo ID
roomRouter.delete("/:id", roomController.deleteRoom);


// Lấy phòng theo trạng thái khả dụng
roomRouter.get("/status/available", roomController.getAvailableRooms);

// lấy ra category của phòng 
roomRouter.get("/roomCategories/all", roomController.getRoomCategory);

// lấy ra thông tin tầng của phòng 
roomRouter.get("/floor/all", roomController.getAllFloor);

// lẩy ra bed từ phòng 
roomRouter.get("/bed/available/room/:id", roomController.getBedAvailableFromRoom);

// lẩy ra toàn bộ phòng available 
roomRouter.get("/bed/available", roomController.getAllAvailableRooms);

// lẩy ra phòng từ type, floor, dorm  
roomRouter.get("/rooms/type/:roomTypeId/floor/:floorNumber/dorm/:dormName/gender/:gender", roomController.getRoomsByDormRoomTypeFloor);

// lấy ra danh sách dorm 
roomRouter.get("/dorms/all", roomController.getDorm);


// Thay đổi trạng thái phòng [availability_status]
roomRouter.put("/change-status", roomController.updateRoomStatus);




module.exports = roomRouter;
