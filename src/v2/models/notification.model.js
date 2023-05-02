import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
const notificationSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  message: String,
  dateSent: Date,
  isRead: { type: Boolean, default: false },
  recipientType: { type: String, enum: ["recidency","user", "worker", "building"] },
  notifiedBy: {
    type: String,
    required: true,
    enum: ["email", "sms", "both"],
    default: "email",
  },
});

const Notification = model("Notification", notificationSchema);

export { Notification, notificationSchema };
