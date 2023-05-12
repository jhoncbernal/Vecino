
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const fileSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const File = model("File", fileSchema);
export  { File, fileSchema };