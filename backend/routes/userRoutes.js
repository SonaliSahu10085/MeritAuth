const express = require("express");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.patch("/changePassword", isLoggedIn, userController.changePassword);

router.patch("/myProfile", isLoggedIn, userController.updateProfile);

module.exports = router;
