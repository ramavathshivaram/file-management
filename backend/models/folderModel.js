const mongoDB = require("../configs/mongoDB");

const { Schema } = mongoDB;

const folderSchema = new Schema({
  folderName: { type: String, required: true },
  parentFolderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subFolders: [
    {
      folderId: { type: Schema.Types.ObjectId, ref: "Folder" },
      folderName: { type: String },
      folderType: {
        type: String,
        default: "folder",
      },
      isFavorite: {
        type: Boolean,
        default: false,
      },
      isImportant: {
        type: Boolean,
        default: false,
      },
    },
  ],
  files: [
    {
      name: { type: String },
      url: { type: String },
      fileType: {
        type: String,
        enum: ["img", "video", "audio", "document", "other"],
      },
      isImportant: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
      uploadedAt: { type: Date, default: Date.now },
      width: { type: Number },
      height: { type: Number },
      asceptRatio: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [String],
  colorLabel: { type: String },
  description: { type: String },
  versionHistory: [Schema.Types.Mixed],
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoDB.model("Folder", folderSchema);
