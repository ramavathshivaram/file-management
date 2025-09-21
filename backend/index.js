require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoDB = require("./configs/mongoDB");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
