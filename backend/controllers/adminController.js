const User = require("../models/UserModel");

module.exports.viewAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .skip(skip)
      .limit(limit)
      .select("-password");

    const totalUsers = await User.countDocuments();

    res.json({
      users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports.activateUserAccounts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOneAndUpdate(
      { userId },
      { status: "active" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User account activated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports.deactivateUserAccounts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOneAndUpdate(
      { userId },
      { status: "inactive" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User account deactivated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
