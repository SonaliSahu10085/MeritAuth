const User = require("../models/UserModel");

exports.viewAllUsers = async (req, res) => {
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

exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findOneAndUpdate(
      { userId },
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: `User status : ${status.toUpperCase()}`,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
