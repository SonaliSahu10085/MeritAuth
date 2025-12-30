const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

// View all users with pagination
router.get("/", isLoggedIn, isAdmin, adminController.viewAllUsers);

// Activate/Deactivate user accounts
router.patch(
  "/:userId/status",
  isLoggedIn,
  isAdmin,
  adminController.updateUserStatus
);

module.exports = router;
