const express = require("express");
const profileController = require("../controllers/profile");
const profileRouter = express.Router();

// Lấy danh sách tất cả người dùng
profileRouter.get("/", profileController.getAllUsers);

// Tạo một người dùng mới
profileRouter.post("/", profileController.createUser);

// Lấy thông tin chi tiết một người dùng theo ID
profileRouter.get("/:id", profileController.getUserById);

// Cập nhật thông tin một người dùng theo ID
profileRouter.put("/:id", profileController.updateUser);

// Xóa một người dùng theo ID
profileRouter.delete("/:id", profileController.deleteUser);

module.exports = profileRouter;
