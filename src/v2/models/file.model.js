
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const fileSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const File = mongoose.model("File", fileSchema);
module.exports = { File, fileSchema };