const express = require("express");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/logout", isLoggedIn, userController.logout);

router.get("/myProfile", isLoggedIn, userController.myProfile);

module.exports = router;
