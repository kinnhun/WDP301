const e = require("express");
const { createUser, getUserFullInfoById } = require("../models/user");
const UserService = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getUsers();
      return successResponse({
        res,
        message: "get users successfully",
        data: users,
      });
    } catch (error) {
      return errorResponse({ res, message: "Get users failed", error: error.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      if (!id || !role) {
        const error = new Error("Missing required fields: id, role");
        error.status = 400;
        throw error;
      }
      const msg = await UserService.updateUserRole(id, role);
      return successResponse({
        res,
        message: msg,
      });
    } catch (error) {
      return errorResponse({ res, message: "Update user role failed", error: error.message });
    }
  },
  importUsers: async (req, res) => {
    try {
      const users = req.body;
      if (!users) {
        const error = new Error("Missing required fields: users");
        error.status = 400;
        throw error;
      }
      const msg = await UserService.importUsers(users);
      return successResponse({
        res,
        message: msg,
      });
    } catch (error) {
      console.log(error);
      return errorResponse({ res, message: "Import users failed", error: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const user = req.body;
      if (!user) {
        const error = new Error("Missing required fields: user");
        error.status = 400;
        throw error;
      }
      const newUser = await UserService.createUser(user);
      return successResponse({
        res,
        message: "Create user successfully",
        data: newUser,
      });
    } catch (error) {
      return errorResponse({ res, message: "Create user failed", error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        const error = new Error("Missing required fields: id");
        error.status = 400;
        throw error;
      }
      const msg = await UserService.deleteUser(id);
      return successResponse({
        res,
        message: msg,
      });
    } catch (error) {
      return errorResponse({ res, message: "Delete user failed", error: error.message });
    }
  },
  getUserFullInfoById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        const error = new Error("Missing required fields: id");
        error.status = 400;
        throw error;
      }
      const user = await UserService.getUserFullInfoById(id);
      return successResponse({
        res,
        message: "Get user full info successfully",
        data: user,
      });
    } catch (error) {
      return errorResponse({ res, message: "Get user full info failed", error: error.message });
    }
  },
};
