const express = require("express");
const router = express.Router();
const {
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
} = require("../controllers/folderControllers");

// Create a new folder
router.post("/create", createFolder);

// Get a specific folder by ID
router.get("/:id", getFolderById);

// Update a folder by ID
router.put("/:id", updateFolder);

// Delete a folder by ID
router.delete("/:id", deleteFolder);

module.exports = router;
