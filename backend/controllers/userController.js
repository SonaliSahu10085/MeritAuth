const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !fullName || !password) {
      res.status(400).json({
        error: "All fields required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Password too weak" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        error: "User already exists",
      });
    }

    // status by default active, role by default user
    const newUser = new User({
      fullName,
      email,
      password,
    });

    await newUser.save();

    // Create auth token
    const token = generateToken(newUser.userId, newUser.role);

    res.json({
      message: "Signup successful",
      token,
      user: {
        userId: newUser.userId,
        fullName: newUser.fullName,
        email: newUser.email,
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
    const token = generateToken(user.userId, user.role);

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
