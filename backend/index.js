require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoDB = require("./configs/mongoDB");
const { registerUser, loginUser } = require("./controllers/userControllers");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//USER ROUTES
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);

//MIDDLEWARE FOR PROTECTED ROUTES
app.use(verifyJWT);

//app.use("/api/users", require("./routes/userRoutes"));

//FOLER ROUTES

//FILE ROUTES

//IMGE ROUTES

//VIDEO ROUTES

//AUDIO ROUTES

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
