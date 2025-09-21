const express = require("express");
const {  updateuser } = require("../controllers/userControllers");
const router = express.Router();

router.get("/update", updateuser);

module.exports = router;
