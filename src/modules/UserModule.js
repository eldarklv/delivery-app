const User = require("../models/UserModel");

const UserModule = {
  async create(data) {
    const createdUser = await User.create(data);
    return createdUser;
  },
};

module.exports = UserModule;
