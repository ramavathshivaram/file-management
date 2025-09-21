const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = async (req, res, next) => {
   try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
         return res
            .status(401)
            .json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
   } catch (error) {
      if (error.name === 'JsonWebTokenError') {
         return res.status(401).json({ message: "Invalid token" });
      }
      console.error("Auth Middleware Error:", error);
      res.status(500).json({ message: "Server error" });
   }
};

module.exports = authMiddleware;