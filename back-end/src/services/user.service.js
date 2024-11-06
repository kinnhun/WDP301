const User = require("../models/user");

module.exports = {
  getUsers: async () => {
    try {
      const users = await User.getUsers();
      return users.recordsets[0];
    } catch (e) {
      throw e;
    }
  },
  updateUserRole: async (userId, role) => {
    try {
      const user = await User.updateUserRole(userId, role);
      if (user.rowsAffected[0] === 0) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      return "Update user role successfully";
    } catch (e) {
      throw e;
    }
  },
  importUsers: async (users) => {
    try {
      const user = await User.importUsers(users);
      if (user.rowsAffected[0] === 0) {
        const error = new Error("Import users failed");
        error.status = 400;
        throw error;
      }
      return "Import users successfully";
    } catch (e) {
      throw e;
    }
  },
  createUser: async (user) => {
    try {
      const newUser = await User.createUser(user);
      if (newUser.rowsAffected[0] === 0) {
        const error = new Error("Create user failed");
        error.status = 400;
        throw error;
      }

      const newestUser = await User.getNewestUser();
      return newestUser.recordset[0];
    } catch (e) {
      throw e;
    }
  },
  deleteUser: async (userId) => {
    try {
      const user = await User.deleteUser(userId);
      console.log(user);
      if (user.rowsAffected[1] === 0) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      return "Delete user successfully";
    } catch (e) {
      throw e;
    }
  },
  getUsersByRole: async (roleName) => {
    try {
      const users = await User.getUsersByRole(roleName);
      return users.recordset; // Trả về danh sách người dùng
    } catch (e) {
      throw e;
    }
  },
};
