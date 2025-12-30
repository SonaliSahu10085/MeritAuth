const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// View all users with pagination
router.get("/", adminController.viewAllUsers);

// Activate user accounts
router.patch("/:userId/activate", adminController.activateUserAccounts);

// Deactivate user accounts
router.patch("/:userId/deactivate", adminController.deactivateUserAccounts);

module.exports = router;
