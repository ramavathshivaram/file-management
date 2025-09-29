const express = require("express");
const { updateuser, searchQuery } = require("../controllers/userControllers");
const router = express.Router();

router.get("/update", updateuser);
// backend/routes/userRoutes.js

// … other routes …

router.get("/search", searchQuery);

// … remaining routes …

module.exports = router;
