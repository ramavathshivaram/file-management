const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordHashFunc = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await passwordHashFunc(password);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword, // use `password` field in schema
    });

    // Save user
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      status: false,
    });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      status: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Login User Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      status: false,
    });
  }
};

const updateuser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  updateuser,
};
