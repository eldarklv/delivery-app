const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const UserModule = {
  async create(data) {
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    data.passwordHash = passwordHash;
    const createdUser = await User.create(data);
    return createdUser;
  },

  async findByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  async findById(id) {
    const user = await User.findById(id)
    return user
  },

  async isValidPassword(password, email) {
    const { passwordHash } = await this.findByEmail(email);
    return await bcrypt.compare(password, passwordHash);
  },
};

module.exports = UserModule;
