const express = require("express");
const router = express.Router();

// View all users with pagination
router.get("/", adminController.viewAllUsers);

// Activate user accounts
router.patch("/:userId/activate", adminController.activateUserAccounts);

// Deactivate user accounts
router.patch("/:userId/deactivate", adminController.deactivateUserAccounts);

module.exports = router;
