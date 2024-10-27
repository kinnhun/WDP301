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
};
