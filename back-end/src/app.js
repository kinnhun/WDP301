const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const requestRouter = require("./routes/request.route");
const profileRouter = require("./routes/profile");
const Newrouter = require("./routes/new");
const bookingRouter =require("./routes/Booking");
const roomRouter = require("./routes/room");
const routerBed = require("./routes/bed");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json()); // Nhận body từ json
app.use(express.urlencoded({ extended: true })); //Nhận body từ urlencoded

//router
app.use("/news", Newrouter);
app.use("/auth", authRouter);
app.use("/requests", requestRouter);
app.use("/profile", profileRouter);
app.use("/news",Newrouter);
app.use("/auth", authRouter);
app.use("/api/maintenanceRequests", maintenanceRequests);
app.use("/profile", profileRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/room", roomRouter);
app.use("/api/bed", routerBed)

module.exports = app;
