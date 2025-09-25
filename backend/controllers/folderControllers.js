const mongoose = require("mongoose");
const Folder = require("../models/folderModel");
const User = require("../models/userModel");

const createFolder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // start transaction

  try {
    const { folderName, parentFolderId } = req.body;
    const userId = req.user.userId;

    if (!folderName) {
      return res
        .status(400)
        .json({ message: "Folder name is required", status: false });
    }

    // 1️⃣ Create the new folder
    const newFolder = new Folder({
      folderName: folderName,
      parentFolderId: parentFolderId,
      ownerId: userId,
    });
    console.log("New Folder:", newFolder);

    await newFolder.save({ session }); // save with session

    // 2️⃣ If root folder, update user's rootFolder array
    if (parentFolderId) {
      await Folder.findByIdAndUpdate(
        parentFolderId,
        {
          $push: {
            subFolders: {
              folderId: newFolder._id,
              folderName: newFolder.folderName,
              folderType: newFolder.folderType,
              isFavorite: newFolder.isFavorite,
              isImportant: newFolder.isImportant,
            },
          },
        },
        { session } // must pass session
      );
    }

    // 3️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Folder created successfully",
      folder: newFolder,
      status: true,
    });
  } catch (error) {
    // ❌ Rollback transaction on error
    await session.abortTransaction();
    session.endSession();

    console.error("Create Folder Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      status: false,
    });
  }
};

// Get a specific folder by ID
const getFolderById = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.userId;
    const folder = await Folder.findOne({ _id: folderId, ownerId: userId });

    if (!folder) {
      return res
        .status(404)
        .json({ message: "Folder not found", status: false });
    }
    console.log("Fetched Folder:", folder);

    res.status(200).json({ folder, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, status: false });
  }
};

// Update a folder by ID
const updateFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.userId;
  } catch (error) {
    res.status(500).json({
      message: "internal server errro",
      status: false,
      error: error,
    });
  }
};

// Delete a folder by ID
const deleteFolder = async (req, res) => {};

module.exports = {
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
};
