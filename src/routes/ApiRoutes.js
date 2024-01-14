const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AdvertisementController = require("../controllers/AdvertisementController");
const passport = require("passport");
const isAuthenticated = require("../middlewares/isAuthenticated");
const multer = require("../middlewares/multer");

router.post("/signup", UserController.createUser);

router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/api/failure" }),
  UserController.signIn
);

router.get("/failure", UserController.failure);

router.get("/test", isAuthenticated, (req, res) => {
  res.json({ test: "ok" });
});

router.post(
  "/advertisements",
  isAuthenticated,
  multer.array("images"),
  AdvertisementController.createAdvertisement
);

router.get("/advertisements", AdvertisementController.getAllAdvertisements);

router.get("/advertisements/:id", AdvertisementController.getAdvertisementById);

router.delete("/advertisements/:id", isAuthenticated, AdvertisementController.deleteAdvertisement);

module.exports = router;
