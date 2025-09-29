const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Folder = require("../models/folderModel");
const { default: mongoose } = require("../configs/mongoDB");

const passwordHashFunc = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Register a new user

const registerUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userName, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Create root folder
    const newFolder = new Folder({
      folderName: "rootFolder",
      parentFolderId: null,
      ownerId: newUser._id,
    });

    // Save both with session
    await newUser.save({ session });
    await newFolder.save({ session });

    // Link root folder to user (if schema supports it)
    newUser.rootFolderId = newFolder._id;
    await newUser.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        avatar: newUser.avatar,
        rootFolderId: newUser.rootFolderId,
      },
      token,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

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
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        rootFolderId: user.rootFolderId,
      },
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

const searchQuery = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    // Find user and only project matching items in allItemsName
    const user = await User.findOne(
      { _id: userId, "allItemsName.name": { $regex: q, $options: "i" } },
      { "allItemsName.$": 1 } // only return the matched element
    );

    if (!user) {
      return res.status(404).json({ message: "No matching items found" });
    }

    res.json({ results: user.allItemsName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateuser,
  searchQuery,
};
