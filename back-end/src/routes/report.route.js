const express = require("express");
const reportRouter = express.Router();
const ReportController = require("../controllers/report.controller");

// Định nghĩa các route
reportRouter.get("/", ReportController.getAllReports);
reportRouter.post("/", ReportController.createReport);
reportRouter.get("/user/:userId", ReportController.getReportsByUserId);
reportRouter.get("/:id", ReportController.getReportById);
reportRouter.put("/:id", ReportController.updateReport);
reportRouter.delete("/:id", ReportController.deleteReport);

// Xuất router
module.exports = reportRouter;
