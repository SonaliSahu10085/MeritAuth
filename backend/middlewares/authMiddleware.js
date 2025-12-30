const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isLoggedIn = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ userId: decoded.userId }).select(
      "-password"
      );
      
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
