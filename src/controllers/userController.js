const UserModule = require("../modules/UserModule");

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;

      const isEmailRegistered = await UserModule.findByEmail(userData.email);
      if (isEmailRegistered) {
        return res.status(400).json({
          error: "email занят",
          status: "error",
        });
      }

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

  async signIn(req, res) {
    const { email } = req.body;
    let user = await UserModule.findByEmail(email);
    user = user.toJSON();
    delete user.passwordHash;
    delete user.__v;
    res.status(200).json({ data: user, status: "ok" });
  },

  failure(req, res) {
    res.status(400).json({
      error: "Неверный логин или пароль",
      status: "error",
    });
  },
};

module.exports = UserController;
