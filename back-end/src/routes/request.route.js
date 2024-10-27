const express = require("express");
const RequestController = require("../controllers/request.controller");
const requestRouter = express.Router();

// Lấy danh sách yêu cầu bảo trì
requestRouter.get("/", RequestController.getAllRequests);

// Tạo một yêu cầu bảo trì mới
requestRouter.post("/", RequestController.createRequest);

// Lấy yêu cầu theo id của người dùng
requestRouter.get("/:userId/user", RequestController.getRequestByUserId);

// Lấy danh sách loại yêu cầu
requestRouter.get("/types", RequestController.getRequestTypes);

// Lấy chi tiết một yêu cầu theo ID
requestRouter.get("/:id", RequestController.getRequestById);

// Cập nhật một yêu cầu bảo trì theo ID
requestRouter.patch("/:id", RequestController.updateRequest);

// Xóa một yêu cầu bảo trì theo ID
requestRouter.delete("/:id", RequestController.deleteRequest);

module.exports = requestRouter;
