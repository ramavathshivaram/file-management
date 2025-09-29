const express = require("express");
const router = express.Router();
const {
  createFolder,
  getFolderById,
  deleteFolder,
  renameFolder,
  moveFolder,
} = require("../controllers/folderControllers");

// Create a new folder
router.post("/create", createFolder);

// Get a specific folder by ID
router.get("/:id", getFolderById);

//rename folder
router.patch("/rename/:id", renameFolder);

// Delete a folder by ID
router.delete("/:id", deleteFolder);

router.patch("/move", moveFolder);

module.exports = router;
