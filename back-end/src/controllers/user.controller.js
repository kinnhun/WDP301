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
};
