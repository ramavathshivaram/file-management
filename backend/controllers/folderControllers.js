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

const renameFolder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const folderId = req.params.id;
    const ownerId = req.user.userId;
    const { newFolderName, parentFolderId } = req.body;
    console.log("remane ");

    if (!newFolderName || newFolderName.trim() === "") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Folder name is required",
        status: false,
      });
    }

    // 1. Update the folder itself
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: folderId, ownerId },
      { folderName: newFolderName },
      { new: true, session }
    );

    if (!updatedFolder) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Folder not found or not authorized",
        status: false,
      });
    }

    // 2. Update parent reference if it exists
    if (parentFolderId) {
      await Folder.findOneAndUpdate(
        { _id: parentFolderId, "subFolders.folderId": folderId },
        { $set: { "subFolders.$.folderName": newFolderName } }, // ✅ update name, not folderId
        { new: true, session }
      );
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Folder renamed successfully",
      status: true,
      folder: updatedFolder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Rename folder error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

// Delete a folder by ID
const deleteFolder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const folderId = req.params.id;
    const ownerId = req.user.userId;

    const { parentFolderId } = await Folder.findById(folderId, {
      parentFolderId: true,
    });

    // Recursive helper to delete folder + children
    const deleteFolderRecursively = async (folderId, ownerId, session) => {
      const folder = await Folder.findOne({ _id: folderId, ownerId }, null, {
        session,
      });

      if (!folder) return null;

      // Delete all subfolders first
      for (const sub of folder.subFolders) {
        await deleteFolderRecursively(sub.folderId, ownerId, session);
      }

      // Delete this folder
      await Folder.deleteOne({ _id: folderId, ownerId }, { session });
      return folder;
    };

    // 1. Delete the folder (and its children)
    const deletedFolder = await deleteFolderRecursively(
      folderId,
      ownerId,
      session
    );

    if (!deletedFolder) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Folder not found or not authorized",
        status: false,
      });
    }

    // 2. Remove reference from parent if parentFolderId exists
    if (parentFolderId) {
      await Folder.findByIdAndUpdate(
        parentFolderId,
        { $pull: { subFolders: { folderId } } }, // removes the entire subFolder object where folderId matches
        { new: true, session }
      );
    }

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Folder and all subfolders deleted successfully",
      status: true,
      folder: deletedFolder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Delete folder error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  createFolder,
  getFolderById,
  deleteFolder,
  renameFolder,
};
