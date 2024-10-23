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




module.exports = roomRouter;
