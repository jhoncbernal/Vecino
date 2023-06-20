import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const notificationSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  message: String,
  dateSent: Date,
  isRead: { type: Boolean, default: false },
  owner : { type: String, default: null },//user, building, worker, recidency..
  recipientType: { type: String, enum: ["recidency","user", "worker", "building"] },
  notifiedBy: {
    type: String,
    required: true,
    enum: ["email", "sms", "both"],
    default: "email",
  },
});
notificationSchema.plugin(accessibleRecordsPlugin);
const Notification = model("Notification", notificationSchema);

export { Notification, notificationSchema };
