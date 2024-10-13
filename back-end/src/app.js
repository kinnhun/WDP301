const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json()); // Nhận body từ json
app.use(express.urlencoded({ extended: true })); //Nhận body từ urlencoded

//router

module.exports = app;