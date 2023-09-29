import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { generatePin } from "../../utils/generate.utils.js";
import { Notification } from "./notification.model.js";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const packageSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  packageCode: {
    type: String,
    required: true,
    default: function () {
      return uuidv4().substring(0, 8);
    },
    unique: true,
  },
  courier: { type: String, required: true },
  receivedBy: { type: String, ref: "Worker" },
  receivedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  statusUpdatedAt: { type: Date },
  status: {
    type: String,
    required: true,
    enum: ["received", "delivered"],
    default: "received",
  },
  pin: {
    type: String,
    required: true,
    match: /^[a-zA-Z]\d{4}$/,
    index: true,
    default: function () {
      return generatePin();
    },
  },
  recidentialUnit: { type: String, ref: "RecidentialUnit" },
  signature: { type: String },
  photo: { type: String, ref: "File" },
  owners: [{ type: String, ref: "User" }],
  trackingNumber: { type: String },
  recipientType: { type: String, default: "recidency" },
  building: { type: String, ref: "Building" },
  type: {
    type: String,
    required: true,
    enum: ["package", "letter", "mail", "parcel", "box", "envelope", "other"],
    default: "package",
  },
});
packageSchema.plugin(accessibleRecordsPlugin);
const Package = Notification.discriminator("Package", packageSchema);

export { Package, packageSchema };