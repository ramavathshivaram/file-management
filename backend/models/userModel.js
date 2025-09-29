const mongoDB = require("../configs/mongoDB");

const { Schema } = mongoDB;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    dob: { type: Date },
    password: { type: String, required: true },
    loginAttempts: { type: Number, default: 0 },
    lastLoginAt: { type: Date },
    isActive: { type: Boolean, default: true },
    allItemsName: [
      {
        itemId: { type: mongoDB.Schema.Types.ObjectId },
        name: String,
        type: String,
      },
    ],
    rootFolderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    notifications: [
      {
        message: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoDB.model("User", userSchema);
