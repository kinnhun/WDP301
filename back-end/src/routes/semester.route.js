const express = require("express");
const semesterController = require("../controllers/semester.controller");
const semesterRouter = express.Router();

// Lấy thông tin kỳ học hiện tại đang active
semesterRouter.get("/active", semesterController.getSemesterActive);

// Lấy tất cả các kỳ học
semesterRouter.get("/all", semesterController.getAllSemesters);

// Tạo kỳ học mới
semesterRouter.post("/create", semesterController.createSemester);

// Xóa kỳ học theo ID
semesterRouter.delete("/delete/:id", semesterController.deleteSemester);

module.exports = semesterRouter;
