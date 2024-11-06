const express = require("express");
const UserController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserFullInfoById);
userRouter.patch("/:id/role", UserController.updateUserRole);
userRouter.post("/import", UserController.importUsers);
userRouter.post("/", UserController.createUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
