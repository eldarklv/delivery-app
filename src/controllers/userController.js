const UserModule = require("../modules/UserModule");

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;
      let createdUser = await UserModule.create(userData);
      createdUser = createdUser.toJSON();
      delete createdUser.passwordHash;
      delete createdUser.__v;
      res.status(201).json({ data: createdUser, status: "ok" });
    } catch (err) {
      console.error("Error creating user", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
