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
    importantItemsCount: { type: Number, default: 0 },
    favoriteItemsCount: { type: Number, default: 0 },
    recentItemsCount: { type: Number, default: 0 },
    trashedItemsCount: { type: Number, default: 0 },
    rootFolderCount: { type: Number, default: 0 },
    rootFolderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    allItems: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    sharedWithMe: [
      {
        senderId: { type: Schema.Types.ObjectId, required: true },
        senderName: { type: String, required: true },
        senderEmail: { type: String, required: true },
        senderPhone: { type: Number, required: true },
        itemId: { type: Schema.Types.ObjectId, required: true },
        itemName: { type: String, required: true },
        itemType: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    sharedByMe: [
      {
        receiverId: { type: Schema.Types.ObjectId, required: true },
        receiverName: { type: String, required: true },
        receiverEmail: { type: String, required: true },
        receiverPhone: { type: Number, required: true },
        itemId: { type: Schema.Types.ObjectId, required: true },
        itemName: { type: String, required: true },
        itemType: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    favoriteItems: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    recentlyAccessedItems: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    importantItems: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    trashedItems: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["folder", "files", "img", "video", "audio"],
          default: "folder",
        },
      },
    ],
    storageUsed: { type: Number, default: 0 },
    storageLimit: { type: Number, default: 1073741824 }, // 1GB default
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
