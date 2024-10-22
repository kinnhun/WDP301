const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const requestRouter = require("./routes/request.route");
const profileRouter = require("./routes/profile");
const Newrouter = require("./routes/new");
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

module.exports = app;
