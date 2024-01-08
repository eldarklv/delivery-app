const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const passport = require("passport");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", UserController.createUser);

router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/api/failure" }),
  UserController.signIn
);

router.get("/failure", (req, res) => {
  res.status(400).json({
    error: "Неверный логин или пароль",
    status: "error",
  });
});

module.exports = router;
