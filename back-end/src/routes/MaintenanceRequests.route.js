const express = require("express");
const maintenanceRequestController = require("../controllers/MaintenanceRequests.controller");
const maintenanceRequestRouter = express.Router();

// Lấy danh sách yêu cầu bảo trì
maintenanceRequestRouter.get("/", maintenanceRequestController.getAllRequests);

// Tạo một yêu cầu bảo trì mới
maintenanceRequestRouter.post("/", maintenanceRequestController.createRequest);

// Lấy chi tiết một yêu cầu bảo trì theo ID
maintenanceRequestRouter.get("/:id", maintenanceRequestController.getRequestById);

// Cập nhật một yêu cầu bảo trì theo ID
maintenanceRequestRouter.put("/:id", maintenanceRequestController.updateRequest);

// Xóa một yêu cầu bảo trì theo ID
maintenanceRequestRouter.delete("/:id", maintenanceRequestController.deleteRequest);

module.exports = maintenanceRequestRouter;
