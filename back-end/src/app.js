const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const maintenanceRequests = require("./routes/MaintenanceRequests.route");
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json()); // Nhận body từ json
app.use(express.urlencoded({ extended: true })); //Nhận body từ urlencoded

//router

app.use("/auth", authRouter);
app.use("/api/maintenanceRequests", maintenanceRequests)

module.exports = app;
