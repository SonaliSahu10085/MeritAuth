const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const {
  generateToken,
  isStrongPassword,
  emailValidation,
} = require("../utils/utilityFunctions");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({
        error: "All fields required",
      });
    }

    // Email format validation
    if (!emailValidation(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password strength validation
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // status by default active, role by default user
    const newUser = new User({
      fullName,
      email,
      password,
    });

    newUser.lastLoginAt = new Date();
    const savedUser = await newUser.save();

    // console.log(savedUser)

    // Create auth token
    const token = await generateToken(savedUser.userId, savedUser.role);

    res.json({
      message: "Signup successful",
      token,
      user: {
        userId: savedUser.userId,
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.status === "inactive") {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // JWT Access Token
    const token = await generateToken(user.userId, user.role);

    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LOGOUT
exports.logout = (req, res) => {
  // For JWT, logout is handled on client-side by removing token
  res.json({ message: "Logout successful" });
};

// GET CURRENT USER + GET MY PROFILE
exports.myProfile = async (req, res) => {
  res.json(req.user);
};

// USER - CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword | !newPassword) {
      return res.status(400).json({
        error:
          "Old password and new password are required to change the password",
      });
    }
    const user = await User.findOne({ userId: req.user.userId });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password didn't match" });
    }

    user.password = newPassword;

    // pre-save mongoose middleware will hash it automatically
    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER - UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.user.userId, email: req.user.email },
      { fullName },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
