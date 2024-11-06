const express = require("express");
const semesterController = require("../controllers/semester.controller");
const semesterRouter = express.Router();

// Lấy thông tin kỳ học hiện tại đang active
semesterRouter.get("/active", semesterController.getSemesterActive);


module.exports = semesterRouter;
