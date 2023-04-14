const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const packageSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  packageCode: {
    type: String,
    required: true,
    unique: true,
  },
  deliveryCompany: {
    type: String,
    required: true,
  },
  receivedBy: {
    type: String,
    required: true,
  },
  receivedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  statusUpdatedAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ["received", "notified", "delivered"],
    default: "received",
  },
  pin: {
    type: String,
    required: true,
    match: /^[a-zA-Z]\d{4}$/,
    index: true,
  },
  users: [
    {
      _id: false,
      uuid: {
        ref: "User",
        type: String,
      },
    },
  ],
  admin: [
    {
      _id: false,
      uuid: {
        ref: "neighborhood",
        type: String,
      },
    },
  ],
  signature: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  notificationWay: {
    type: String,
    required: true,
    enum: ["email", "sms", "both"],
    default: "email",
  },
  trackingNumber: {
    type: String,
  },
  sectionNumber: {
    type: String,
  },
  propertyNumber: {
    type: String,
  },
  kind: {
    type: String,
    required: true,
    enum: ["package", "letter", "mail", "parcel", "box", "envelope", "other","utilities"],
    default: "package",
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
