import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const notificationSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  message: String,
  dateSent: Date,
  isRead: Boolean,
  building: { type: String, ref: "Building" },
  file: { type: String, ref: "File" },
});

const Notification = model("Notification", notificationSchema);
export  { Notification, notificationSchema };
